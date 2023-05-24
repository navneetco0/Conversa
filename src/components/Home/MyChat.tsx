import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { tokenAuth } from "api/Authentication/tokenAuth";
import getChat from "api/Chat/getChat";
import { setChatId } from "app/chatSlice";
import { getSender } from "components/Helper/Chat";
import React, { useEffect } from "react";

interface SenderCardProps {
  data: any;
  id: string;
  onClick?: () => void;
  bg?: string;
  sx?: any;
}

const SenderCard: React.FC<SenderCardProps> = ({ id, data, ...other }) => {
  const sender = getSender(id, data?.users);
  return (
    <Flex
      gap={"5px"}
      cursor={"pointer"}
      paddingX="5px"
      paddingY="4px"
      rounded={"5px"}
      bg="primary.400"
      _hover={{ bg: "secondary.900", color: "white" }}
      {...other}
    >
      <Avatar src={sender?.profile_pic} />
      <Box>
        <Text fontWeight={"black"} className="name">
          {sender?.name}
        </Text>
        {data?.latestMessage && (
          <Text fontSize="xs">
            <b>{data?.latestMessage.sender.name} : </b>
            {data?.latestMessage.content.length > 50
              ? data?.latestMessage.content.substring(0, 51) + "..."
              : data?.latestMessage.content}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

const Group = ({ data, ...other }: any) => {
  return (
    <Flex
      gap={"5px"}
      cursor={"pointer"}
      paddingX="5px"
      paddingY="4px"
      rounded={"5px"}
      _hover={{ bg: "secondary.900", color: "white" }}
      {...other}
    >
      <Avatar src={data?.GroupPicture} />
      <Box>
        <Text fontWeight={"black"} className="name">
          {data.chatName}
        </Text>
        {data?.latestMessage && (
          <Text fontSize="xs">
            <b>{data?.latestMessage.sender.name} : </b>
            {data?.latestMessage.content.length > 50
              ? data?.latestMessage.content.substring(0, 51) + "..."
              : data?.latestMessage.content}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

interface MyChatProps {
  selected: string;
  setSelected: (id: string) => void;
  data: any;
  user: any;
}

const MyChat: React.FC<MyChatProps> = ({ selected, setSelected, data, user }) => {
  const handleClick = (id: string) => {
    setSelected(id);
    setChatId(id);
  };
  useEffect(() => {
    if (data?.chats?.length > 0) {
      setSelected(data?.chats[0]._id);
      setChatId(data?.chats[0]._id);
    }
  }, [data]);
  return (
    <Flex flexDir={"column"} gap={"8px"} mt="80px">
      {data?.chats?.map((chat: any, index: number) =>
        chat?.isGroupChat ? (
          <Group
            key={index}
            data={chat}
            onClick={() => handleClick(chat._id)}
            bg={selected === chat?._id ? "secondary.900" : "primary.400"}
            sx={{
              ".name": {
                color: selected === chat?._id ? "white" : "black",
              },
              "&:hover .name": {
                color: "white",
              },
            }}
          />
        ) : (
          <SenderCard
            key={index}
            data={chat}
            id={user?.user?._id}
            onClick={() => handleClick(chat._id)}
            bg={selected === chat?._id ? "secondary.900" : "primary.400"}
            sx={{
              ".name": {
                color: selected === chat?._id ? "white" : "black",
              },
              "&:hover .name": {
                color: "white",
              },
            }}
          />
        )
      )}
    </Flex>
  );
};

export default MyChat;
