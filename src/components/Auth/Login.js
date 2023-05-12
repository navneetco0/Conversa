import { Button, Text } from "@chakra-ui/react";
import { InputBox } from "./InputBox";
import { Email, Lock } from "../../Assets/svgs/Form";
import { useState } from "react";

export const Login = () => {
  const [form, setForm] = useState();
  const [error, setError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError({});
  }
  const common = { onChange: handleChange, form };
  const handleSubmit = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form?.email))
      return setError({ ...error, email: "Email is not valid" });
    if (!form?.password)
      return setError({ ...error, password: "Password is required" });
    const data = {
      email: form?.email,
      password: form?.password,
    }
  }

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
      <Button>Sign In</Button>
    </>
  );
};