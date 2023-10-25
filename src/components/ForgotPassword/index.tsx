import { FormControl, HStack, Link, VStack, Text, Box, SimpleGrid } from "@chakra-ui/react";
import { ButtonDefault } from "../Button";
import { Input } from '../Input';
import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  onClick: () => void;
}

type FormDataProps = {
  email: string;
}

export default function ForgotPassword({ onClick }: Props) {

  const [isLoadingResetPassword, setIsLoadingResetPassword] = useState(false);

  const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail Inválido'),
  });

  const { register, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState

  async function handleResetPassword({ email }: FormDataProps) {
    try {
      setIsLoadingResetPassword(true)

      const dataSignUp = {
        email: email,
      }

      toast.warning('Este procedimento ainda não está em execução, mas em breve estará disponivel! Aguarde...', {
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
      setIsLoadingResetPassword(false);

    }
  }

  return (
    <SimpleGrid>
      <VStack px={20} spacing={3} mt={10} mb={10}>
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

        <ButtonDefault
          title="Resetar senha"
          size="total"
          variant="base1"
          onClick={handleSubmit(handleResetPassword)}
          isLoading={isLoadingResetPassword}
        />
      </VStack>

      <VStack spacing={3} w={'100%'} mt={10} px={20}>
        <Text fontSize="14" color="gray.700" textAlign='center'>Ainda não tem acesso?</Text>
        <ButtonDefault
          title="Criar uma conta"
          size="total"
          variant="default"
          onClick={onClick}
        />
      </VStack>
    </SimpleGrid>
  )
}