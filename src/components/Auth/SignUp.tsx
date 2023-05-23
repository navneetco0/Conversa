import React, { ChangeEvent, FC, useState } from "react";
import { Identy } from "../../Assets/svgs/Form";
import { InputBox } from "./InputBox";
import { ProfilePic } from "./ProfilePic";
import { Text } from "@chakra-ui/react";
import EmailBox from "./EmailBox";
import PasswordBox from "./PasswordBox";

interface Form {
  name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  profile_pic?: any;
  token?: string | null;
  email_varified: boolean;
  otp: string;
}

export const SignUp: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<Form>({ email_varified: false, otp: "" });
  const [display, setDisplay] = useState<boolean>(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profile_pic") {
      setForm({ ...form, profile_pic: files?.[0] });
      setDisplay(true);
      return;
    }
    if (name === "otp") {
      value.length <= 6 && setForm({ ...form, [name]: value });
      return;
    }
    setForm({ ...form, [name]: value });
    setError({});
  };
  const common = { onChange: handleChange, form };

  return (
    <>
      <ProfilePic
        title="Profile Picture"
        display={display}
        setDisplay={setDisplay}
        isDisabled={loading}
        file={form?.profile_pic}
        name={"profile_pic"}
        {...common}
      />
      <InputBox Icon={Identy} title={"Name"} {...common} />
      {error?.name && (
        <Text w="100%" color="red">
          {error?.name}
        </Text>
      )}
      <EmailBox {...common} error={error} setForm={setForm} />
      {form?.email_varified && (
        <PasswordBox
          {...common}
          error={error}
          loading={loading}
          setLoading={setLoading}
          setError={setError}
        />
      )}
    </>
  );
};
