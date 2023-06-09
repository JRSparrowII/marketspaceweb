import {Flex, Stack, Text, Image, VStack, FormControl, InputGroup, HStack, Checkbox, useTheme } from '@chakra-ui/react';
import {useState, FormEvent, useContext, useEffect} from 'react';

import { Input } from '../components/Input';
import { ButtonDefault } from '../components/Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FcGoogle } from "react-icons/fc";
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
  const { sizes } = useTheme();

  const signInFormSchema = yup.object().shape({   
    email: yup.string().required('E-mail obrigatório').email('E-mail Inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),    
  });  
  const {register, handleSubmit, formState} = useForm<FormDataProps>({
    resolver: yupResolver(signInFormSchema)
  });
  const {errors} = formState

  function goSignUp() {
    router.push(`/signup`);
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

  useEffect(() => {
    setTimeout(() => {}, 3000)
  }, [])

  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center"  
      justify="center"
      bg="gray.900" 
      // bgImage="images/empress.jpg"
      // bgSize="cover"
      // bgPosition="center"
    >
      <Flex 
        w="98vw" 
        h="98vh" 
        align="center"  
        justify="space-between"
        // bg="gray.300" 
        px={40}
        borderRadius={10}
        bgImage="images/empress.jpg"
        bgSize="cover"
        bgPosition="center"
      >
        <Stack 
          spacing="4" 
          bg="gray.100"
          w="50%" 
          maxWidth={600}
          h="85%"
          // mb={50}
          borderRadius={8}
        >  
          <Flex flexDir="column" mb={5} mt={10} justify="center" align="center">
            <Image
              src="images/logo.svg"
              width={20}
              height={20}
              alt=""
            />
            <Text fontSize="35"color="gray.700" fontWeight="bold" textAlign="center"> Marketspace</Text>
            <Text fontSize="14" color="gray.700" textAlign="center"> Seu espaço de compra e venda</Text>
            {/* <Text fontSize="14" color="gray.700" textAlign="center"> Um universos de possibilidades em negócios ideais para você e sua família! Confira!</Text> */}
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

            <Stack w={'100%'} mb={10}>
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

          <VStack 
            flex={1} 
            px={20}  
            backgroundColor="gray.100"
            mt={5}
          >
            <Text color="gray.700" fontSize="md" mb={3} fontFamily="body" mt={3}>
              Ou entrar com
            </Text>

            <ButtonDefault
              title="Minha conta Google" 
              size="total"   
              variant="default"  
              onClick={handleSubmit(handleSignIn)} 
              icon={<FcGoogle size={sizes[6]}/>}
              // icon={FcGoogle} 
              // isLoading={isLoading}
            />                        
          </VStack>   

          <HStack alignItems="center" justifyContent="space-between" px="20">
            <Checkbox value='password' color="gray.500" size='sm'>Lembrar minha senha</Checkbox>
            <Text fontSize="14" color="blue.700" textAlign='center'>Esqueceu a senha</Text>
          </HStack>

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

        {/* <Stack 
          spacing="1"
          // bg="gray"
          w="40%" 
          h="45%"
          // bgImage="images/background.jpg"
          // bgSize="cover"
          // bgPosition="center"
        >  
          <Text fontSize="35"color="orange.400" fontWeight="bold" textAlign="left">
            Conectando você a um universo de negócios e possibilidades!
          </Text>
          <Box>
            <Image src="images/avatar.svg" alt="Girl Coding" boxSize='400px'alignItems="center"/>
          </Box>     
        </Stack>  */}

      </Flex>
      <ToastContainer/>                    
    </Flex>
  )
}




