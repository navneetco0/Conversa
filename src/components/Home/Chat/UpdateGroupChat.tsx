import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import updateGroupChat from "../../../api/Chat/updateGroupChat";
import searchUser from "../../../api/User/searchUser";
import Edit from "../../../Assets/svgs/Helpers/Edit";
import { ProfilePic } from "../../Auth/ProfilePic";

interface Form {
  profile_pic?: any;
  chatName?: string;
  users?: any;
  id?: string;
}

const UpdateGroupChat: React.FC<Form> = ({
  profile_pic,
  chatName,
  users,
  id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const [form, setForm] = React.useState<Form>({
    profile_pic,
    chatName,
    users,
  });

  useEffect(() => {
    setForm({ profile_pic, chatName, users });
  }, [profile_pic, chatName, users, id]);

  const [value, setValue] = React.useState("");
  const [display, setDisplay] = React.useState(false);
  const [search, setSearch] = React.useState([]);
  const toast = useToast();

  const createGroup = useMutation({
    mutationFn: updateGroupChat,
    onSuccess: (data) => {
      if (data?.chat?.chatName) {
        toast({
          title: "Group updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          description: "Group updated successfully",
          position: "top",
        });
        onClose();
      }
      queryClient.prefetchQuery(["users"]);
    },
  });

  const mutation = useMutation({
    mutationFn: searchUser,
    onSuccess: (data) => {
      setSearch(data);
    },
  });

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profile_pic") {
      setForm({ ...form, profile_pic: files?.[0] });
      setDisplay(true);
      return;
    }
    if (name === "user") {
      setValue(value);
      value ? mutation.mutate(value) : setSearch([]);
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const addUser = (data: any) => {
    const users = form?.users || [];
    const isExist = users?.find((user: any) => user?._id === data?._id);
    if (isExist) {
      toast({
        title: "User already added",
        status: "error",
        duration: 3000,
        isClosable: true,
        description: "Please search and add another user!",
        position: "top",
      });
      return;
    }
    setForm({ ...form, users: [...users, data] });
    setSearch([]);
    setValue("");
  };

  const removeUser = (data: any) => {
    const users = form?.users || [];
    const newUsers = users?.filter((user: any) => user?._id !== data?._id);
    setForm({ ...form, users: newUsers });
  };

  const handleSubmit = () => {
    if (!form?.chatName) {
      toast({
        title: "Please enter group name",
        status: "error",
        duration: 3000,
        isClosable: true,
        description: "Please enter group name",
        position: "top",
      });
      return;
    }
    if (form?.users?.length < 2) {
      toast({
        title: "Please add atleast 2 users",
        status: "error",
        duration: 3000,
        isClosable: true,
        description: "Please add atleast 2 users",
        position: "top",
      });
      return;
    }
    let formData = new FormData();
    if (form?.profile_pic === profile_pic) {
      formData = profile_pic;
    } else {
      formData.append("file", form?.profile_pic);
      formData.append("upload_preset", "chit-chat");
      formData.append("cloud_name", "chit-chat");
    }
    const Form = {
      prev_pic: profile_pic,
      chatName: form?.chatName,
      users: form?.users?.map((user: any) => user?._id),
      GroupPic: formData,
      id,
    };
    createGroup.mutate(Form);
    setForm({});
  };

  return (
    <>
      <Flex justifyContent="flex-end" mb="10px">
        <Button
          onClick={onOpen}
          variant={"unstyled"}
          size={"sm"}
          colorScheme="secondary"
        >
          <Edit height={"25px"} />
        </Button>
      </Flex>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack>
              <ProfilePic
                title={"Group Picture"}
                file={form?.profile_pic}
                display={display}
                setDisplay={setDisplay}
                onChange={handleChange}
                name="profile_pic"
                isDisabled={false}
              />
              {form?.users && (
                <Flex overflow={"scroll"} gap="10px" w="100%">
                  {form?.users?.map((user: any, index: number) => (
                    <VStack
                      key={index}
                      pos={"relative"}
                      p="5px"
                      rounded={"5px"}
                      spacing={0}
                      w="fit-content"
                      justifyContent={"center"}
                      bg="secondary.50"
                    >
                      <Button
                        variant={"unstyled"}
                        top={"-20px"}
                        right={"-5px"}
                        pos={"absolute"}
                        color="tertiary.700"
                        fontSize={"4xl"}
                        onClick={() => removeUser(user)}
                      >
                        -
                      </Button>
                      <Avatar src={user?.profile_pic} />
                      <Text
                        fontWeight={"black"}
                        className="name"
                        fontSize={"x-small"}
                      >
                        {user.name}
                      </Text>
                      <Text
                        fontWeight={"black"}
                        fontSize="xx-small"
                        className="name"
                      >
                        {user.email}
                      </Text>
                    </VStack>
                  ))}
                </Flex>
              )}
              <Input
                name={"chatName"}
                value={form?.chatName}
                onChange={handleChange}
                placeholder="Group Name"
                variant={"outline"}
              />
              <Box position="relative" w="100%">
                <Input
                  w={"100%"}
                  name={"user"}
                  onChange={handleChange}
                  placeholder="Add User"
                  variant={"outline"}
                  value={value}
                />
                {!!search.length && (
                  <Flex
                    bg="secondary.50"
                    p={2}
                    rounded={"5px"}
                    zIndex={1}
                    flexDir={"column"}
                    gap={1}
                    position={"absolute"}
                    w="100%"
                  >
                    {search?.map((user: any, index: number) => (
                      <Flex
                        onClick={() => addUser(user)}
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
                          },
                        }}
                        color="black"
                      >
                        <Avatar src={user?.profile_pic} />
                        <Box>
                          <Text fontWeight={"black"} className="name">
                            {user.name}
                          </Text>
                          <Text
                            fontWeight={"black"}
                            fontSize="sm"
                            className="name"
                          >
                            Email: {user.email}
                          </Text>
                        </Box>
                      </Flex>
                    ))}
                  </Flex>
                )}
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="secondary" mr={3} onClick={handleSubmit}>
              Update Group
            </Button>
            <Button colorScheme="primary" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChat;
