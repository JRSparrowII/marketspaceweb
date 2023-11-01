import { Box, Button, Flex, FormControl, InputGroup, Stack, VStack, Text, Icon } from "@chakra-ui/react";
import { ButtonDefault } from "../Button";
import { Input } from '../Input';
import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Center, UnorderedList, ListItem, IconButton } from "@chakra-ui/react";
// import { FaTrashCan } from "react-icons/fa6";

import { useDropzone } from "react-dropzone";

interface CustomFile extends File {
  preview: string;
}

type FormDataProps = {
  name: string;
  email: string;
  telefone: string;
  password: string;
  password_confirm: string;
}

interface FormRegisterProps {
  onClick: () => void;
}

export default function NewAccount({ onClick }: FormRegisterProps) {

  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState<CustomFile[]>([]);
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    maxFiles: 1,
    // implementando tipo de arquivos aceitos
    accept: {
      "image/png": [".png", ".jpg"],
      "text/html": [".html", ".htm"],
    },
    onDrop: (acceptedFiles) => {
      const updatedFiles: CustomFile[] = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(updatedFiles);
    },
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <ListItem key={file.name}>{file.name}</ListItem>
  ));

  const fileRejectionItems = fileRejections.map(({ file }) => {
    return <ListItem key={file.name}>{file.name}</ListItem>;
  });

  const removeFile = (fileToRemove: CustomFile) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
  };

  const Preview = files.map((file) => (
    <Box key={file.name} borderWidth="1px" borderRadius="lg" p={1} m={2} position="relative">
      <IconButton
        aria-label="Excluir"
        bg="red"
        size="sm"
        onClick={() => removeFile(file)}
        position="absolute"
        top={2}
        right={2}
        zIndex={1}
      >
        <Box color="white">
          {/* <FaTrashCan /> */}
        </Box>
      </IconButton>


      <Box position="relative">
        {file.type.startsWith("image/") ? (
          <img src={file.preview} alt={file.name} width="30%" height="50%" />
        ) : (
          <iframe src={file.preview} title={file.name} width="30%" height="100px" />
        )}
      </Box>
    </Box>
  )); 

  const signInFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail Inválido'),
    telefone: yup.string().required('Digite seu telefone'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirm: yup.string()
      .required('Confirme a senha.')
      .oneOf([yup.ref('password')], 'A confirmação da senha não confere')
  });

  const { register, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState

  async function handleSignUp({ name, email, telefone, password, password_confirm }: FormDataProps) {
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
    <Stack
      spacing="4"
      bg="gray.100"
      w="100%"
      h="90%"
      borderRadius={8}
    >
      {/* <Flex flexDir="column" justifyContent='center' alignItems='center'>
        <Text fontSize="20" color="gray.700" fontWeight="bold" textAlign="center">Boas vindas!</Text>
        <Box w='50%' justifyContent='center' alignItems='center'>
          <Text fontSize="12" color="gray.700" textAlign="center">
            Crie sua conta e use o espaço para poder comprar itens variados e vender seus produtos
          </Text>
        </Box>
      </Flex> */}

      <VStack spacing={4}>
      <Center w='100%'>
        <Box
          {...getRootProps({ className: "dropzone" })}
          p={4}
          borderWidth={2}
          borderColor="blue.300"
          borderStyle="dashed"
          borderRadius="full"
          textAlign="center"
          w='28%'
          cursor={'pointer'}
          // height="200px"
          // bg='red'
        >
          <input {...getInputProps()} />
          <Text> Select your photo...</Text>
        </Box>
      </Center>

      {/* <Box display="flex" justifyContent="center" alignItems="center" w='100%'>
        <Box w="50%" px={2} borderRightWidth={1} borderColor="gray.300">
          <Text fontSize="lg" fontWeight="bold" textAlign={'center'}>Accepted Files</Text>
          <UnorderedList color={'blue.300'} mt={1}>{acceptedFileItems}</UnorderedList>
        </Box>
        <Box w="50%" px={2}>
          <Text fontSize="lg" fontWeight="bold" textAlign={'center'}>Rejected Files</Text>
          <UnorderedList color={'red.300'} pl={2} mt={1}>{fileRejectionItems}</UnorderedList>
        </Box>
      </Box> */}

      <Box w="30%">
        {/* <Text fontSize="lg" fontWeight="bold">Files Preview</Text> */}
        <Box display="flex" flexWrap="wrap">
          {Preview}
        </Box>
      </Box>
    </VStack>

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
          isLoading={isLoading}
        />
      </VStack>

      <VStack px={20} spacing={3} pt={10}>
        <Text fontSize="14" color="gray.700" textAlign='center'>Já tem uma conta?</Text>
        <Button
          type='submit'
          bg="gray.400"
          fontSize="14"
          color='gray.100'
          _hover={{ bg: 'gray.500' }}
          w='100%'
          onClick={onClick}
        // rightIcon={<Icon as={RiEyeLine} fontSize="35"/>} 
        >
          Ir para o login
        </Button>
      </VStack>
    </Stack>
  )
}