import { Container, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import { SignUp } from "../components/Auth/SignUp";
import { Layout } from "../components/Auth/Layout";
import { SignIn } from "../components/Auth/SignIn";

export const LoginPage : FC = () => {
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
          {state ? <SignIn /> : <SignUp />}
        </Layout>
      </VStack>
    </Container>
  );
};
