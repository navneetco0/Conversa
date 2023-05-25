import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import Submit from "./Submit";
import { InputBox } from "../Auth/InputBox";
import { PasswordError } from "../Auth/PasswordError";

interface PasswordBoxProps {
  error?: any;
  form?: any;
  setError?: any;
  onChange?: any;
}

const PasswordBox: React.FC<PasswordBoxProps> = ({
  onChange,
  setError,
  form,
  error,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
  const common = { onChange, form };
  return (
    <>
      <InputBox Icon={Lock} title={"Password"}  {...common} type="password" />
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
