import { Box, Circle, Image, Text } from "@chakra-ui/react";
import { Camera, User } from "../../Assets/svgs/Form";
import "./Auth.css";

export const ProfilePic = ({ file, ...others }) => {
  const src = file ? URL.createObjectURL(file) : null;
  return (
    <Circle
      border={"1px solid gray"}
      w="200px"
      h="200px"
      position="relative"
      overflow={"hidden"}
      className="profileBox"
    >
      <Box w="250px" h="250px" position={"absolute"} color="primary.700">
        {src ? <Image src={src} alt="profile_pic" /> : <User />}
      </Box>
      <Box className="profileCamBox">
        <Box w="200px" h="200px" className="overlay">
          <Camera />
          <Text fontSize={"xl"} color="white" fontWeight={"black"}>
            Select Profile Picture
          </Text>
        </Box>
        <input
          className="profileInput"
          id="profile_pic"
          type={"file"}
          {...others}
        />
      </Box>
    </Circle>
  );
};
