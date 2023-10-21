import { Button, Flex, HStack, Text, VStack, Divider, SimpleGrid } from '@chakra-ui/react'
import Menu from '../Menu'
import AllRights from '../AllRights'
import RegisterEmail from '../RegisterEmail'
import SocialMidia from '../SocialMidia'

export default function Footer() {
    return (
        <>
            <SimpleGrid
                minChildWidth="380px"
                // maxWidth={1480}
                width="100%"
                bg="blue.100"
                h={'auto'}
                justifyContent="center" // Centraliza horizontalmente
                alignItems="center" // Centraliza verticalmente
                mt={5}
                mx={'auto'}
            >
                <VStack
                    w="100%"
                    alignItems="center"
                    justifyContent="center"
                    marginX="auto"
                    maxWidth={1480}
                >
                    <SimpleGrid
                        columns={{ sm: 2, md: 2 }}
                        minChildWidth="380px"
                        maxWidth={1480}
                        width="100%"
                        h='auto'
                        mt={3}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        mb={8}
                    >
                        <VStack>
                            <Text fontSize='2xl' fontWeight='bold' color={'blue.500'}>Thank you for your suport!</Text>
                            <Text fontSize='lg' color={'blue.500'}>We delivere the best produts on the web!</Text>
                        </VStack>

                        <VStack>
                            <Text fontSize='sm' fontWeight='thin' color={'blue.500'}>Follow us on our social media</Text>
                            <SocialMidia />
                        </VStack>
                    </SimpleGrid>

                    <Divider borderColor="gray.400" mb={5}></Divider>

                    <HStack>
                        <Menu color='blue.400' />
                    </HStack>

                    <AllRights />
                </VStack>
            </SimpleGrid>
        </>
    )
}