import { Container, VStack } from "@chakra-ui/react";
import React from "react";
import { SignUp } from "../components/Auth/SignUp";
import { Login } from "../components/Auth/login";
import { Layout } from "../components/Auth/Layout";

export const LoginPage = () => {
  const [state, setState] = React.useState(true);
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
        <Layout setState={setState} state={state}>
          {state ? <Login /> : <SignUp />}
        </Layout>
      </VStack>
    </Container>
  );
};
