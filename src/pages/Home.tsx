import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import { tokenAuth } from "../api/Authentication/tokenAuth";
import getChat from "../api/Chat/getChat";
import searchUser from "../api/User/searchUser";
import Navbar from "../components/Home/Navbar";
import CreateGroupChat from "../components/Home/Chat/CreateGroupChat";
import { Search } from "../Assets/svgs/Directions";
import ListSkeleton from "../components/Home/ListSkeleton";
import SearchResult from "../components/Home/SearchResult";
import ChatBox from "../components/Home/ChatBox";
import MyChat from "../components/Home/MyChat";

export const Home: FC = () => {
  const { data } = useQuery(["user"], tokenAuth);
  const [search, setSearch] = React.useState<string>("");
  const { data: user } = useQuery(["user"], tokenAuth);
  const { data: users } = useQuery(["users"], getChat);
  const [selected, setSelected] = React.useState<any>(null);
  const [searchResult, setSearchResult] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingChat, setLoadingChat] = React.useState<boolean>(false);
  const toast = useToast();
  const muation = useMutation({
    mutationFn: searchUser,
    onSuccess: (data) => {
      if (!data.length) {
        toast({
          title: "no user found",
          status: "info",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
      setSearchResult(data);
      setLoading(false);
    },
  });

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

  const handleSearch = () => {
    setLoading(true);
    muation.mutate(search);
    setLoading(false);
  };

  return (
    <Box w="100%" h="100vh" overflow={'hidden'}>
      <Navbar data={data?.user} />
      <Flex h="100vh" w="100%">
        <Box
          display={[
            selected ? "none" : "block",
            selected ? "none" : "block",
            "block",
          ]}
          w={["100%", "100%", "300px"]}
          minH={"100vh"}
          pt={"80px"}
          borderRightWidth={1}
          position="relative"
        >
          <Box
            p={2}
            w={"full"}
            bg="gray.100"
            overflow={"auto"}
            rounded={"10px"}
            h={"full"}
          >
            <Box
              top={"70px"}
              zIndex={2}
              left={0}
              p={2}
              bg={"secondary.100"}
              w="100%"
              position={"absolute"}
            >
              <CreateGroupChat />
              <Tooltip
                label="Search Users to chat"
                hasArrow
                placeContent={"bottom-end"}
                aria-label="Search"
              >
                <InputGroup w="100%" size={"sm"}>
                  <Input
                    bg="white"
                    value={search}
                    onChange={(e) => {
                      const { value } = e.target;
                      if (!value) setSearchResult([]);
                      setSearch(value);
                    }}
                    variant={"outline"}
                    placeholder="Search Users to chat"
                  />
                  {search && (
                    <InputRightElement>
                      {loading ? (
                        <Spinner />
                      ) : (
                        <Button variant={"unstyled"} onClick={handleSearch}>
                          <Search height="30px" fill="primary.900" />
                        </Button>
                      )}
                    </InputRightElement>
                  )}
                </InputGroup>
              </Tooltip>
            </Box>
            {loading ? <ListSkeleton /> : null}
            {!!searchResult.length ? (
              <SearchResult data={searchResult} />
            ) : (
              <MyChat
                data={users}
                user={user}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </Box>
        </Box>
        {selected ? (
          <ChatBox
            setSelected={setSelected}
            selected={selected}
            user={user?.user}
            users={users?.chats}
          />
        ) : (
          <Center w="100%" minH={"100vh"}>
            <Text fontWeight={"black"}>Please Select atleast 1 chat</Text>
          </Center>
        )}
      </Flex>
    </Box>
  );
};
