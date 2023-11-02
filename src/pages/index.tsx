import { Flex, Stack, Text, Image, VStack, FormControl, InputGroup, HStack, Checkbox, useTheme } from '@chakra-ui/react';
import { useState, FormEvent, useContext, useEffect } from 'react';

import { Input } from '../components/Input';
import { ButtonDefault } from '../components/Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"

import { RiKeyboardBoxFill } from 'react-icons/ri';
import { AppError } from '../utils/AppError';

import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router';
import ForgotPassword from '../components/ForgotPassword';
import NewAccount from '../components/NewAccount';

type FormDataProps = {
  email: string;
  password: string;
}

export default function SignIn() {

  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  const { sizes } = useTheme();

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleHidePassword = () => {
    setShowForgotPassword(false);
  };

  const OriginalState = () => {
    setShowRegisterForm(!showRegisterForm)
    setShowForgotPassword(false);
  };

  const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail Inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  });
  const { register, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(signInFormSchema)
  });
  const { errors } = formState

  function goSignUp() {
    router.push(`/signup`);
  }

  function handleGoHome() {
    router.push(`/home`);
  };

  async function handleSignIn({ email, password }: FormDataProps) {
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

      toast.error(title, {
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
    setTimeout(() => { }, 3000)
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
          h="90%"
          // mb={50}
          borderRadius={8}
        >
          <Flex flexDir="column" mb={2} mt={5} justify="center" align="center">
            <Image
              src="images/logo.svg"
              width={20}
              height={20}
              alt=""
            />
            <Text fontSize="35" color="gray.700" fontWeight="bold" textAlign="center"> Marketspace</Text>
            <Text fontSize="14" color="gray.700" textAlign="center"> Seu espaço de compra e venda</Text>
            {/* <Text fontSize="14" color="gray.700" textAlign="center"> Um universos de possibilidades em negócios ideais para você e sua família! Confira!</Text> */}
          </Flex>

          {!showRegisterForm ? (
            <Text fontSize="14" color="gray.700" textAlign='center'>
              {!showForgotPassword ? 'Insira suas credenciais para acessar sua conta' : 'Insira seu email aqui para resetar a sua senha'}
            </Text>
          ) : null}

          {!showRegisterForm ? (
            <>
              {!showForgotPassword && (
                <VStack px={20} spacing={3} mb={10}>
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
                    isLoading={isLoading}
                  />

                </VStack>
              )}

              {!showForgotPassword ? (
                <>
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
                      icon={<FcGoogle size={sizes[6]} />}
                    // icon={FcGoogle} 
                    // isLoading={isLoading}
                    />

                  <HStack alignItems="center" justifyContent="space-between" pt="0.5rem">
                    <Checkbox pr={10} value='password' color="gray.500" size='sm'>Lembrar minha senha</Checkbox>
                    <Link
                      href="#"
                      onClick={handleForgotPassword}
                    >
                      <Text color="blue.500" fontSize="sm" mb={3} fontFamily="body" mt={3}>
                        Esqueceu a senha
                      </Text>
                    </Link>
                  </HStack>

                  </VStack>

                 
                  <VStack p={20} spacing={3}>
                    <Text fontSize="14" color="gray.700" textAlign='center'>Ainda não tem acesso?</Text>
                    <ButtonDefault
                      title="Criar uma conta"
                      size="total"
                      variant="default"
                      onClick={() => setShowRegisterForm(!showRegisterForm)}
                    // isLoading={isLoading}
                    />
                  </VStack>
                </>

              ) : (
                <ForgotPassword onClick={() => setShowRegisterForm(!showRegisterForm)} />
              )}
            </>

          ) : (
            <NewAccount onClick={OriginalState} />
          )
          }
        </Stack>
      </Flex>
      <ToastContainer />
    </Flex>
  )
}




