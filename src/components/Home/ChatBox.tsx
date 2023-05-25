import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Left, Right } from "Assets/svgs/Directions";
import { getSender } from "components/Helper/Chat";
import React from "react";
import UpdateGroupChat from "./Chat/UpdateGroupChat";
import { useMutation, useQuery } from "@tanstack/react-query";
import sendMessage from "api/Message/sendMessage";
import getAllMessages from "api/Message/getAllMessages";
import Chat from "./Chat/Chat";

interface ChatBoxProps {
  selected: string;
  users: any;
  user: any;
  setSelected: (id: string | null) => void;
}
const ChatBox: React.FC<ChatBoxProps> = ({
  selected,
  users,
  user,
  setSelected,
}) => {
  const { data } = useQuery(["messages", selected], () =>
    getAllMessages(selected)
  );
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      if (data?.message) {
        toast({
          title: data?.message,
          status: "info",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });
  const chat = users?.find((user: any) => user._id === selected);
  const [value, setValue] = React.useState("");
  const isGroupChat = chat?.isGroupChat;
  const sender = isGroupChat ? null : getSender(user, chat?.users);
  const handleSubmit = () => {
    if (value === "") return;
    const form = {
      content: value,
      chatId: selected,
    };
    mutation.mutate(form);
    setValue("");
  };
  const handleKey = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <Box flexGrow={1} minH={"100vh"} pt={"70px"}>
      <Box
        w={"full"}
        position={"relative"}
        bg="gray.100"
        overflow={"auto"}
        h={"full"}
      >
        <Flex
          zIndex={2}
          left={0}
          top={0}
          p={2}
          bg={"secondary.100"}
          w="100%"
          position={"absolute"}
          justifyContent={"space-between"}
        >
          <Header
            avatar={isGroupChat ? chat?.GroupPicture : sender?.profile_pic}
            name={isGroupChat ? chat?.chatName : sender?.name}
            detail={
              isGroupChat
                ? chat?.users?.map((user: any) => user.name).join(", ")
                : sender?.email
            }
            setSelected={setSelected}
          />
          {isGroupChat && chat.groupAdmin?._id === user?._id && (
            <UpdateGroupChat
              profile_pic={chat?.GroupPicture}
              chatName={chat?.chatName}
              users={chat?.users}
              id={chat?._id}
            />
          )}
        </Flex>
        {data?.messages && <Chat messages={data?.messages} />}
        <Box
          left={0}
          position={"absolute"}
          bottom="10px"
          w="100%"
          bg="secondary.100"
          p={2}
        >
          <InputGroup>
            <Input
              value={value}
              onKeyDown={handleKey}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Please type your chat here..."
              bg="white"
              variant={"outline"}
            />
            <InputRightElement>
              <Button onClick={handleSubmit} variant={"unstyled"}>
                <Right height="30px" />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
    </Box>
  );
};

interface HeaderProps {
  avatar?: string;
  name?: string;
  detail?: string;
  setSelected: (id: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({
  avatar,
  name,
  detail,
  setSelected,
}) => {
  const handleBack = () => {
    setSelected(null);
  };
  return (
    <Flex gap={"10px"} alignItems={"center"}>
      <Button
        display={["inline", "inline", "none"]}
        variant={"unstyled"}
        onClick={handleBack}
      >
        <Left height="30px" />
      </Button>
      <Avatar src={avatar} />
      <Box>
        <b>{name}</b>
        <Text
          w={"80%"}
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
        >
          {detail}
        </Text>
      </Box>
    </Flex>
  );
};

export default ChatBox;
