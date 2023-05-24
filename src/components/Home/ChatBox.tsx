import { Box } from "@chakra-ui/react";
import React from "react";

interface ChatBoxProps {
  selected: string;
  users: any;
}
const ChatBox: React.FC<ChatBoxProps> = ({ selected, users }) => {
    const chat = users?.find((user: any) => user._id === selected);
  return <Box flexGrow={1} minH={"100vh"}>
    
  </Box>;
};

export default ChatBox;
