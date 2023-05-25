import React from "react";
import { InputBox } from "./InputBox";
import { Text } from "@chakra-ui/react";
import { PasswordError } from "./PasswordError";
import Submit from "./Submit";
import { Lock } from "../../Assets/svgs/Form";

interface PasswordBoxProps {
  error?: any;
  form?: any;
  setError?: any;
  onChange?: any;
  loading: boolean;
  setLoading?: any;
}

const PasswordBox: React.FC<PasswordBoxProps> = ({
  onChange,
  loading,
  setLoading,
  setError,
  form,
  error,
}) => {
  const common = { onChange, form };
  return (
    <>
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
      <Submit
        form={form}
        error={error}
        loading={loading}
        setLoading={setLoading}
        setError={setError}
      />
      {form?.password && (
        <PasswordError
          password={form?.password}
          confirm_password={form?.confirm_password}
        />
      )}
    </>
  );
};

export default PasswordBox;
