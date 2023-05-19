import { Box, Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text, Button, 
    InputGroup, InputRightElement, Input, useDisclosure, Switch, Image,
    AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, useTheme,
    AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Checkbox, Stack, Tag, Select} from "@chakra-ui/react"
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

  
export default function MyAnnouncement() {

    const { colors, sizes } = useTheme();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [selectedButton, setSelectedButton] = useState("ativado");
    
    return (

        <Flex direction="column" height="100vh"> 
            <Header/>   
            
            <Flex width="100%" my="6" maxWidth={1250} mx="auto" px="6">
                <SideBar /> 
                <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" bg='gray.100'> 
                    <Flex direction="column" mb={20}>        
                        <HStack 
                            justifyContent="space-between" 
                            alignItems="center"   
                            spacing={5}                                   
                        >
                            <Heading size="lg" fontWeight="normal" color="blue.500" >Produtos anúnciados para venda</Heading>
                            <Button bg="blue.500">
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

                        <HStack 
                            justifyContent="space-between" 
                            alignItems="center"   
                            spacing={5}   
                            mt={5}                                
                        >
                            <Text color="gray.600" fontSize="md" mt={3}>9 anúncios</Text>
                            <Select 
                                variant='filled' 
                                w="40%" 
                                // borderBottom="2px solid" 
                                borderColor="gray.300" 
                                // border="0px 0px 3px 0px"
                                // value={filterTypeSelected} 
                                // onChange={handleCompanySelected}
                            >
                                <option value='fantasyName'>EMPRESA</option>
                                <option value='cnpj'>CNPJ</option>
                            </Select>
                        </HStack>

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
                    </Flex>
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}
    