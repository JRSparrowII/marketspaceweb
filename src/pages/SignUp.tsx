import {Flex, Button, Stack, Icon, Text, Image, Box, SimpleGrid, VStack, IconButton } from '@chakra-ui/react';
import LogoSvg from '@assets/logo.svg';

import {useState, FormEvent, useContext, useEffect} from 'react'

import Link from 'next/link'
import { Input } from '../components/Input';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import {yupResolver } from "@hookform/resolvers/yup"

type FormDataProps = {
  name: string;
  email: string;
  telefone: string; //DEPOIS TRANSFORMAR PRA NUMERO
  password: string;
  password_confirm: string;
}


export default function SignUp() {

  const [isLoading, setIsLoading] = useState(false);

  function handleUserPhotoSelected(){
    
  }

  async function handleSignUp({name, email, telefone, password }: FormDataProps) {
    try {
      setIsLoading(true)
      
      
      
      toast.success('Seu login foi realizado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    } catch (error) {
      setIsLoading(false);
        
    }        
}  

  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center"  
      justify="center"
      bg="white" 
    >
      <Stack 
        spacing="4" 
        bg="gray.100"
        w="50%" 
        maxWidth={600}
        h="85%"
        borderRadius={8}
      >  
        <Flex flexDir="column" mt={10} justifyContent='center' alignItems='center'>
          {/* <LogoSvg/> */}
          <Text fontSize="20"color="gray.700" fontWeight="bold" textAlign="center">Boas vindas!</Text>
          <Box w='50%' justifyContent='center' alignItems='center'>
            <Text fontSize="12" color="gray.700" textAlign="center">
              Crie sua conta e use o espaço para poder comprar itens variados e vender seus produtos
            </Text>
          </Box>
          
        </Flex>

        <VStack px={20} spacing={3}>

          <Box 
            borderRadius="full" 
            width="100px" 
            height="100px" 
            bg="gray.300" 
            borderColor='blue.500'
            borderWidth={3}
          >

          </Box>

          <Flex
            position="absolute"
            bottom={0}
            right={-20}
            bg="blue.500"
            rounded="full"
            // p={2}
            color="white"
          >
            <IconButton
              // icon={<EditIcon />}
              onClick={handleUserPhotoSelected}
              colorScheme="blue"
              variant="unstyled"
              aria-label="Editar foto do usuário"
            />
          </Flex>

          <Input 
            name='name' 
            placeholder='Nome'
            fontSize="sm"
            type='text' 
          />                   
      
          <Input                
            name='email' 
            placeholder='E-mail'
            fontSize="sm"
            type='email'
          />

          <Input 
            name='phone' 
            placeholder='Telefone'
            fontSize="sm"
            type='number'  
          /> 

          <Input 
            name='password' 
            placeholder='Senha'
            fontSize="sm"
            type='password'
          /> 

          <Input 
            name='password' 
            placeholder='Confirmar senha'
            fontSize="sm"
            type='password'
          />  

          <Button 
            type='submit' 
            // mb={10}
            bg="blue.500"
            fontSize="14"
            color='gray.100'
            _hover={{bg:'blue.700'}}
            w='100%'
            h={12}
            // rightIcon={<Icon as={RiEyeLine} fontSize="35"/>} 
            // isLoading={formState.isSubmitting}
          >
            Criar conta
          </Button> 
        </VStack>   

        <VStack px={20} spacing={3} pt={20}> 
          <Text fontSize="14" color="gray.700" textAlign='center'>Já tem uma conta?</Text>

          {/* <Link href="/lancamentos" passHref> */}
            <Button 
              type='submit' 
              bg="gray.400"
              fontSize="14"
              color='gray.100'
              _hover={{bg:'gray.500'}}
              w='100%'
              // rightIcon={<Icon as={RiEyeLine} fontSize="35"/>} 
              // isLoading={formState.isSubmitting}
            >
              Ir para o login
            </Button>            
          {/* </Link>         */}
        </VStack> 
      </Stack>                    
    </Flex>
  )
}
