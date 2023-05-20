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

interface EmailBoxProps {
  error?: any;
  form?: any;
  otpLoading?: boolean;
  onChange?: any;
  setForm?: any;
}

const EmailBox: React.FC<EmailBoxProps> = ({
  error,
  form,
  onChange,
  setForm,
}) => {
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: verifyMail,
    onSuccess: (data: any) => {
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
    console.log("hello")
  }
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
      {!error?.email && emailPattern.test(form?.email) && !form?.token && (
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
        <InputGroup>
          <Input name="otp" value={form?.otp} onChange={onChange} variant={"flushed"} placeholder="enter otp" />
          {form?.otp?.length === 6 && (
            <InputRightElement>
              <Button onClick={handleVerify} variant={"link"} colorScheme="secondary">
                Verify
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
      )}
    </>
  );
};

export default EmailBox;
