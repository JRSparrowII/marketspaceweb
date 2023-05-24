import { Box, Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text, Button, 
  InputGroup, InputRightElement, Input, useDisclosure, Switch, 
  AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, useTheme,
  AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Checkbox} from "@chakra-ui/react";
// import { Header } from "../../components/Header/Index";
// import { SideBar } from "../../components/Sidebar/index";
// import { NewSearchBar } from "../../components/NewSearchBar/index";
import React, { useState } from "react";
// import { Input } from "../../components/Form/Input";
import {RiAddLine, RiPencilLine, RiSearchLine, RiFilter2Line, RiSoundModuleFill } from 'react-icons/ri'
import {BsTag, BsArrowRight, BsPlusCircle } from 'react-icons/bs'
import Link from 'next/link'
import { Header } from "../../components/Header/Index";
import { SideBar } from "../../components/Sidebar";
import { Product } from "../../components/Product";

import { FiLogIn } from "react-icons/fi";
import { MotionFlex, animationFlex, itemAnimation } from '../../styles/animation';

export default function Home() {

  const { colors, sizes } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [selectedButton, setSelectedButton] = useState("ativado");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleLoading() {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }
  
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
        <SideBar /> 
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" bg='gray.100'> 
          <MotionFlex direction="column" variants={itemAnimation}>
            <HStack 
              justifyContent="space-between" 
              alignItems="center"   
              spacing={5}                                   
            >
              <Heading size="md" fontWeight="normal" color="blue.500" >Produtos anúnciados para venda</Heading>
              
              <Button 
                bg="blue.500"
                type="button"
                onClick={handleLoading}
                isLoading={isLoading}
                loadingText="Aguarde..."
                spinnerPlacement="end"
                // name="Entrar"
                color="gray.100"
                // border="none"
                _focus={{ border: "none" }}
                _active={{ background: "blue.700" }}
                _hover={{ background: "blue.700" }}
                fontSize="sm"
              >
                <HStack 
                  justifyContent="space-between" 
                  alignItems="center"                     
                >
                  <BsPlusCircle color={colors.gray[200]} size={sizes[4]}/>
                  <Text 
                    color="gray.200" 
                    fontFamily={'heading'} 
                    fontWeight="bold" 
                    fontSize="sm"
                  >
                    Criar anúncio 
                  </Text>
                  
                </HStack>   
              </Button> 

            </HStack>
            <Divider my="2" borderColor="blue.500" ></Divider>

            <Box
              bg="blue.100" 
              mt={5}          
              rounded={5}   
              h={20} 
              w="100%"                         
            >             
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

                <Button bg="blue.100">
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
            </Box>

            <Text color="gray.500" fontSize="sm" mt={8} mb={4}>
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
                // value={filterNameInput} 
                // onChange={handleSearchByNameCompany}
              />       

              <InputRightElement 
                // onClick={handleSearch}
                cursor="pointer"
              >
                {/* {isLoading ? (
                    <Spinner size="sm" />
                ) : ( */}
                    <HStack spacing={2} pr={5} mr={6}>
                      <RiSearchLine color={colors.blue[500]} size={sizes[5]}/>
                      <Text>|</Text>
                      <RiSoundModuleFill color={colors.blue[500]} size={sizes[5]} onClick={onOpen}/>
                    </HStack>
                    
                {/* )} */}
              </InputRightElement>
            </InputGroup>

            <SimpleGrid 
              columns={{ sm: 1, md: 2 }} 
              spacing="4"
              // minChildWidth="380px"
              width="100%"
              h='500px'
              mt={10}
            >
              <Product
                // product_images='eeeeeee'
                name={'Carlos'}
                price={999}
                user={'item.user'}
                is_active={true}
                // onPress={() => handleProductDetails(item.id)} 
              />

              <Product
                // product_images='eeeeeee'
                name={'Carlos'}
                price={999}
                user={'item.user'}
                is_active={true}
                // onPress={() => handleProductDetails(item.id)} 
              />

              <Product
                // product_images='eeeeeee'
                name={'Carlos'}
                price={999}
                user={'item.user'}
                is_active={true}
                // onPress={() => handleProductDetails(item.id)} 
              />

              <Product
                // product_images='eeeeeee'
                name={'Carlos'}
                price={999}
                user={'item.user'}
                is_active={true}
                // onPress={() => handleProductDetails(item.id)} 
              />

            </SimpleGrid>

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
                      color={selectedButton === "ativado" ? "blue.500" : "gray.400"}
                      border={selectedButton === "ativado" ? "2px solid" : "0px solid"} 
                      _hover={{ backgroundColor: "gray.300" }}                                              
                      fontSize="sm" 
                      justifyContent="center"
                      alignItems="center"
                      borderRadius={30}
                      // onClick={() => handleFilterEnabled()} 
                    >
                      HABILITADOS
                    </Button> 

                    <Button
                      bg="gray.200" 
                      color={selectedButton === "desativado" ? "blue.500" : "gray.400"}
                      border={selectedButton === "desativado" ? "2px solid" : "0px solid"}  
                      _hover={{ backgroundColor: "gray.300" }}                                            
                      fontSize="sm" 
                      justifyContent="center"
                      alignItems="center"
                      borderRadius={30}
                      // onClick={() => handleFilterDisabled()} 
                    >
                      NÃO HABILITADOS
                    </Button> 
                  </HStack>    

                  <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={1}>
                    Aceita troca?
                  </Text>

                  <Switch
                    // isChecked={isBannerVisible}
                    // onChange={handleSwitchChange}
                    size="lg"
                    colorScheme="green"
                    id='email-alerts'
                  />

                  <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={3} mt={5}>
                    Métodos de Pagamentos Aceitos:
                  </Text>
                
                  <VStack
                    // onChange={setPaymentMethods} 
                    // value={paymentMethods} 
                    // accessibilityLabel="choose numbers"
                    alignItems="left"
                    justify="flex-start"
                  >
                    <Checkbox value='boleto' mb={1}>Boleto</Checkbox>
                    <Checkbox value='pix' mb={1}>Pix</Checkbox>
                    <Checkbox value='cash' mb={1}>Dinheiro</Checkbox>
                    <Checkbox value='card' mb={1}>Cartão Crédito</Checkbox>
                    <Checkbox value='deposit' mb={1}>Depósito Bancário</Checkbox>
                  </VStack> 
                </AlertDialogBody>

                <AlertDialogFooter>
                  <HStack justifyContent='space-between' w='100%'>
                    <Button 
                      bg='gray.200' 
                      // ref={cancelRef} 
                      onClick={onClose} 
                      w="48%"
                    >
                      Resetar Filtros
                    </Button>

                    <Button 
                      bg='gray.700' 
                      color="gray.200" 
                      // ref={cancelRef} 
                      onClick={onClose} 
                      w="48%"
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
    </Flex>
  )
}
  


