import { Avatar, Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { Left } from "Assets/svgs/Directions";
import { getSender } from "components/Helper/Chat";
import React from "react";
import UpdateGroupChat from "./Chat/UpdateGroupChat";

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
  const chat = users?.find((user: any) => user._id === selected);
  const isGroupChat = chat?.isGroupChat;
  const sender = isGroupChat ? null : getSender(user, chat?.users);
  if (!selected)
    return (
      <Center w="100%" minH={"100vh"}>
        <Text fontWeight={"black"}>Please Select atleast 1 chat</Text>
      </Center>
    );
  return (
    <Box flexGrow={1} minH={"100vh"} pt={"70px"}>
      <Box
        p={2}
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
