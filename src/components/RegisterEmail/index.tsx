import { Box, FormControl, Input, InputGroup, SimpleGrid, Text } from "@chakra-ui/react";
import { ButtonDefault } from "../Button";

export default function RegisterEmail() {

  function handleSignIn() {

  }
  return (
    // <Box bg={'blue'} w={'full'} justifyContent={'center'} alignItems={'center'}>

    <SimpleGrid
      columns={{ sm: 2, md: 4 }}
      spacing="4"
      minChildWidth="380px"
      // maxWidth={1480}
      width="100%"
      h='auto'
      gap={5}
      px={'10'}
      spacingX={5}
      bg={'blue.500'}
      justifyContent='center' // Centraliza horizontalmente
      alignItems='center' // Centraliza verticalmente
      flexDirection='row' // Define a direção como horizontal (row)
    >
      <Box pt={2}>
        <Text color="gray.100" fontSize="md" mb={3} fontFamily="body" mt={1}>
          Marketspace news
        </Text>
        <Text color="gray.100" fontSize="md" mb={3} fontFamily="body" mt={1}>
          Receba nossas ofertas no email
        </Text>
      </Box>

      <FormControl>
        <Input
          placeholder='Email'
          name='email'
          type={'email'}
        />
      </FormControl>

      <InputGroup size={['md']}>
        <Input
          placeholder='Senha'
          name='password'
        />
      </InputGroup>

      <ButtonDefault
        title="Entrar"
        size="total"
        variant="default"
        onClick={(handleSignIn)}
      />
    </SimpleGrid>
    // </Box>
  )
}
