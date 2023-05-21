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
import sendForgotOTP from "api/Authentication/sendForgotOTP";
import { InputBox } from "components/Auth/InputBox";
import React from "react";

const FormHandler: React.FC = () => {
    const toast = useToast();
  const [form, setForm] = React.useState({
    email_varified: false,
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
  const handleVerify = () => {};
  const handleResend = () => {};
  return (
    <>
      <InputBox Icon={Email} title={"Email"} minW="300px" {...common} />
      {!form?.email_varified && (
        <>
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
              <InputGroup>
                <Input
                  name="otp"
                  value={form?.otp}
                  onChange={handleChanges}
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

export default FormHandler;
