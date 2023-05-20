import React, { useState } from "react";
import { InputBox } from "./InputBox";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Email } from "Assets/svgs/Form";
import { useMutation } from "@tanstack/react-query";
import verifyMail from "api/Authentication/verifyMail";
import resendOTP from "api/Authentication/resendOTP";
import verifyOTP from "api/Authentication/verifyOTP";

interface EmailBoxProps {
  error?: any;
  form?: any;
  otpLoading?: boolean;
  onChange?: any;
  setForm?: any;
}

interface VerifyOtpMutationData {
  token?: string;
  otp?: string;
}

const EmailBox: React.FC<EmailBoxProps> = ({
  error,
  form,
  onChange,
  setForm,
}) => {
  const toast = useToast();
  const resendotp = useMutation({
    mutationFn: resendOTP,
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
    },
  });
  const verifyotp = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data: any) => {
      if (data?.message === "OTP verified") {
        setForm({ ...form, email_varified: true });
        toast({
          title: data?.message,
          position: "top",
          status: "info",
          description: "Your email verified successfully.",
          duration: 9000,
          isClosable: true,
        });
      } else if (data?.message) {
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
  const mutation = useMutation({
    mutationFn: verifyMail,
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

  const [loading, setLoading] = useState<boolean>(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const common = { onChange, form };
  const sendOTP = () => {
    const email = form?.email;
    if (email) {
      setLoading(true);
      mutation.mutate(email);
    }
  };

  const handleVerify = () => {
    const data: VerifyOtpMutationData = {
      token: form?.token,
      otp: form?.otp,
    };
    verifyotp.mutate(JSON.stringify(data));
  };
  const handleResend = () => {
    resendotp.mutate(form?.token);
  };
  return (
    <>
      <InputBox
        isDisabled={!!form?.token}
        Icon={Email}
        title={"Email"}
        {...common}
      />
      {error?.email && (
        <Text w="100%" color="red">
          {error?.email}
        </Text>
      )}
      {!form?.email_varified && (
        <>
          {!error?.email &&
            emailPattern.test(form?.email) &&
            !form?.token &&
            !loading && (
              <Button
                variant={"link"}
                colorScheme="secondary"
                onClick={sendOTP}
              >
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
              <InputGroup>
                <Input
                  name="otp"
                  value={form?.otp}
                  onChange={onChange}
                  variant={"flushed"}
                  placeholder="enter otp"
                />
                {form?.otp?.length === 6 && (
                  <InputRightElement>
                    <Button
                      onClick={handleVerify}
                      variant={"link"}
                      colorScheme="secondary"
                    >
                      Verify
                    </Button>
                  </InputRightElement>
                )}
              </InputGroup>
              <Button
                variant={"link"}
                colorScheme="secondary"
                onClick={handleResend}
              >
                Resend OTP
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default EmailBox;
