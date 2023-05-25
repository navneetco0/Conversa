import { Box, Circle, Flex, Image, Text } from "@chakra-ui/react";
import { Camera, User } from "../../Assets/svgs/Form";
import "./Auth.css";
import React from "react";
import { Crop } from "../Helper/Crop";

interface ProfilePicProps {
  title: string;
  file: any;
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  isDisabled: boolean;
}

export const ProfilePic: React.FC<ProfilePicProps> = ({
  title,
  file,
  display,
  setDisplay,
  onChange,
  isDisabled,
  ...other
}) => {
  const src =
    typeof file === "string" ? file : file ? URL.createObjectURL(file) : null;

  return (
    <>
      <Circle
        border={"1px solid gray"}
        size={200}
        position="relative"
        overflow="hidden"
        className="profileBox"
      >
        <Box w={250} h={250} position="absolute" color="primary.700">
          {src ? <Image src={src} alt="profile_pic" /> : <User />}
        </Box>
        {!isDisabled && (
          <Box className="profileCamBox">
            <Box w={200} h={200} className="overlay">
              <Camera />
              <Text fontSize="xl" color="white" fontWeight="black">
                Select {title}
              </Text>
            </Box>
            <input
              className="profileInput"
              id="profile_pic"
              type="file"
              accept="image/*"
              onChange={onChange}
              {...other}
            />
          </Box>
        )}
      </Circle>
      {display && (
        <Flex
          pos={"fixed"}
          top="0"
          left={0}
          w="100%"
          h="100vh"
          bg="white"
          zIndex="4"
          overflowY="scroll"
          alignItems="center"
        >
          <Crop
            setDisplay={setDisplay}
            handleChange={onChange}
            aspect={1}
            profile_pic={URL.createObjectURL(file)}
          />
        </Flex>
      )}
    </>
  );
};
