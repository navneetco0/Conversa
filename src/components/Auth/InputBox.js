import { FormControl, FormLabel, HStack, Input } from '@chakra-ui/react'

export const InputBox = ({icon, title, ...others}) => {
  return (
    <FormControl spacing={1}>
        <HStack spacing={1} alignItems={'center'}>
            <Box><icon/></Box>
            <FormLabel>{title}</FormLabel>
        </HStack>
        <Input ml={"50px"} {...others}/>
    </FormControl>
  )
}
