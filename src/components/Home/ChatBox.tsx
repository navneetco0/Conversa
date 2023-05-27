import { Box, useToast } from "@chakra-ui/react";
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
import { api } from "../../constant/helper";

const ENDPOINT = api;
let socket: any;

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
  const { data, isLoading, refetch } = useQuery(["messages", selected], () =>
    getAllMessages(selected, socket)
  );

  const [socketConnected, setSocketConnected] = useState(false);
  const [rows, setRows] = useState(1);
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
  const isGroupChat = chat?.isGroupChat;
  const [value, setValue] = React.useState("");
  const sender = isGroupChat? null: getSender(user, chat?.users);
  const handleSubmit = () => {
    socket.emit("stop typing", selected);
    if (value === "") return;
    const form = {
      content: value,
      chatId: selected,
    };
    mutation.mutate(form);
    setValue("");
    setRows(1);
  };
  const handleKey = (e: any) => {
    adjustTextareaRows(e.currentTarget);
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        socket.emit("stop typing", selected);
        handleSubmit();
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: any) => {
      if (!selected || selected !== newMessageRecieved.chat._id) {
      } else {
        refetch();
      }
    });
  });

  const handleChange = (e: any) => {
    adjustTextareaRows(e.currentTarget);
    setValue(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selected);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selected);
        setTyping(false);
      }
    }, timerLength);
  };
  const adjustTextareaRows = (textarea: HTMLTextAreaElement) => {
    const { scrollHeight, clientHeight } = textarea;
    const newRows = Math.ceil(scrollHeight / clientHeight);
    setRows(newRows);
  };

  if (isLoading) return <ChatSkeleton setSelected={setSelected} />;
  return (
    <Box flexGrow={1} h={"100vh"} position={"relative"} bg={"red.500"}>
      <Box w={"full"} bg="gray.100" overflow={"auto"} h={"100vh"}>
        <Header
          typing={istyping}
          avatar={isGroupChat ? chat?.GroupPicture : sender?.profile_pic}
          name={isGroupChat ? chat.chatName : sender?.name}
          detail={
            isGroupChat
              ? chat.users.map((user: any) => user.name).join(", ")
              : sender?.email
          }
          user={user}
          chat={chat}
          setSelected={setSelected}
          isGroupChat={chat?.groupAdmin?._id === user?._id}
        />
        <Chat
          data={data}
          user={user}
        />
        <InputBox
          value={value}
          rows={rows}
          onKeyDown={handleKey}
          onChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
};

export default ChatBox;
