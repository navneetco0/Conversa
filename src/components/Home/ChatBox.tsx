import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { getSender } from "components/Helper/Chat";
import React from "react";

interface ChatBoxProps {
  selected: string;
  users: any;
  user: any;
}
const ChatBox: React.FC<ChatBoxProps> = ({ selected, users, user }) => {
  const chat = users?.chats?.find((user: any) => user._id === selected);
  //   console.log(sender)
  const isGroupChat = chat?.isGroupChat;
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
          gap={"10px"}
          zIndex={2}
          left={0}
          top={0}
          p={2}
          bg={"secondary.100"}
          w="100%"
          position={"absolute"}
        >
            {isGroupChat && <GroupHeader chat={chat}/>}
        </Flex>
      </Box>
    </Box>
  );
};

interface GroupHeaderProps {
  chat: any;
}

const GroupHeader: React.FC<GroupHeaderProps> = ({ chat }) => {
  return (
    <>
      <Avatar src={chat?.GroupPicture} />
      <Box>
        <b>{ chat?.chatName}</b>
        <Text
          w={"80%"}
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
        >
          {chat?.users?.map((user: any) => user.name).join(", ")}
        </Text>
      </Box>
    </>
  );
};

export default ChatBox;
