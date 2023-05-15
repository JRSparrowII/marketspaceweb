import {Flex, Button, Stack, Icon, Text, Image, Box, Checkbox, 
  CheckboxGroup, SimpleGrid, VStack } from '@chakra-ui/react'
;
import LogoSvg from '@assets/logo.svg';

import {useState, FormEvent, useContext, useEffect} from 'react'

import Link from 'next/link'
import { Input } from '../components/Input';


export default function SignIn() {

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
        // bg="gray.100"          
        // p="8"
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
            name='email' 
            placeholder='E-mail'
            fontSize="sm"
            type='email' 

            // bg="white"
            // variant="filled"
            
            // label='E-mail'  

            // value={email}              
            // onChange={e => setEmail(e.target.value)}
            // onChange={e => setListUsers(e.target.value)}
            // {...register("email")}
            // error={errors.email}
          />                   
      
          <Input      
            // label="Senha"            
            name='password' 
            placeholder='Senha'
            fontSize="sm"
            type='password' 
            
            // bg="white"
            // variant="filled"

            // label='Senha' 
            // value={password}             
            // onChange={e => setPassword(e.target.value)}
            // onChange={e => setPasswordUsers(e.target.value)}
            // {...register("password")}
            // error={errors.password}
            // rightIcon={<Icon as={RiEyeLine} fontSize="35"/>}
          /> 

          <Button 
            type='submit' 
            mt="10" 
            bg="blue.500"
            fontSize="14"
            color='gray.100'
            _hover={{bg:'blue.700'}}
            w='100%'
            // rightIcon={<Icon as={RiEyeLine} fontSize="35"/>} 
            // isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>   
        </VStack>   

        <VStack p={20} spacing={5}> 
          <Text fontSize="14" color="gray.700" textAlign='center'>Ainda não tem acesso?</Text>

          <Link href="/lancamentos" passHref>
            <Button 
              type='submit' 
              mt="10" 
              bg="gray.400"
              fontSize="14"
              color='gray.100'
              _hover={{bg:'gray.500'}}
              w='100%'
              // rightIcon={<Icon as={RiEyeLine} fontSize="35"/>} 
              // isLoading={formState.isSubmitting}
            >
              Criar uma conta
            </Button>            
          </Link>        
        </VStack> 
      </Stack>                    
    </Flex>
  )
}

{/* <VStack backgroundColor="gray.100" flex={1} >

<VStack                     
    px={10}                       
    rounded={50}
    mt={60}
>                  
    <Center mb={5}>
        <LogoSvg />

        <Text color="gray.700" fontSize="35px" fontFamily="heading">
            marketspace
        </Text>

        <Text color="gray.400" fontSize="sm">
            Seu espaço de compra e venda
        </Text>
    </Center>

    <Center >
        <Heading color="gray.400" fontSize="md" mb={6}>
            Acesse sua conta
        </Heading>

        
    
        
        
        <Button
            title="Entrar" 
            size="total"  
            variant="base1" 
            // onPress={handleSubmit(handleSignIn)} 
            // isLoading={isLoading}                     
        />                        
    </Center>                
</VStack>



<VStack 
    flex={1} 
    px={10}  
    backgroundColor="white"
    mt={60}
>
    <Center mb={10}>
        <Text color="gray.700" fontSize="sm" mb={3} fontFamily="body" mt={5}>
            Ainda não tem acesso?
        </Text>

        <ButtonDefault 
            title="Criar uma conta" 
            size="total"   
            variant="default"  
            onPress={handleNewAccount}                
        />                        
    </Center>
</VStack>  
</VStack>  */}
