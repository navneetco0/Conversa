import { Box, Circle, Image, Text } from "@chakra-ui/react";
import { Camera, User } from "../../Assets/svgs/Form";
import "./Auth.css";
import React from "react";

interface ProfilePicProps {
  file: File | null;
  name: string;
  isDisabled: boolean;
}

export const ProfilePic: React.FC<ProfilePicProps> = ({ file, isDisabled, ...other }) => {
  const src = file ? URL.createObjectURL(file) : null;

  return (
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
      {!isDisabled&&<Box className="profileCamBox">
        <Box w={200} h={200} className="overlay">
          <Camera />
          <Text fontSize="xl" color="white" fontWeight="black">
            Select Profile Picture
          </Text>
        </Box>
        <input
          className="profileInput"
          id="profile_pic"
          type="file"
          accept="image/*"
          {...other}
        />
      </Box>}
    </Circle>
  );
};
