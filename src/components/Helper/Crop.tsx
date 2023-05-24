import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { FC, useCallback, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import getCroppedImg from "./cropImg";
import { Close } from "../../Assets/svgs/Form";

interface CropProps {
  profile_pic: any;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  aspect: number;
}

export const Crop: FC<CropProps> = ({
  profile_pic,
  setDisplay,
  handleChange,
  aspect,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const [value, setValue] = useState(1);

  const onCrop = async () => {
    if (croppedAreaPixels) {
      const croppedImageUrl = await getCroppedImg(
        profile_pic,
        croppedAreaPixels
      );
      const fileListArray = Array.from([croppedImageUrl]);
      handleChange({
        target: {
          name: "profile_pic",
          files: fileListArray,
        },
      } as any);
    }
    setDisplay(false);
  };

  return (
    <Box
      className="container"
      h={["calc(100vh - 80px)", "80vh"]}
      w={["100%", "400px"]}
      m={"auto"}
      borderRadius={["0px", "10px"]}
      border={["", "1px solid rgb(186, 186, 186)"]}
    >
      <Flex justifyContent={"space-between"} p="5px">
        <Text>Crop Image</Text>
        <Box w="24px" onClick={() => setDisplay(false)} cursor="pointer">
          <Close />
        </Box>
      </Flex>
      <Box pos="relative" h="calc(100% - 160px)" bg="black">
        <Cropper
          image={profile_pic}
          crop={crop}
          zoom={value}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={(e) => setValue(e)}
        />
      </Box>
      <br />
      <Flex w="fit-content" m="auto">
        <Button onClick={() => onCrop()} colorScheme="whatsapp">
          Crop
        </Button>
      </Flex>
    </Box>
  );
};
