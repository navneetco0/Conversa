import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface ChatProps {
  messages: any;
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  return (
    <Flex
      w="inherit"
      overflow={'hidden'}
      h="100%"
      paddingBottom={"58px"}
      paddingTop={"50px"}
    >
      <Flex gap={2} flexDir={"column-reverse"} p={2} height={'inherit'} overflow={"scroll"}>
        {messages?.map((message: any, index: number) => (
          <Flex key={index} p={2} bg={"secondary.400"}>
            <Text>{message?.content}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Chat;
