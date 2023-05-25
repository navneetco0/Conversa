import { Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import getAllMessages from "../../../api/Message/getAllMessages";
import { useQuery } from "@tanstack/react-query";

interface ChatProps {
  sender: any;
  selected: string;
  data: any;
  typing: boolean;
}

const Chat: React.FC<ChatProps> = ({ sender, selected, data, typing }) => {
  return (
    <Flex
      w="inherit"
      overflow={"hidden"}
      h="100%"
      paddingBottom={"60px"}
      paddingTop={"50px"}
    >
      <Flex
        gap={2}
        flexDir={"column"}
        justifyContent={"flex-end"}
        w={"100%"}
        p={2}
        height={"inherit"}
        overflow={"scroll"}
      >
        {data?.messages?.map((message: any, index: number) => (
          <Flex
            rounded="20px"
            borderBottomLeftRadius={
              message?.sender?._id === sender?._id ? "0px" : "20px"
            }
            borderBottomEndRadius={
              message?.sender?._id === sender?._id ? "20px" : "0px"
            }
            key={index}
            p={2}
            bg={
              message?.sender?._id === sender?._id
                ? "secondary.400"
                : "primary.800"
            }
            maxW={"80%"}
            alignSelf={
              message?.sender?._id === sender?._id ? "flex-start" : "flex-end"
            }
          >
            <Text color="white">{message?.content}</Text>
          </Flex>
        ))}
        {typing && (
          <Flex>
            <Text>typing...</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Chat;
