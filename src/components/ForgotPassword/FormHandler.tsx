import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Email } from "Assets/svgs/Form";
import resendOTP from "api/Authentication/resendOTP";
import sendForgotOTP from "api/Authentication/sendForgotOTP";
import { InputBox } from "components/Auth/InputBox";
import React from "react";
import PasswordBox from "./PasswordBox";

const FormHandler: React.FC = () => {
  const toast = useToast();
  const [error, setError] = React.useState({});
  const [resend, setResend] = React.useState(true);
  const [form, setForm] = React.useState({
    otp: "",
    email: "",
    token: "",
  });
  const mutation = useMutation({
    mutationFn: sendForgotOTP,
    onSuccess: (data: any) => {
      if (data?.message) {
        toast({
          title: data?.message,
          position: "top",
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      }
      if (data?.token) {
        setForm({ ...form, token: data?.token });
        toast({
          title: "OTP sent successfully!",
          position: "top",
          description: "Please check your spam list.",
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      }
      setLoading(false);
    },
  });

  const resendotp = useMutation({
    mutationFn: resendOTP,
    onSuccess: (data: any) => {
      if (data?.message) {
        if (data?.message === "otp resend successfully!") setResend(false);
        toast({
          title: data?.message,
          position: "top",
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });

  const [loading, setLoading] = React.useState<boolean>(false);
  const handleChanges = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const common = { onChange: handleChanges, form };
  const sendOTP = () => {
    setLoading(true);
    mutation.mutate(form?.email);
  };
  const handleResend = () => {
    resendotp.mutate(form?.token);
  };
  return (
    <>
      <InputBox Icon={Email} title={"Email"} minW="300px" {...common} />
      {emailPattern.test(form?.email) && !form?.token && !loading && (
        <Button variant={"link"} colorScheme="secondary" onClick={sendOTP}>
          Click here to Send OTP to verify Email
        </Button>
      )}
      {loading && (
        <Skeleton
          w={"100%"}
          startColor="primary.500"
          endColor="secondary.900"
          height="40px"
        />
      )}
      {form?.token && (
        <>
          <Input
            name="otp"
            value={form?.otp}
            onChange={handleChanges}
            variant={"flushed"}
            placeholder="enter otp"
          />
          {resend && (
            <Button
              variant={"link"}
              colorScheme="secondary"
              onClick={handleResend}
            >
              Resend OTP
            </Button>
          )}
          <PasswordBox error={error} setError={setError} {...common} />
        </>
      )}
    </>
  );
};

export default FormHandler;
