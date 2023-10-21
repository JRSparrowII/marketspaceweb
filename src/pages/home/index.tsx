import {
  Box, Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text, Button,
  InputGroup, InputRightElement, Input, useDisclosure, Switch, Image,
  AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, useTheme,
  AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Checkbox, CheckboxGroup, Spacer, Stack, Center
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

import Link from 'next/link'
import { useRouter } from 'next/router';

import { MotionFlex, animationFlex, itemAnimation } from '../../styles/animation';

import { api } from "../../services/api";
import { ProductDTO } from "../../dtos/ProductDTO";
import { AppError } from "../../utils/AppError";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NewHeader from "../../components/NewHeader";
import { Product } from "../../components/Product";
import CarouselSlider from "../../components/CarouselSlider";
import Footer from "../../components/Footer";
import RegisterEmail from "../../components/RegisterEmail";
import InfoCard from "../../components/InfoCard";
import { MdDoubleArrow } from "react-icons/md";
import DividerTitle from "../../components/DividerTitle";

export default function Home() {

  const { colors, sizes } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [selectedButton, setSelectedButton] = useState("novo");
  const [paymentMethods, setPaymentMethods] = useState<string[]>([])
  const [filterNameInput, setFilterNameInput] = useState('');
  const router = useRouter();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [filterName, setFilterName] = useState('')

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleLoading() {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  function handleProductDetails(product_id: string) {
    // router.push('productdetails', {product_id});
  }

  function handleGoNewAnnouncement() {
    router.push(`/newannouncement`);
  };

  function handleGoMyAnnouncement() {
    router.push(`/myannouncement`);
  };

  function handleFilterEnabled() {
    setSelectedButton('novo')
  }

  function handleFilterDisabled() {
    setSelectedButton('usado')
  }

  function handleSearchByNameProduct(event: any) {
    setFilterNameInput(event.target.value);
  }

  async function handleFilterByName() {
    try {
      const response = await api.get(`/products?query=${filterNameInput}`)
      setProducts(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os filtros do produto';

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
    }
  }

  async function fetchProduct() {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      // setLoading(false); 

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os produtos';

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
    }
  }

  async function handleFilterProducts() {
    try {

      // setIsLoading(true);                 

      // const params = `is_new=${isNew}&accept_trade=${acceptTrade}&payment_methods=${JSON.stringify(paymentMethods)}`

      // const response = await api.get(`/products?${params}`)  

      // setProducts(response.data)
      // setIsLoading(false)
      // handleCloseModal()

    } catch (error) {
      // const isAppError = error instanceof AppError;
      // const title = isAppError ? error.message : 'Não foi possível carregar os filtros do produto';

      // toast.show({
      //     title,
      //     placement: 'top',
      //     bgColor: 'red.500'
      // })
      // setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <Flex direction="column" height="100vh">
      <NewHeader />
      <Box
        w={{ base: "100%", md: "70%" }}
        maxWidth={1480}
        mx="auto"
        h="100%"
        bg="white"
        justifyContent={'center'}
        alignItems={'center'}
        mt={1}
      >
        <CarouselSlider
          images={[
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1513116476489-7635e79feb27?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D'
          ]}
        />
      </Box>

      <DividerTitle title="More incredible products for you"/>
      <MotionFlex
        width="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        // px="6"
        variants={animationFlex}
        initial="hidden"
        animate="visible"
      >
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" bg='gray.100'>
          <MotionFlex direction="column" variants={itemAnimation}>            
            <SimpleGrid
              columns={{ sm: 2, md: 4 }}
              spacing="4"
              width="100%"
              h='auto'
              bg={'white'}
            >
              {products.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id}>
                  <Product
                    product_images={product.product_images}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    is_new={product.is_new}
                    is_active={product.is_active}
                    payment_methods={product.payment_methods}
                    onClick={() => handleProductDetails(product.id)}
                  />
                </Link>
              ))}
            </SimpleGrid>

            <Link href={`/product/`}>
              <HStack justifyContent={'flex-end'} alignItems={'center'} mt={5} mb={4}>
                <Text textAlign={'right'} fontWeight={'bold'} color="yellow.500" fontSize="md" >
                  See all products
                </Text>
                <MdDoubleArrow color={colors.yellow[500]} />
              </HStack>
            </Link>

            <DividerTitle title="Join us and live a new experience"/>
            <InfoCard />

            {/* 
            <AlertDialog
              motionPreset='slideInBottom'
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered                
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader color="gray.500">Filtrar anúncios</AlertDialogHeader>                            
                <AlertDialogCloseButton color="gray.700"/>

                <AlertDialogBody color="gray.500" fontWeight="bold">
                  <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={3}>
                    Condição
                  </Text>

                  <HStack mb={5}>
                    <Button
                      bg="gray.200" 
                      color={selectedButton === "novo" ? "blue.500" : "gray.400"}
                      border={selectedButton === "novo" ? "2px solid" : "0px solid"} 
                      _hover={{ backgroundColor: "gray.300" }}                                              
                      fontSize="sm" 
                      justifyContent="center"
                      alignItems="center"
                      borderRadius={20}
                      onClick={() => handleFilterEnabled()} 
                    >
                      Novo
                    </Button> 

                    <Button
                      bg="gray.200" 
                      color={selectedButton === "usado" ? "blue.500" : "gray.400"}
                      border={selectedButton === "usado" ? "2px solid" : "0px solid"}  
                      _hover={{ backgroundColor: "gray.300" }}                                            
                      fontSize="sm" 
                      justifyContent="center"
                      alignItems="center"
                      borderRadius={20}
                      onClick={() => handleFilterDisabled()} 
                    >
                      Usado
                    </Button> 
                  </HStack>    

                  <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={1}>
                    Aceita troca?
                  </Text>

                  <Switch
                    // isChecked={isBannerVisible}
                    // onChange={handleSwitchChange}
                    size="lg"
                    colorScheme="blue"
                    id='email-alerts'
                  />

                  <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={3} mt={5}>
                    Métodos de Pagamentos Aceitos:
                  </Text>

                  <CheckboxGroup 
                    colorScheme='blue' 
                    onChange={setPaymentMethods} 
                    value={paymentMethods} 
                    accessibilityLabel="choose numbers"
                  >
                    <VStack spacing={[1, 2]} direction={['column']} alignItems="left" justify="flex-start" mt={3}>
                      <Checkbox value='boleto' color="gray.500" size='sm'>Boleto</Checkbox>
                      <Checkbox value='pix'color="gray.500" size='sm'>Pix</Checkbox>
                      <Checkbox value='cash' color="gray.500" size='sm'>Dinheiro</Checkbox>
                      <Checkbox value='card' color="gray.500" size='sm'>Cartão Crédito</Checkbox>
                      <Checkbox value='deposit' color="gray.500" size='sm'>Depósito Bancário</Checkbox>
                    </VStack>
                  </CheckboxGroup>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <HStack justifyContent='space-between' w='100%'>
                    <Button 
                      bg='gray.200' 
                      // ref={cancelRef} 
                      onClick={onClose} 
                      w="48%"
                      fontSize='sm'
                      _hover={{ backgroundColor: "gray.300" }}
                    >
                      Resetar Filtros
                    </Button>

                    <Button 
                      bg='gray.700' 
                      color="gray.200" 
                      // ref={cancelRef} 
                      onClick={handleFilterProducts} 
                      w="48%"
                      fontSize='sm'
                      _hover={{ backgroundColor: "gray.400" }}
                    >
                      Aplicar Filtros
                    </Button>
                  </HStack>
                </AlertDialogFooter>

              </AlertDialogContent>
            </AlertDialog>  */}
          </MotionFlex>
        </SimpleGrid>
      </MotionFlex>

      <DividerTitle title="Marketspace News: Receive our offers"/>
      <RegisterEmail />
      <Footer />
      <ToastContainer />
    </Flex>
  )
}



