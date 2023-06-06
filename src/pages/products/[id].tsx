import React, { useEffect, useState } from "react";

import CarouselSlider from '../../components/CarouselSlider';
import { Header } from "../../components/Header/Index";
import { SideBar } from "../../components/Sidebar";

import { Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text, 
  Button, Avatar} from "@chakra-ui/react"
;

import { RiBarcodeLine, RiQrCodeFill } from 'react-icons/ri';
import { IoMdCash } from "react-icons/io";
import { BsFillCreditCardFill, BsBank } from "react-icons/bs";
import { IconBaseProps } from 'react-icons';

import { AppError } from '../../utils/AppError';
import { api } from '../../services/api';
import { ProductDetailsDTO } from '../../dtos/ProductDetailsDTO';
import { useAuth } from '../../hooks/useAuth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export default function ProductDetails() {

  const [product, setProduct] = useState<ProductDetailsDTO>({} as ProductDetailsDTO);
  const { user } = useAuth();

  const router = useRouter();
  const { id } = router.query;

  const methodIcons: { [key: string]: React.ComponentType<IconBaseProps> } = {
    boleto: RiBarcodeLine,
    pix: RiQrCodeFill,
    cash: IoMdCash,
    card: BsFillCreditCardFill,
    deposit: BsBank
  };

  async function fetchProductDetails() {       
    try {
      const response = await api.get(`/products/${id}`);
      // const response = await api.get('/products/7f24effe-e0fb-4e4f-b9d3-4d87bea80583');
      setProduct(response.data);
      // console.log('aqui as 11:36 =>', response.data);
      // setLoading(false); 

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os produtos';
  
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
    }
  }   

  useEffect(() => {
    fetchProductDetails()
  },[product.id])

  return (
    <Flex direction="column" height="100vh"> 
        <Header/>   
        
        <Flex width="100%" my="6" maxWidth={1250} mx="auto" px="6">
          <SideBar /> 
          <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" bg='gray.100'> 
            <Flex direction="column" mb={20}>
              <Heading size="lg" fontWeight="normal" color="blue.500" >Anúncios</Heading>
              <Divider my="2" mb={5} borderColor="blue.500" ></Divider>

              <CarouselSlider
                images={[
                  'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
                  'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
                  'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                ]}
              />

              <HStack 
                justifyContent="flex-start" 
                alignItems="center"   
                spacing={2}                                  
              >
                <Avatar
                  size="sm" 
                  name={user.name}
                  bg="blue.500" 
                  src={"https://github.com/carloshenriquefarias.png"}>
                </Avatar>
                <Text color="gray.600" fontWeight="bold">{user.name}</Text>
              </HStack>

              <Button
                bg="gray.200" 
                color={'gray.500'}
                _hover={{ backgroundColor: "gray.200" }}                                              
                fontSize="sm" 
                justifyContent="center"
                alignItems="center"
                borderRadius={30}
                w="15%"
                mt={5}
                cursor="default"
              >
                {product.is_new ? 'Novo' : 'Usado'}
              </Button> 

              <HStack 
                justifyContent="space-between" 
                alignItems="center"   
                spacing={2}   
                mt={5}                                
              >
                <Text color="gray.600" fontWeight="bold">{product.name}</Text>
                <Text color="gray.600" fontWeight="bold">R$ {product.price}</Text>
              </HStack>

              <Text color="gray.600" mt={5}>{product.description}</Text>

              <HStack 
                justifyContent="flex-start" 
                alignItems="center"   
                spacing={2}   
                mt={5}                                
              >
                <Text color="gray.600" fontWeight="bold">Aceita troca?</Text>
                <Text color="gray.600">{product.accept_trade ? 'Sim' : 'Não'}</Text>
              </HStack>

              <Text color="gray.600" fontWeight="bold" mt={5}>Meios de pagamento</Text>

              <VStack 
                alignItems="left"
                justify="flex-start"
                mt={2}
                fontSize="sm"
              >
                {product.payment_methods && (
                  product.payment_methods.map(method => {
                    const IconComponent = methodIcons[method.key]; // Seleciona o ícone correspondente ao método de pagamento atual
                    return (
                      <HStack alignItems='center' key={method.key}>
                        {IconComponent && (
                          <Icon as={IconComponent} name='cash-multiple' size={4} color='gray.2' mr={2} />
                        )}
                        <Text fontFamily='body' textTransform='capitalize' fontSize='sm' color='gray.2'>
                          {method.name}
                        </Text>
                      </HStack>
                    );
                  })
                )}
              </VStack>

              <HStack 
                justifyContent="space-between" 
                alignItems="center"   
                spacing={2}   
                mt={5}                                
              > 
                <Text color="blue.700" fontWeight="bold" fontSize='30px'>R$ {product.price}</Text>
                <Button bg='blue.500' color="blue.100">Entrar em contato</Button>
              </HStack>
            </Flex>
          </SimpleGrid>
        </Flex>
        <ToastContainer/>
    </Flex>
  )
}
