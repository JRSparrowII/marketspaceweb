import {Flex, Text, Box, Avatar, Button, useDisclosure,
    AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, 
    AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, HStack,} from '@chakra-ui/react'
import React from "react";
import Link from 'next/link'

interface ProfileProps{
    showProfileData?: boolean;
}

import {useAuth} from '../../hooks/useAuth'

export function Profile({showProfileData = true}:ProfileProps){  
    
    //Modal do botão Excluir na tabela
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const { signOut, user} = useAuth();

    return (
        <Flex align="center"> 
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <HStack>
                    <Text color="blue.100" fontWeight="bold">Welcome</Text>
                    <Text color="blue.100" fontWeight="bold">{user.name}</Text>
                    </HStack>
                    
                    <Text color="blue.100" fontSize="small">
                        {user.email}
                    </Text>
                </Box>                
            )}
            
            <Avatar     //IMAGEM DO USUARIO
                size="md" 
                name={user.name}
                bg="blue.100" 
                src="https://github.com/carloshenriquepvh@hotmail.com.png">
            </Avatar>

            <Button bg="transparent" color="blue.100" onClick={onOpen} _hover={{color: 'yellow'}}>
                Sair
            </Button>

            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered                
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                <AlertDialogHeader color="gray.500">ATENÇÃO!!!</AlertDialogHeader>
                <AlertDialogCloseButton color="gray.700"/>
                <AlertDialogBody color="gray.500" fontWeight="bold">
                    Você tem certeza que deseja REALMENTE SAIR do Marketspace?
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button colorScheme='red' ref={cancelRef} onClick={onClose}>
                        Não, Volte!
                    </Button>
                    <Link href="/" passHref>
                        <Button colorScheme='whatsapp' ml={3} onClick={signOut}>
                            Sim, Tenho certeza!
                        </Button>
                    </Link>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>                
        </Flex>        
    );
}