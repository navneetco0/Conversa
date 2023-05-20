import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { Validation } from "./Validation";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "api/Authentication/signUp";
import { useDispatch } from "react-redux";
import { setToken } from "app/authSlice";

interface SubmitProps {
  form?: any;
  setError: React.Dispatch<React.SetStateAction<any>>;
  error: any;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Form {
  name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  profile_pic?: any;
  token?: string | null;
  otp?: string;
}

const Submit: React.FC<SubmitProps> = ({
  form,
  setError,
  error,
  loading,
  setLoading,
}) => {
  const toast = useToast();
  const dispatch = useDispatch();
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
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
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
      token: form?.token,
      otp: form?.otp,
    };
    setLoading(true);
    mutation.mutate(data);
  };
  return (
    <Button
      w="100%"
      onClick={() => handleSubmit()}
      isLoading={loading}
      loadingText={"wait..."}
      variant={loading ? "outline" : "solid"}
      colorScheme="secondary"
    >
      Submit
    </Button>
  );
};

export default Submit;
