import { Button, Text, useToast } from "@chakra-ui/react";
import { InputBox } from "./InputBox";
import { Email, Lock } from "../../Assets/svgs/Form";
import React, { ChangeEvent, FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/Authentication/login";
import { useDispatch } from "react-redux";
import { setToken } from "../../app/authSlice";

export const SignIn: FC = () => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: login,
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
      if (!!data?.token) {
        toast({
          title: "Login successfully!",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        localStorage.setItem("chit-chat", data?.token);
        dispatch(setToken(data?.token));
        setLoading(false);
      }
    },
  });
  const [form, setForm] = useState<any>({});
  const [error, setError] = useState<any>({});
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError({});
  };
  const common = { onChange: handleChange, form };
  const handleSubmit = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form?.email))
      return setError({ ...error, email: "Email is not valid" });
    if (!form?.password)
      return setError({ ...error, password: "Password is required" });
    setLoading(true);
    mutation.mutate(form);
  };

  return (
    <>
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
      <Button
        onClick={handleSubmit}
        isLoading={loading}
        colorScheme="secondary"
        variant={loading ? "outline" : "solid"}
        loadingText={"wait..."}
      >
        Sign In
      </Button>
    </>
  );
};
