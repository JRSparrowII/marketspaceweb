import {Flex, Text, Input, Icon, HStack, Box, Avatar, InputRightElement, InputGroup} from '@chakra-ui/react'
import {RiSearchLine, RiNotificationLine, RiUserAddLine } from 'react-icons/ri'

export function SearchBox(){
    return (
        // <Flex
        //     as="label"
        //     flex="1"
        //     py="4" //pading Horizontal
        //     px="8" //pading Vertical
        //     ml="6"
        //     maxWidth={400}
        //     alignSelf="center"
        //     color="gray.200"
        //     position="relative"
        //     bg="gray.800"
        //     borderRadius="full"
        // >
        //     <Input //BARRA DE PESQUISA
        //         color="gray.50"
        //         variant="unstyled" //sem bordas
        //         placeholder='Digite o que procura'
        //         _placeholder={{color: 'gray.400'}}
        //         px="4" //pading Horizontal
        //         mr="4"
        //     />
        //     <Icon as={RiSearchLine} fontSize={20}/>
        // </Flex>

        <InputGroup>
            <Input 
                color="gray.700"
                variant="filled" 
                borderColor="blue.100"
                placeholder='Digite sua pesquisa'
                _placeholder={{color: 'gray.400'}}
                fontSize="sm"                                                    
                type="text" 
                w="80%"
                // value={filterNameInput} 
                // onChange={handleSearchByNameProduct}
            />       

            <InputRightElement 
                // onClick={handleSearch}
                cursor="pointer"
            >
                {/* {isLoading ? (
                    <Spinner size="sm" />
                ) : ( */}
                    {/* <HStack spacing={2} pr={5} mr={6}>
                        <RiSearchLine color={colors.blue[500]} size={sizes[5]} onClick={handleFilterByName}/>
                        <Text>|</Text>
                        <RiSoundModuleFill color={colors.blue[500]} size={sizes[5]} onClick={onOpen}/>
                    </HStack> */}
                    
                {/* )} */}
            </InputRightElement>
        </InputGroup>
    );
}