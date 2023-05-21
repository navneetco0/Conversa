import {
  Box,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
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

  const [search, setSearch] = React.useState<string>("");
  const [searchResult, setSearchResult] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingChat, setLoadingChat] = React.useState<boolean>(false);

  if (!data?.user)
    return (
      <Container maxW={"xl"} centerContent>
        <Spinner size={"xl"} thickness="5px" color="blue.500" />
      </Container>
    );

  return (
    <Box w="100%">
      <Navbar data={data?.user} />
      <Flex minH="100vh" w="100%">
        <Box w="300px" minH={"100vh"} p={2} pt={"80px"} borderRightWidth={1}>
          <Box p={2} w={"full"} bg="gray.100" rounded={"10px"} h={"full"}>
            <Tooltip label="Search Users to chat" hasArrow placeContent={'bottom-end'} aria-label="Search">
              <InputGroup>
                <Input bg="white" variant={"outline"} placeholder="Search Users to chat" />
              </InputGroup>
            </Tooltip>
          </Box>
        </Box>
        <Box flexGrow={1} minH={"100vh"}></Box>
      </Flex>
    </Box>
  );
};
