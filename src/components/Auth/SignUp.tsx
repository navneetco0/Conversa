import React, { ChangeEvent, FC, useState } from "react";
import { Email, Identy, Lock } from "../../Assets/svgs/Form";
import { InputBox } from "./InputBox";
import { ProfilePic } from "./ProfilePic";
import { PasswordError } from "./PasswordError";
import { Crop } from "../Helper/Crop";
import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { Validation } from "./Validation";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../api/Authentication/signUp";
import { useDispatch } from "react-redux";
import { setToken } from "../../app/authSlice";

interface Form {
  name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  profile_pic?: any;
}

export const SignUp: FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const mutation = useMutation<any, unknown, Form>({
    mutationFn: signUp,
    onSuccess: (data: any) => {
      if (data?.message) {
        toast({
          title: data?.message,
          position: "top",
          description: "Either the username or Password is wrong!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      }
      if (data?.token) {
        toast({
          title: "Account created successfully!",
          position: "top",
          description: "We've created your profile for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        dispatch(setToken(data?.token));
        setLoading(false);
      }
    },
  });
  const [form, setForm] = useState<Form>({});
  const [display, setDisplay] = useState<boolean>(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profile_pic") {
      setForm({ ...form, profile_pic: files?.[0] });
      setDisplay(true);
      return;
    }
    setForm({ ...form, [name]: value });
    setError({});
  };
  const common = { onChange: handleChange, form };

  const handleSubmit = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form?.name) return setError({ ...error, name: "Name is required" });
    if (!emailPattern.test(form?.email ?? ""))
      return setError({ ...error, email: "Email is not valid" });
    if (!form?.password)
      return setError({ ...error, password: "Password is required" });
    const validation = Validation({
      password: form?.password,
      confirm_password: form?.confirm_password,
    });
    const isAllValid = Object.values(validation).every(
      (value) => value === true
    );
    if (!isAllValid) return;
    const formData = new FormData();
    formData.append("file", form?.profile_pic);
    formData.append("upload_preset", "chit-chat");
    formData.append("cloud_name", "chit-chat");
    const data = {
      name: form?.name,
      email: form?.email,
      password: form?.password,
      profile_pic: form?.profile_pic ? formData : null,
    };
    setLoading(true);
    mutation.mutate(data);
  };

  return (
    <>
      <ProfilePic isDisabled={loading} file={form?.profile_pic} name={"profile_pic"} {...common} />
      <InputBox Icon={Identy} title={"Name"} {...common} />
      {error?.name && (
        <Text w="100%" color="red">
          {error?.name}
        </Text>
      )}
      <InputBox Icon={Email} title={"Email"} {...common} />
      {error?.email && (
        <Text w="100%" color="red">
          {error?.email}
        </Text>
      )}
      <InputBox Icon={Lock} title={"Password"} {...common} type="password" />
      {error?.password && (
        <Text w="100%" color="red">
          {error?.password}
        </Text>
      )}
      <InputBox
        Icon={Lock}
        title={"Confirm Password"}
        type="password"
        {...common}
      />
      <Button
        onClick={() => handleSubmit()}
        isLoading={loading}
        loadingText={"wait..."}
        variant={loading?'outline':'solid'}
        colorScheme="secondary"
      >
        Submit
      </Button>
      {form?.password && (
        <PasswordError
          password={form?.password}
          confirm_password={form?.confirm_password}
        />
      )}
      {display && (
        <Flex
          pos={"fixed"}
          top="0"
          left={0}
          w="100%"
          h="100vh"
          bg="white"
          zIndex="4"
          overflowY="scroll"
          alignItems="center"
        >
          <Crop
            setDisplay={setDisplay}
            handleChange={handleChange}
            aspect={1}
            profile_pic={URL.createObjectURL(form?.profile_pic)}
          />
        </Flex>
      )}
    </>
  );
};
