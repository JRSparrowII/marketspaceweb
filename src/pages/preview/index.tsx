import {useRouter} from 'next/router';

import { Box, Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text, Button, 
  InputGroup, InputRightElement, Input, useDisclosure, Switch, Image,
  AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, useTheme,
  AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Checkbox, Stack, Tag, Select, Avatar, Center} from "@chakra-ui/react"
;
// import { Header } from "../../components/Header/Index";
// import { SideBar } from "../../components/Sidebar/index";
// import { NewSearchBar } from "../../components/NewSearchBar/index";
import React, { useState } from "react";
// import { Input } from "../../components/Form/Input";
import {RiAddLine, RiPencilLine, RiSearchLine, RiFilter2Line, RiSoundModuleFill } from 'react-icons/ri'
import { RxPlus } from 'react-icons/rx'
import Link from 'next/link'
import { Header } from "../../components/Header/Index";
import { SideBar } from "../../components/Sidebar";
import { Product } from "../../components/Product";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";
import CarouselSlider from '../../components/CarouselSlider';

export default function Preview() {

  const {query} = useRouter()

  const { colors, sizes } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [selectedButton, setSelectedButton] = useState("ativado");

  return (
    // <h1>E la vamos nos Product 16337: {JSON.stringify(query)}</h1>
    <Flex direction="column" height="100vh"> 
        <Header/>   
        
        <Flex width="100%" my="6" maxWidth={1250} mx="auto" px="6">
          <SideBar /> 
          <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" bg='gray.100'> 
            <Flex direction="column" mb={20}>
                <Heading size="md" fontWeight="normal" color="blue.500" >Pré Visualização do anúncio</Heading>
                <Divider my="2" borderColor="blue.500" ></Divider>

                {/* <SimpleGrid 
                    columns={{ sm: 1, md: 1 }} 
                    spacing="4"
                    // minChildWidth="380px"
                    width="100%"
                    // h='700px'
                    mt={3} 
                    bg='blue'
                >
                    <Product
                        // product_images='eeeeeee'
                        name={'Carlos'}
                        price={999}
                        user={'item.user'}
                        is_active={true}
                        // onPress={() => handleProductDetails(item.id)} 
                    />
                </SimpleGrid> */}

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
                    mt={5}                                
                >
                    <Avatar     //IMAGEM DO USUARIO
                    size="sm" 
                    name='Carlos Henrique'
                    bg="blue.500" 
                    src="https://github.com/carloshenriquepvh@hotmail.com.png">
                    </Avatar>
                    <Text color="blue.700" fontWeight="bold">Carlos Henrique</Text>
                </HStack>

                <Button
                    bg="gray.200" 
                    color={selectedButton === "ativado" ? "blue.500" : "gray.400"}
                    // border={selectedButton === "ativado" ? "2px solid" : "0px solid"} 
                    _hover={{ backgroundColor: "gray.300" }}                                              
                    fontSize="sm" 
                    justifyContent="center"
                    alignItems="center"
                    borderRadius={30}
                    w="15%"
                    mt={5}
                    // onClick={() => handleFilterEnabled()} 
                >
                    HABILITADOS
                </Button> 

                <HStack 
                    justifyContent="space-between" 
                    alignItems="center"   
                    spacing={2}   
                    mt={5}                                
                >
                    <Text color="blue.700" fontWeight="bold">Cachoeira</Text>
                    <Text color="blue.700" fontWeight="bold">R$ 102,58</Text>
                </HStack>

                <Text color="blue.700" fontSize="sm" mt={5}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere doloribus voluptatem, atque neque officiis libero placeat est molestiae, illum incidunt excepturi blanditiis! Sed, eveniet impedit eum veritatis ipsum accusantium voluptate.</Text>

                <Text color="blue.700" fontSize="sm" mt={5}>Aceita troca? Sim!</Text>

                <Text color="blue.700" fontSize="sm" fontWeight="bold" mt={5}>Meios de pagamento</Text>

                <VStack
                    // onChange={setPaymentMethods} 
                    // value={paymentMethods} 
                    // accessibilityLabel="choose numbers"
                    alignItems="left"
                    justify="flex-start"
                    mt={3}
                    fontSize="sm"
                >
                    <Checkbox value='boleto' mb={1} fontSize="sm">Boleto</Checkbox>
                    <Checkbox value='pix' mb={1} fontSize="sm">Pix</Checkbox>
                    <Checkbox value='cash' mb={1} fontSize="sm">Dinheiro</Checkbox>
                    <Checkbox value='card' mb={1} fontSize="sm">Cartão Crédito</Checkbox>
                    <Checkbox value='deposit' mb={1} fontSize="sm">Depósito Bancário</Checkbox>
                </VStack> 

                <HStack 
                    justifyContent="space-between" 
                    alignItems="center"   
                    spacing={2}   
                    mt={5}                                
                > 
                    <Button fontSize="sm" bg='blue.500' color="blue.100">Voltar e Editar</Button>
                    <Button fontSize="sm" bg='blue.500' color="blue.100">Publicar</Button>
                </HStack>

              
            </Flex>
          </SimpleGrid>
        </Flex>
    </Flex>
  )
}