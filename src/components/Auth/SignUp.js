import { useState } from "react";
import { Email, Identy, Lock } from "../../Assets/svgs/Form";
import { InputBox } from "./InputBox";
import { ProfilePic } from "./ProfilePic";
import { PasswordError } from "./PasswordError";
import { Crop } from "../Helper/Crop";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Validation } from "./Validation";

export const SignUp = () => {
  const [form, setForm] = useState();
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "profile_pic") {
      setForm({ ...form, profile_pic: e.target.files[0] });
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
    if (!emailPattern.test(form?.email))
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
    formData.append("image", form?.profile_pic);
    const data = {
      name: form?.name,
      email: form?.email,
      password: form?.password,
      profile_pic: formData,
    }
  };

  return (
    <>
      <ProfilePic file={form?.profile_pic} name={"profile_pic"} {...common} />
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
      <Button onClick={() => handleSubmit()}>Submit</Button>
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
            aspect={"1"}
            label={"profile_pic"}
            profile_pic={URL.createObjectURL(form?.profile_pic)}
          />
        </Flex>
      )}
    </>
  );
};
