import { Container, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { tokenAuth } from "api/Authentication/tokenAuth";
import Navbar from "components/Home/Navbar";
import React, { FC, useEffect } from "react";

export const Home: FC = () => {
  const { data } = useQuery(["user"], tokenAuth);
  useEffect(() => {
    if (data?.message === "invalid token") {
      localStorage.removeItem("chit-chat");
      window.location.href = "/login";
    }
  }, [data]);

  if (!data?.user)
    return (
      <Container maxW={"xl"} centerContent>
        <Spinner size={"xl"} thickness="5px" color="blue.500" />
      </Container>
    );

  return (
    <Container maxW={"xl"} centerContent>
      <Navbar data={data?.user} />
    </Container>
  );
};
