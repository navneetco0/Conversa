import { Container, Flex, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { LinkButton } from "../components/Auth/LinkButton";
import FormHandler from "../components/ForgotPassword/FormHandler";

const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate("/login");
  };
  return (
    <Container maxW="xl" centerContent>
      <VStack
        justifyContent={"center"}
        p={3}
        bg="white"
        w="100%"
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <VStack>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Forgot Password
          </Text>
          <FormHandler />
          <Flex wrap={"wrap"} gap={"5px"} alignSelf={"flex-end"}>
            <Text whiteSpace={"nowrap"} fontWeight={"bold"} color={"gray.500"}>
              go to
            </Text>
            <LinkButton title="login page" onClick={goToLoginPage} />
          </Flex>
        </VStack>
      </VStack>
    </Container>
  );
};

export default ForgotPassword;
