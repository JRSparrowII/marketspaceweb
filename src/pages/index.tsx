import {Flex, Stack, Icon, Text, Image, Box, SimpleGrid, VStack } from '@chakra-ui/react';
import {useState, FormEvent, useContext, useEffect} from 'react';

import { Input } from '../components/Input';
import { ButtonDefault } from '../components/Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LogoSvg from '@assets/logo.svg';
import Link from 'next/link';

import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import {yupResolver } from "@hookform/resolvers/yup"

type FormDataProps = {
  email: string;
  password: string;
}

export default function SignIn() {

  const [isLoading, setIsLoading] = useState(false);

  const signInFormSchema = yup.object().shape({   
    email: yup.string().required('E-mail obrigatório').email('E-mail Inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),    
  })  

  const {register, handleSubmit, formState} = useForm<FormDataProps>({
    resolver: yupResolver(signInFormSchema)
  });

  const {errors} = formState

  function showSuccessToast() {
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
  }

  async function handleSignIn({email, password }: FormDataProps) {
    try {
      setIsLoading(true)
      
      const data = {
        email: email,
        password: password
      }

      console.log(data)
      
      showSuccessToast()

    } catch (error) {
      
        
    } finally {
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
        h="70%"
        mb={50}
        borderRadius={8}
      >  
        <Flex flexDir="column" mb={10} mt={10}>
          {/* <LogoSvg/> */}
          <Text fontSize="35"color="gray.700" fontWeight="bold" textAlign="center"> marketspace</Text>
          <Text fontSize="14" color="gray.700" textAlign="center"> Seu espaço de compra e venda</Text>
        </Flex>

        <Text fontSize="14" color="gray.700" textAlign='center'>Acesse sua conta</Text>

        <VStack px={20} spacing={5} mb={30}>
          <Input 
            placeholder='E-mail'
            fontSize="sm"
            type='email' 
            {...register("email")}
            error={errors.email}
          />                   
      
          <Input              
            placeholder='Senha'
            fontSize="sm"
            type='password'
            {...register("password")}
            error={errors.password}
            // rightIcon={<Icon as={RiEyeLine} fontSize="35"/>}
          /> 

          <ButtonDefault
            title="Entrar" 
            size="total"   
            variant="base1"  
            onClick={handleSubmit(handleSignIn)}  
            // isLoading={isLoading}
          />
   
        </VStack>   

        <VStack p={20} spacing={5}> 
          <Text fontSize="14" color="gray.700" textAlign='center'>Ainda não tem acesso?</Text>

          {/* <Link href="/lancamentos" passHref> */}
            {/* <ButtonDefault 
              title="Criar uma conta" 
              size="total"   
              variant="default"  
              onClick={handleSignIn}
              isLoading={isLoading}
            /> */}
            
          {/* </Link>         */}
        </VStack> 
      </Stack>                    
    </Flex>
  )
}
