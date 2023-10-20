import { Flex, Text, Input, Icon, HStack, Box, Avatar, InputRightElement, InputGroup, useTheme, Button, Spinner } from '@chakra-ui/react'
import { useState } from 'react';
import { RiSearchLine, RiNotificationLine, RiUserAddLine, RiSoundModuleFill } from 'react-icons/ri'

export function SearchBox() {

    const { colors, sizes } = useTheme();
    const [isLoading, setIsLoading] = useState(false)
  
    function handleSearch(){

    }

    return (
        <InputGroup>
            <Input
                color="gray.700"
                variant="filled"
                borderColor="blue.100"
                placeholder='Digite sua pesquisa'
                _placeholder={{ color: 'gray.400' }}
                fontSize="sm"
                type="text"
                w={'80%'}
            />

            <InputRightElement
                onClick={handleSearch}
                cursor="pointer"
                width="45%"
            >
                {isLoading ? (
                    <Spinner size="sm" />
                ) : (
                <HStack spacing={2} pr={10} mr={6}>
                    <RiSearchLine color={colors.blue[500]} size={sizes[5]} />
                    <Text>|</Text>
                    <RiSoundModuleFill color={colors.blue[500]} size={sizes[5]} />
                </HStack>

                )}
            </InputRightElement>
        </InputGroup>
    );
}