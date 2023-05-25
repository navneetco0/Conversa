import {
  Box,
  Button,
  Center,
  Flex,
  Skeleton,
  SkeletonCircle,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { Left } from "../../../Assets/svgs/Directions";

interface ChatSkeletonProps {
  setSelected: (id: string | null) => void;
}

const ChatSkeleton: React.FC<ChatSkeletonProps> = ({ setSelected }) => {
  const handleBack = () => {
    setSelected(null);
  };
  return (
    <Box flexGrow={1} minH={"100vh"} pt={"70px"}>
      <Box
        w={"full"}
        position={"relative"}
        bg="gray.100"
        overflow={"auto"}
        h={"full"}
      >
        <Flex
          zIndex={2}
          left={0}
          top={0}
          p={2}
          bg={"secondary.100"}
          w="100%"
          position={"absolute"}
          justifyContent={"space-between"}
        >
          <Flex w="100%" gap={"10px"} alignItems={"center"}>
            <Button
              display={["inline", "inline", "none"]}
              variant={"unstyled"}
              onClick={handleBack}
            >
              <Left height="30px" />
            </Button>
            <SkeletonCircle size="50px" />
            <Box flexGrow={1}>
              <Skeleton w={"30%"} height="20px" />
              <Skeleton mt="10px" w={"80%"} height="10px" />
            </Box>
          </Flex>
        </Flex>

        <Center
          w="inherit"
          overflow={"hidden"}
          h="100%"
          paddingBottom={"60px"}
          paddingTop={"50px"}
        >
          <Spinner size={"lg"} color={"secondary.200"} />
        </Center>

        <Box
          left={0}
          position={"absolute"}
          bottom="10px"
          w="100%"
          bg="secondary.100"
          p={2}
        >
          <Skeleton w={"100%"} height="30px" />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatSkeleton;
