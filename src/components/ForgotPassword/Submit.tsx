import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Validation } from "components/Auth/Validation";
import { useNavigate } from "react-router-dom";
import forgotPassword from "api/Authentication/forgotSend";

interface SubmitProps {
  form?: any;
  setError: React.Dispatch<React.SetStateAction<any>>;
  error: any;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Form {
  email?: string;
  password?: string;
  confirm_password?: string;
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
  const navigate = useNavigate();
  const mutation = useMutation<any, unknown, Form>({
    mutationFn: forgotPassword,
    onSuccess: (data: any) => {
      if (data?.message) {
        toast({
          title: data?.message,
          position: "top",
          description: "Please login to continue",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
        navigate("/login");
      }
    },
  });
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
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
    const data = {
      name: form?.name,
      email: form?.email,
      password: form?.password,
      token: form?.token,
      otp: form?.otp,
    };
    setLoading(true);
    mutation.mutate(data);
  };
  return (
    <Button
      w="100%"
      onClick={handleSubmit}
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
