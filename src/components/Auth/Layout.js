import { Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { LinkButton } from './LinkButton'

export const Layout = ({state, setState, children}) => {
    return (
        <VStack>
            <Text fontSize={"2xl"} fontWeight={"bold"}>{state?"Login":"Sign Up"}</Text>
            {children}
            <Flex w="100%" wrap={'wrap'} gap={"5px"} >
                <Text whiteSpace={"nowrap"} fontWeight={"bold"} color={"gray.500"}>{state?"Don't have an account yet?": "Already have an account?"}</Text>
                <LinkButton title={state?"Sign Up here":"Sign In here"} onClick={() => setState(!state)} />
            </Flex>
        </VStack>
    )
}
