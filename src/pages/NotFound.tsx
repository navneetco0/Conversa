import { Container, Text } from "@chakra-ui/react";
import React, { FC } from "react";

export const NotFound : FC = () => {
  return (
    <Container maxW="xl" centerContent>
      <Text color="black">404 | Not Found</Text>
    </Container>
  );
};
