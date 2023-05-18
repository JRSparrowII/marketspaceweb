import {Flex, Button, Stack, Icon, Text, Image, Box, SimpleGrid, VStack, 
  IconButton, FormControl, InputGroup } from '@chakra-ui/react'
;
import {useState, FormEvent, useContext, useEffect} from 'react';
import { Input } from '../components/Input';
import { ButtonDefault } from '../components/Button';

import LogoSvg from '@assets/logo.svg';
import Link from 'next/link';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import {yupResolver } from "@hookform/resolvers/yup";


type FormDataProps = {
  name: string;
  email: string;
  telefone: string;
  password: string;
  password_confirm: string;
}

export default function SignUp() {

  const [isLoading, setIsLoading] = useState(false);

  const signInFormSchema = yup.object().shape({   
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail Inválido'),
    telefone: yup.string().required('Digite seu telefone'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),   
    password_confirm: yup.string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere')
  });  

  const {register, handleSubmit, formState} = useForm<FormDataProps>({
    resolver: yupResolver(signInFormSchema)
  });

  const {errors} = formState

  function handleUserPhotoSelected(){
    
  }

  async function handleSignUp({ name, email, telefone, password, password_confirm}: FormDataProps) {
    try {
      setIsLoading(true)

      const dataSignUp = {
        name: name,
        email: email,
        telefone: telefone,
        password: password,
        password_confirm: password_confirm,
      }

      console.log(dataSignUp)
      
      toast.success('Sua conta foi criada com sucesso! Volte para a tela de login e aproveite!', {
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
          <Box w="50px" h="50px" bg="gray.300" mb={3}>
            {/* <Logo/> */}
          </Box>
          <Text fontSize="20"color="gray.700" fontWeight="bold" textAlign="center">Boas vindas!</Text>
          <Box w='50%' justifyContent='center' alignItems='center'>
            <Text fontSize="12" color="gray.700" textAlign="center">
              Crie sua conta e use o espaço para poder comprar itens variados e vender seus produtos
            </Text>
          </Box>          
        </Flex>

        <VStack px={20} spacing={3} mb={20}>
          <Stack w={'100%'}>
            <FormControl>
              <Input
                placeholder='Nome'
                name='name'
                type={'text'}
                error={errors.name}
                register={register}
                options={{
                  required: 'É necessário informar um nome.',
                }}
              />
            </FormControl>
          </Stack>

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
            <FormControl>
              <Input
                placeholder='Telefone'
                name='telefone'
                type={'text'}
                error={errors.telefone}
                register={register}
                options={{
                  required: 'É necessário informar um número de telefone.',
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

          <Stack w={'100%'}>
            <InputGroup size={['md']}>
              <Input
                placeholder='Confirme a senha'
                name='password_confirm'
                error={errors?.password_confirm}
                register={register}
                isPassword
                options={{
                  required: 'É necessário confirmar a senha.'
                }}
              />
            </InputGroup>
          </Stack>

          <ButtonDefault
            title="Criar conta" 
            size="total"   
            variant="base1"  
            onClick={handleSubmit(handleSignUp)}  
            // isLoading={isLoading}
          />
   
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
        <ToastContainer/>  
      </Stack>                    
    </Flex>
  )
}
