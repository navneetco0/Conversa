import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import { Validation } from "./Validation";
import { Check, Close } from "../../Assets/svgs/Form";
import React from "react";

interface PasswordErrorProps {
  password: string | undefined;
  confirm_password: string | undefined;
}

export const PasswordError : React.FC<PasswordErrorProps> = ({ password, confirm_password }) => {
  const validation = Validation({ password, confirm_password });
  return (
    <Box>
      <Text>Password must contain: </Text>
      <ErrorBox
        isValid={validation?.pass_capital}
        error={"at least one capital letter"}
      />
      <ErrorBox
        isValid={validation?.pass_small}
        error={"at least one smaller letter"}
      />
      <ErrorBox
        isValid={validation?.pass_digit}
        error={"at least one digit"}
      />
      <ErrorBox
        isValid={validation?.special}
        error={"at least one special character"}
      />
      <Divider/>
      <ErrorBox
        isValid={validation?.pass_length}
        error={"Password must be at least 8 characters"}
      />
      <ErrorBox
        isValid={validation?.pass_match}
        error={"Password Should match"}
      />
    </Box>
  );
};

interface ErrorBoxProps {
  isValid: boolean;
  error: string;
}

const ErrorBox : React.FC<ErrorBoxProps> = ({ isValid, error }) => {
  return (
    <HStack alignItems={"center"}>
      <Box h="20px" w="20px" color={!!isValid ? "secondary.500" : "tertiary.600"}>
        {!!isValid ? <Check /> : <Close />}
      </Box>
      <Text fontWeight={!!isValid?"bold":""}>{error}</Text>
    </HStack>
  );
};
