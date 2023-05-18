import { Button, Text } from "@chakra-ui/react";
import { InputBox } from "./InputBox";
import { Email, Lock } from "../../Assets/svgs/Form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/Authentication/login";

export const Login = () => {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      if (data?.token) localStorage.setItem("chit-chat", data?.token);
    },
  });
  const [form, setForm] = useState();
  const [error, setError] = useState({});
  const handleChange = (e) => {
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
      <Button onClick={handleSubmit}>Sign In</Button>
    </>
  );
};
