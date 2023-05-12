import { Box, Center, Circle, Text } from "@chakra-ui/react";
import { Camera, User } from "../../Assets/svgs/Form";
import "./Auth.css";

export const ProfilePic = ({ ...others }) => {
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
                <User />
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
                    type={'file'}
                    {...others}
                />
            </Box>
        </Circle>
    );
};
