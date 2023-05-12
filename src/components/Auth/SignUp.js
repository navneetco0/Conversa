import { useState } from "react";
import { Email, Identy, Lock } from "../../Assets/svgs/Form";
import { InputBox } from "./InputBox";
import { ProfilePic } from "./ProfilePic";
import { PasswordError } from "./PasswordError";

export const SignUp = () => {
  const [form, setForm] = useState();
  console.log(form?.password.search(/[a-z]/));
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "profile_pic")
      return setForm({ ...form, [name]: e.target.files[0] });
    setForm({ ...form, [name]: value });
  };
  const common = { onChange: handleChange, form };

  return (
    <>
      <ProfilePic name={"profile_pic"} {...common} />
      <InputBox Icon={Identy} title={"Name"} {...common} />
      <InputBox Icon={Email} title={"Email"} {...common} />
      <InputBox Icon={Lock} title={"Password"} {...common} type="password" />
      <InputBox
        Icon={Lock}
        title={"Confirm Password"}
        {...common}
        type="password"
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
