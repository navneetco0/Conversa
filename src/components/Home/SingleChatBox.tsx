import { Box, Center, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Chat from "./Chat/Chat";
import sendMessage from "../../api/Message/sendMessage";
import { getSender } from "../Helper/Chat";
import InputBox from "./Chat/InputBox";
import Header from "./Chat/Header";
import { io } from "socket.io-client";
import getAllMessages from "../../api/Message/getAllMessages";
import ChatSkeleton from "./Chat/ChatSkeleton";

const ENDPOINT = "http://localhost:4000";
let socket: any, selectedChatCompare;

interface SingleChatBoxProps {
  selected: string;
  users: any;
  user: any;
  setSelected: (id: string | null) => void;
}
const SingleChatBox: React.FC<SingleChatBoxProps> = ({
  selected,
  users,
  user,
  setSelected,
}) => {
  const { data, isLoading, refetch } = useQuery(["messages", selected], () =>
    getAllMessages(selected)
  );

  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      queryClient.prefetchQuery(["messages", selected]);
      queryClient.prefetchQuery(["users"]);
      socket.emit("new message", data?.messages);
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
  const sender = getSender(user, chat?.users);
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
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.emit("join chat", selected);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: any) => {
      if (!selected || selected !== newMessageRecieved.chat._id) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        refetch();
      }
    });
  });

  if (isLoading) return <ChatSkeleton setSelected={setSelected} />;
  return (
    <Box flexGrow={1} minH={"100vh"} pt={"70px"}>
      <Box
        w={"full"}
        position={"relative"}
        bg="gray.100"
        overflow={"auto"}
        h={"full"}
      >
        <Header
          avatar={sender?.profile_pic}
          name={sender?.name}
          detail={sender?.email}
          setSelected={setSelected}
          isGroupChat={false}
        />
        <Chat data={data} selected={selected} sender={sender} />
        <InputBox
          value={value}
          onKeyDown={handleKey}
          onChange={(e) => setValue(e.target.value)}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
};

export default SingleChatBox;
