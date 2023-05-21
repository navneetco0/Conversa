import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import MenuBtn from "./MenuBtn";
import { Logo } from "Assets/svgs/Images";

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
      paddingY={1}
      h="70px"
      justifyContent={"space-between"}
    >
        <Box w="50px" h="50px">
          <Logo/>
        </Box>
        <MenuBtn data={data} />
    </HStack>
  );
};

export default Navbar;
