import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import MenuBtn from "./MenuBtn";

interface NavbarProps {
    data: any;
}

const Navbar: React.FC<NavbarProps> = ({data}) => {
  return (
    <HStack
      position={"fixed"}
      top={0}
      left={0}
      w={"100%"}
      bg={"secondary.100"}
      paddingX={5}
      paddingY={3}
      justifyContent={"space-between"}
    >
        <Text fontWeight={"bold"}>Chit-Chat</Text>
        <MenuBtn data={data} />
    </HStack>
  );
};

export default Navbar;
