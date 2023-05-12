import { Box, FormControl, FormLabel, HStack, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";

export const InputBox = ({ form, Icon, title, ...others }) => {
  const name = title.toLowerCase().split(" ").join("_");
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);
  const handleFocus = () => {
    inputRef.current.focus();
  };
  return (
    <FormControl spacing={1}>
      <Box
        onClick={handleFocus}
        border={`${focus?"2px":"1px"} solid`}
        borderColor={focus?"secondary.300":"gray.300"}
        p="2px 10px"
        borderRadius={"6px"}
      >
        <HStack spacing={1} alignItems={"center"}>
          <Box w="25px">
            {Icon&&<Icon />}
          </Box>
          <FormLabel fontWeight={"bold"}>{title}</FormLabel>
        </HStack>
        <Input
          name={name}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          ref={inputRef}
          placeholder={`Enter ${title} here`}
          variant={"unstyled"}
          pl={"30px"}
          {...others}
        />
      </Box>
    </FormControl>
  );
};
