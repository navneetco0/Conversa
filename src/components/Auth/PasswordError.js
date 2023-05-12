import { Box, Text } from "@chakra-ui/react";
import { Validation } from "./Validation";

export const PasswordError = ({ password, confirm_password }) => {
  const validation = Validation({ password, confirm_password });
  console.log(validation);
  return <Box>{<Text></Text>}</Box>;
};
