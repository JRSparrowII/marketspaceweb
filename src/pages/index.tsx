import {Flex, Stack, Icon, Text, Image, Box, SimpleGrid, VStack, FormControl, InputGroup } from '@chakra-ui/react';
import {useState, FormEvent, useContext, useEffect} from 'react';

import { Input } from '../components/Input';
import { Logo } from '../components/Logo';
import { ButtonDefault } from '../components/Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.svg';

import Link from 'next/link';

import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import {yupResolver } from "@hookform/resolvers/yup"

import { RiKeyboardBoxFill } from 'react-icons/ri';
import { AppError } from '../utils/AppError';

import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router';

type FormDataProps = {
  email: string;
  password: string;
}

export default function SignIn() {

  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const signInFormSchema = yup.object().shape({   
    email: yup.string().required('E-mail obrigatório').email('E-mail Inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),    
  });  

  const {register, handleSubmit, formState} = useForm<FormDataProps>({
    resolver: yupResolver(signInFormSchema)
  });

  const {errors} = formState

  function goSignUp() {
    
  }

  function handleGoHome(){
    router.push(`/home`);
  };

  async function handleSignIn({email, password }: FormDataProps) {
    try {

      setIsLoading(true)
      await signIn(email, password);

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

      setIsLoading(false);

      handleGoHome()

    } catch (error) {

      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível entrar agora! Tente mais tarde!'

      toast.error( title, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
        
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
        <Flex flexDir="column" mb={10} mt={10} justify="center" align="center">
          <Box w="50px" h="50px" bg="gray.300">
            {/* <logoImg/> */}
          </Box>
          <Text fontSize="35"color="gray.700" fontWeight="bold" textAlign="center"> marketspace</Text>
          <Text fontSize="14" color="gray.700" textAlign="center"> Seu espaço de compra e venda</Text>
        </Flex>

        <Text fontSize="14" color="gray.700" textAlign='center'>Acesse sua conta</Text>

        <VStack px={20} spacing={3} mb={20}>
          <Stack w={'100%'}>
            <FormControl>
              <Input
                placeholder='Email'
                name='email'
                type={'email'}
                error={errors.email}
                register={register}
                options={{
                  required: 'É necessário informar um email.',
                }}
              />
            </FormControl>
          </Stack>

          <Stack w={'100%'}>
            <InputGroup size={['md']}>
              <Input
                placeholder='Senha'
                name='password'
                error={errors?.password}
                register={register}
                isPassword
                options={{
                  required: 'É necessário informar uma senha.'
                }}
              />
            </InputGroup>
          </Stack>

          <ButtonDefault
            title="Entrar" 
            size="total"   
            variant="base1"  
            onClick={handleSubmit(handleSignIn)}  
            // isLoading={isLoading}
          />
   
        </VStack>   

        <VStack p={20} spacing={3}> 
          <Text fontSize="14" color="gray.700" textAlign='center'>Ainda não tem acesso?</Text>

          {/* <Link href="/lancamentos" passHref> */}
            <ButtonDefault 
              title="Criar uma conta" 
              size="total"   
              variant="default"  
              onClick={goSignUp}
              // isLoading={isLoading}
            />           
          {/* </Link>         */}
        </VStack> 
      </Stack>
      <ToastContainer/>                    
    </Flex>
  )
}
