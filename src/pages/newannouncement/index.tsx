import { Box, Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text, Button, 
    InputGroup, InputRightElement, Input, useDisclosure, Switch, Image,
    AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, useTheme,
    AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Checkbox, Stack, Tag} from "@chakra-ui/react"
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

  
export default function NewAnnouncement() {

    const { colors, sizes } = useTheme();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [selectedButton, setSelectedButton] = useState("ativado");

    const RadioStatusProduct = () => {
        const [statusProduto, setStatusProduto] = useState("");
        return (
            <RadioGroup
                name="radioGroupStatusProduto"
                value={statusProduto}
                onChange={(nextValue) => {
                    setStatusProduto(nextValue);
                }}
                
            >
                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    w="30%"
                    // bg="red"
                    mt={3}
                >
                    <Radio value="new" my={1} color="gray.900" fontSize='sm'>
                        Produto novo
                    </Radio>

                    <Radio value="used" my={1} fontSize='sm'>
                        Produto usado
                    </Radio>
                </HStack>
                
            </RadioGroup>
        );
    };

    const Switches = () => {
        const [switchValue, setSwitchValue] = useState(false);

        const toggleSwitch = () => {
            setSwitchValue(!switchValue);
        };

        return (
            <VStack alignItems="flex-start">
                <Switch
                    onChange={toggleSwitch}
                    isChecked={switchValue}
                    size="lg"
                    colorScheme="blue"
                    mt={3}
                    fontSize='sm'
                />
            </VStack>
        );
    };


    
    return (

        <Flex direction="column" height="100vh"> 
            <Header/>   
            
            <Flex width="100%" my="6" maxWidth={1250} mx="auto" px="6">
                <SideBar /> 
                <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" bg='gray.100'> 
                    <Flex direction="column">        
                        <HStack 
                            justifyContent="space-between" 
                            alignItems="center"   
                            spacing={5}                                   
                        >
                            <Heading size="lg" fontWeight="normal" color="blue.500">Crie um novo anúncio</Heading>
                        </HStack>
                        <Divider my="2" borderColor="blue.500" ></Divider>

                        <Text color="gray.600" fontSize="md" mt={3} fontWeight="bold">Imagens</Text>
                        <Text color="gray.600" fontSize="sm" mt={3}>
                            Escolha até 3 imagens para mostrar o quanto seu produto é incrível
                        </Text>
                        
                        <HStack position="relative" w="100%" h="100%" mt={5}>
                            <Box position="relative" w="80%" h="150px">
                                <Button
                                    // onPress={handleUserPhotoSelected} 
                                    h={'150px'}
                                    w={'100%'} 
                                    backgroundColor="gray.300"
                                    alignItems="center"
                                >
                                    <RxPlus color={colors.gray[500]} size={sizes[8]}/>
                                </Button>
                            </Box>

                            <Box position="relative" w="80%" h="150px">
                                <Image
                                    h={'150px'}
                                    w={'100%'} 
                                    src={
                                        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                                    }
                                    objectFit={'cover'}
                                    borderRadius={10}
                                />
                                <HStack
                                    justifyContent="space-between"
                                    w="100%"
                                    bg="transparent"
                                    bgColor="transparent"
                                    padding={2}
                                    position="absolute"
                                    top={0}
                                    zIndex={1}
                                >
                                    <Box/>
                                    <Button borderRadius="100%" size="xs">X</Button>
                                </HStack>
                            </Box>

                            <Box position="relative" w="80%" h="150px">
                                <Image
                                    h={'150px'}
                                    w={'100%'} 
                                    src={
                                        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                                    }
                                    objectFit={'cover'}
                                    borderRadius={10}
                                />
                                <HStack
                                    justifyContent="space-between"
                                    w="100%"
                                    bg="transparent"
                                    bgColor="transparent"
                                    padding={2}
                                    position="absolute"
                                    top={0}
                                    zIndex={1}
                                >
                                    <Box/>
                                    <Button borderRadius="100%" size="xs">X</Button>
                                </HStack>
                            </Box>
                        </HStack>

                        <Text color="gray.600" fontSize="md" mt={5} fontWeight="bold">Sobre o produto</Text>

                        <Input 
                            color="gray.700"
                            variant="filled" 
                            borderColor="blue.100"
                            placeholder='Título do seu anúncio'
                            _placeholder={{color: 'gray.400'}}
                            fontSize="sm"                                                    
                            type="text" 
                            // value={filterNameInput} 
                            // onChange={handleSearchByNameCompany}
                            mt={5}
                        />   

                        <Input 
                            color="gray.700"
                            variant="filled" 
                            borderColor="blue.100"
                            placeholder='Descrição do seu anúncio'
                            _placeholder={{color: 'gray.400'}}
                            fontSize="sm"                                                    
                            type="text" 
                            mt={5}
                            // value={filterNameInput} 
                            // onChange={handleSearchByNameCompany}
                        />  

                        <RadioStatusProduct/>

                        <Text color="gray.600" fontSize="md" mt={3} fontWeight="bold">Venda</Text>

                        <Input 
                            color="gray.700"
                            variant="filled" 
                            borderColor="blue.100"
                            placeholder='Valor do produto'
                            _placeholder={{color: 'gray.400'}}
                            fontSize="sm"                                                    
                            type="text" 
                            // value={filterNameInput} 
                            // onChange={handleSearchByNameCompany}
                            mt={3}
                        />   

                        <Text color="gray.600" fontSize="md" mt={3} fontWeight="bold">Aceita troca?</Text>

                        <Switches/>

                        <Text color="gray.600" fontSize="md" mt={5} fontWeight="bold">Métodos de pagamento</Text>

                        <VStack
                            // onChange={setPaymentMethods} 
                            // value={paymentMethods} 
                            // accessibilityLabel="choose numbers"
                            alignItems="left"
                            justify="flex-start"
                            mt={5}
                        >
                            <Checkbox value='boleto' mb={1}>Boleto</Checkbox>
                            <Checkbox value='pix' mb={1}>Pix</Checkbox>
                            <Checkbox value='cash' mb={1}>Dinheiro</Checkbox>
                            <Checkbox value='card' mb={1}>Cartão Crédito</Checkbox>
                            <Checkbox value='deposit' mb={1}>Depósito Bancário</Checkbox>
                        </VStack> 

                        <HStack justifyContent='space-between' w='100%' mt={5} mb={10}>
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
                    </Flex>
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}
    
  