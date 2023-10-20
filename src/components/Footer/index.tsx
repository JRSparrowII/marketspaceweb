import { Button, Flex, HStack, Text, VStack, Divider} from '@chakra-ui/react'
import Menu from '../Menu'
import AllRights from '../AllRights'
import RegisterEmail from '../RegisterEmail'

export default function Footer(){
    return(
        <>
            {/* <RegisterEmail/> */}
            <Flex
                bg="white"
                w="100%" 
                h="300px" 
                align="center"
                marginX="auto"
                mt="4"
            >
                <VStack 
                    w="55%" 
                    alignItems="center" 
                    justifyContent="center"
                    marginX="auto"
                    maxWidth={1480} 
                >            
                    <HStack bg="white" alignItems="center" justifyContent="space-between" w="100%" h="60px" mb={10}>
                        <VStack>
                            <Text fontSize='24px' fontWeight='bold'>Thank you for your suport!</Text>
                            <Text fontSize='14px'>We delivere the best produts on the web!</Text>
                        </VStack>
                        
                        <HStack spacing={5}>
                            <Button colorScheme='twitter'>twitter</Button>
                            <Button colorScheme='facebook'>Facebook</Button>
                            <Button colorScheme='pink'>instagram</Button>
                        </HStack>
                    </HStack>

                    <Divider borderColor="gray.200" mb={5}></Divider>

                    <HStack>
                        <Menu color='blue.400'/>  
                    </HStack>                                 
                </VStack>
            </Flex>

            <AllRights/>
        </>    
    )
}