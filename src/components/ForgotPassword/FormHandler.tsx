import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
} from "@chakra-ui/react";
import { Email } from "Assets/svgs/Form";
import { InputBox } from "components/Auth/InputBox";
import React from "react";

const FormHandler: React.FC = () => {
  const [form, setForm] = React.useState({
    email_varified: false,
    otp: "",
    email: "",
    token: "",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleChanges = (e: any) => {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const common = { onChange: handleChanges, form };
  const sendOTP = () => {};
  const handleVerify = () => {};
  const handleResend = () => {};
  return (
    <>
      <InputBox Icon={Email} title={"Email"} {...common} />
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
