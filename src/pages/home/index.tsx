import { Box, Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text, Button, 
  InputGroup, InputRightElement, Input, useDisclosure, Switch, 
  AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, useTheme,
  AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Checkbox, CheckboxGroup} from "@chakra-ui/react";
// import { Header } from "../../components/Header/Index";
// import { SideBar } from "../../components/Sidebar/index";
// import { NewSearchBar } from "../../components/NewSearchBar/index";
import React, { useEffect, useState } from "react";
// import { Input } from "../../components/Form/Input";
import {RiAddLine, RiPencilLine, RiSearchLine, RiFilter2Line, RiSoundModuleFill } from 'react-icons/ri'
import {BsTag, BsArrowRight, BsPlusCircle } from 'react-icons/bs'
import Link from 'next/link'
import { Header } from "../../components/Header/Index";
import { SideBar } from "../../components/Sidebar";
import { Product } from "../../components/Product";

import { FiLogIn } from "react-icons/fi";
import { MotionFlex, animationFlex, itemAnimation } from '../../styles/animation';
import { ButtonDefault } from "../../components/Button";
import { useRouter } from 'next/router';
import { api } from "../../services/api";
import { ProductDTO } from "../../dtos/ProductDTO";
import { AppError } from "../../utils/AppError";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CarouselSlider from "../../components/CarouselSlider";



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

  function handleGoNewAnnouncement(){
    router.push(`/newannouncement`);
  };

  function handleGoMyAnnouncement(){
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

  async function fetchProduct() {       
    try {
      const response = await api.get('/products');
      setProducts(response.data);
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
  },[])
  
  return (

    <Flex direction="column" height="100vh" 
    // variants={animationFlex}
    // initial="hidden"
    // animate="visible"
    > 
      <Header/>   
      
      <MotionFlex 
        width="100%" 
        my="6" 
        maxWidth={1250} 
        mx="auto" 
        px="6"  
        variants={animationFlex}
        initial="hidden"
        animate="visible"
      >
        {/* <SideBar />  */}
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" bg='gray.100'> 
          <MotionFlex direction="column" variants={itemAnimation}>
            {/* <HStack 
              justifyContent="space-between" 
              alignItems="center"   
              spacing={5}                                   
            >
              <Heading size="md" fontWeight="normal" color="blue.500">Produtos anúnciados para venda</Heading>
              
              <ButtonDefault
                title="Criar anúncio"
                icon={<BsPlusCircle color={colors.gray[200]} size={sizes[4]}/>}
                variant="base1"
                // loadingText="Aguarde..."
                size="small"
                onClick={handleGoNewAnnouncement}
              />
            </HStack>
            <Divider my="2" borderColor="blue.500" ></Divider> */}

            <CarouselSlider
              images={[
                'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
                'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
                'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
              ]}
            />

            {/* <Box bg="blue.100" mt={5} rounded={5} h={20} w="100%">             
              <HStack justifyContent="space-between" alignItems="center" padding={3}>                
                <HStack 
                  justifyContent="space-between" 
                  alignItems="center"   
                  spacing={5} 
                  pl={3}                                   
                >
                  <BsTag color={colors.blue[700]} size={sizes[7]} />
                  <VStack ml={4} justifyContent="flex-start" alignItems="left" spacing={1}>
                    <Text 
                      color="gray.600" 
                      fontFamily={'heading'} 
                      fontSize="xl" 
                      fontWeight="bold" 
                      lineHeight={'md'}
                      textAlign="left"
                    >
                      4
                    </Text>  
                    <Text color="gray.600" fontSize="sm">Anúncios ativos</Text> 
                  </VStack>
                </HStack>

                <Button bg="blue.100" _hover={{ backgroundColor: "blue.100" }} onClick={handleGoMyAnnouncement}>
                  <HStack 
                    justifyContent="space-between" 
                    alignItems="center"                 
                  >
                    <Text 
                      color="blue.500" 
                      fontFamily={'heading'} 
                      fontWeight="bold" 
                      fontSize="sm"
                    >
                      Meus anúncios 
                    </Text>
                    <BsArrowRight color={colors.blue[500]} size={sizes[5]}/>
                  </HStack>   
                </Button>   

              </HStack>                    
            </Box> */}

            <Text color="gray.500" fontSize="sm" mt={4} mb={4}>
                Compre produtos variados
            </Text>

            <InputGroup>
              <Input 
                color="gray.700"
                variant="filled" 
                borderColor="blue.100"
                placeholder='Digite sua pesquisa'
                _placeholder={{color: 'gray.400'}}
                fontSize="sm"                                                    
                type="text" 
                value={filterNameInput} 
                onChange={handleSearchByNameProduct}
              />       

              <InputRightElement 
                // onClick={handleSearch}
                cursor="pointer"
              >
                {/* {isLoading ? (
                    <Spinner size="sm" />
                ) : ( */}
                    <HStack spacing={2} pr={5} mr={6}>
                      <RiSearchLine color={colors.blue[500]} size={sizes[5]} onClick={handleFilterByName}/>
                      <Text>|</Text>
                      <RiSoundModuleFill color={colors.blue[500]} size={sizes[5]} onClick={onOpen}/>
                    </HStack>
                    
                {/* )} */}
              </InputRightElement>
            </InputGroup>

            <SimpleGrid 
              columns={{ sm: 2, md: 3 }} 
              spacing="4"
              // minChildWidth="380px"
              width="100%"
              h='500px'
              mt={10}
            >
              {products.map((product) => (    
                 <Link href={`/products/${product.id}`} key={product.id}>            
                  <Product
                    product_images={product.product_images}
                    name={product.name}
                    price={product.price}
                    is_new={product.is_new}
                    is_active={product.is_active}
                    payment_methods={product.payment_methods}
                    // onClick={() => handleProductDetails(product.id)} 
                  />
                </Link>
              ))}
            </SimpleGrid>

            <Text color="gray.500" fontSize="sm" mt={8} mb={4}>
                Recomendamos para você
            </Text>

            {/* <SimpleGrid 
              columns={{ sm: 2, md: 5 }} 
              spacing="4"
              // minChildWidth="380px"
              width="100%"
              h='500px'
              mt={10}
            >
              {products.slice(0, 5).map((product) => (    
                 <Link href={`/products/${product.id}`} key={product.id}>            
                  <Product
                    product_images={product.product_images}
                    name={product.name}
                    price={product.price}
                    is_new={product.is_new}
                    is_active={product.is_active}
                    payment_methods={product.payment_methods}
                    // onClick={() => handleProductDetails(product.id)} 
                  />
                </Link>
              ))}
            </SimpleGrid> */}

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
            </AlertDialog> 
          </MotionFlex>
        </SimpleGrid>
      </MotionFlex>
      <ToastContainer/>
    </Flex>
  )
}
  


