import { HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { LinkButton } from './LinkButton'

export const Layout = ({state, setState, Children}) => {
    return (
        <VStack>
            <Text fontSize={"2xl"} fontWeight={"bold"}>{state?"Login":"Sign Up"}</Text>
            {Children}
            <HStack>
                <Text fontWeight={"bold"} color={"gray.500"}>{state?"Don't have an account yet?": "Already have an account?"}</Text>
                <LinkButton title={"Sign Up here"} onClick={() => setState(!state)} />
            </HStack>
        </VStack>
    )
}
