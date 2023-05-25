import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface ChatProps {
  messages: any;
  sender: any;
}

const Chat: React.FC<ChatProps> = ({ messages, sender }) => {
  return (
    <Flex
      w="inherit"
      overflow={'hidden'}
      h="100%"
      paddingBottom={"60px"}
      paddingTop={"50px"}
    >
      <Flex gap={2} flexDir={"column"} justifyContent={"flex-end"} w={"100%"} p={2} height={'inherit'} overflow={"scroll"}>
        {messages?.map((message: any, index: number) => (
          <Flex rounded="20px" borderBottomLeftRadius={message?.sender?._id===sender?._id?"0px": "20px"} borderBottomEndRadius={message?.sender?._id===sender?._id?"20px": "0px"} key={index} p={2} bg={"secondary.400"} maxW={"80%"} alignSelf={message?.sender?._id===sender?._id?"flex-start":"flex-end"} >
            <Text color="white">{message?.content}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Chat;
