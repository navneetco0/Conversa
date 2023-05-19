import { Button } from "@chakra-ui/react";
import React from "react";

interface LinkButtonProps {
  title: string;
  onClick?: () => void;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ title, ...others }) => {
  return (
    <Button
      variant={"link"}
      textDecoration={"underline"}
      colorScheme="blue"
      {...others}
    >
      {title}
    </Button>
  );
};
