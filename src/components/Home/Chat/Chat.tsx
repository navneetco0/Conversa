import { Avatar, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

interface ChatProps {
  sender: any;
  selected: string;
  data: any;
  typing: boolean;
  user: any;
}

const Chat: React.FC<ChatProps> = ({ sender, selected, data, typing, user }) => {
  console.log(data)
  useEffect(() => {
    const bottom = document.getElementById("bottom");
    bottom?.scrollIntoView({ behavior: "smooth" });
  }, [data]);
  return (
    <Flex
      w="inherit"
      minH="100%"
      overflow={"scroll"}
      paddingBottom={"60px"}
      paddingTop={"140px"}
    >
      <Flex
        gap={2}
        flexDir={"column"}
        justifyContent={"flex-end"}
        minH={"100%"}
        alignItems={"flex-end"}
        w={"100%"}
        p={2}
      >
        {data?.messages?.map((message: any, index: number) => (
          <Flex
            gap="10px"
            key={index}
            alignSelf={
              message?.sender?._id === user?._id ? "flex-end" : "flex-start"
            }
            maxW="80%"
          >
            {message?.sender?._id !== user?._id&&<Avatar src={message?.sender?.profile_pic} />}
            <Flex
              rounded="20px"
              borderBottomLeftRadius={
                message?.sender?._id === user?._id ? "20px" : "0px"
              }
              borderBottomEndRadius={
                message?.sender?._id === user?._id ? "0px" : "20px"
              }
              padding={2}
              bg={
                message?.sender?._id === user?._id
                  ? "primary.800"
                  : "secondary.400"
              }
            >
              <Text color="white">{message?.content + " "}</Text>
            </Flex>
          </Flex>
        ))}
        <Text id={"bottom"}></Text>
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
