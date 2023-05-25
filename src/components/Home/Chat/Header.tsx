import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Left } from "../../../Assets/svgs/Directions";
import UpdateGroupChat from "./UpdateGroupChat";

interface HeaderProps {
  avatar?: string;
  name?: string;
  detail?: string;
  setSelected: (id: string | null) => void;
  isGroupChat?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  avatar,
  name,
  detail,
  setSelected,
  isGroupChat,
}) => {
  const handleBack = () => {
    setSelected(null);
  };
  return (
    <Flex
      zIndex={2}
      left={0}
      top={"70px"}
      p={2}
      bg={"secondary.100"}
      w="100%"
      position={"absolute"}
      justifyContent={"space-between"}
    >
      <Flex gap={"10px"} alignItems={"center"}>
        <Button
          display={["inline", "inline", "none"]}
          variant={"unstyled"}
          onClick={handleBack}
        >
          <Left height="30px" />
        </Button>
        <Avatar src={avatar} />
        <Box>
          <b>{name}</b>
          <Text
            w={"80%"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {detail}
          </Text>
        </Box>
      </Flex>
      {isGroupChat && (
        //   && chat.groupAdmin?._id === user?._id
        <UpdateGroupChat
          profile_pic={avatar}
          chatName={name}
          // users={users}
          // id={chat?._id}
        />
      )}
    </Flex>
  );
};

export default Header;
