import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { Right } from "../../../Assets/svgs/Directions";

interface InputBoxProps {
  handleSubmit: () => void;
  value: string;
  onChange: (e: any) => void;
  onKeyDown: (e: any) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ handleSubmit, ...others }) => {
  return (
    <Box
      left={0}
      position={"absolute"}
      bottom="10px"
      w="100%"
      bg="secondary.100"
      p={2}
    >
      <InputGroup>
        <Input
          placeholder="Please type your chat here..."
          bg="white"
          variant={"outline"}
          {...others}
        />
        <InputRightElement>
          <Button onClick={handleSubmit} variant={"unstyled"}>
            <Right height="30px" />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default InputBox;
