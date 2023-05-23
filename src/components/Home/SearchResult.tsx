import { Avatar, Box, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface SearchResultProps {
  data: any;
}

const SearchResult: React.FC<SearchResultProps> = ({ data }) => {
  const handleChat = (id: string) =>{

  }
  return (
    <Flex flexDir={"column"} gap={"8px"} h={"100%"} mt="50px">
      {data.map((profile: any, index: number) => (
        <Flex
          onClick={()=>handleChat(profile._id)}
          gap={"5px"}
          cursor={"pointer"}
          key={index}
          paddingX="5px"
          paddingY="4px"
          rounded={"5px"}
          bg="primary.400"
          _hover={{ bg: "secondary.900", color: "white" }}
          sx={{
            "&:hover .name": {
              color: "white",
            }
          }}
          color="black"
        >
          <Avatar src={profile?.profile_pic} />
          <Box>
            <Text fontWeight={"black"} className="name" >{profile.name}</Text>
            <Text fontWeight={"black"} fontSize="sm" className="name">Email: {profile.email}</Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};

export default SearchResult;
