import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ListSkeleton = () => {
  return (
    <Stack>
      {new Array(10).fill(0).map((_, i) => (
        <Skeleton key={i} height="20px" />
      ))}
    </Stack>
  );
};

export default ListSkeleton;
