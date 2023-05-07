import { Button } from '@chakra-ui/react'
import React from 'react'

export const LinkButton = ({ title, ...others }) => {
    return (
        <Button
            variant={"link"}
            textDecoration={"underline"}
            colorScheme='blue'
            {...others}
        >
            {title}
        </Button>
    )
}
