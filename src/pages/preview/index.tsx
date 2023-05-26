import {useRouter} from 'next/router';

import { Box, Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text, Button, 
  InputGroup, InputRightElement, Input, useDisclosure, Switch, Image,
  AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, useTheme,
  AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Checkbox, Stack, Tag, Select, Avatar, Center} from "@chakra-ui/react"
;
// import { Header } from "../../components/Header/Index";
// import { SideBar } from "../../components/Sidebar/index";
// import { NewSearchBar } from "../../components/NewSearchBar/index";
import React, { useEffect, useState } from "react";
// import { Input } from "../../components/Form/Input";
// import {RiAddLine, RiPencilLine, RiSearchLine, RiFilter2Line, RiSoundModuleFill} from 'react-icons/ri'
import { RiBarcodeLine, RiArrowLeftLine, RiQrCodeFill } from 'react-icons/ri';
import { IoMdCash } from "react-icons/io";
import { BsFillCreditCardFill, BsBank } from "react-icons/bs";
import { IconBaseProps } from 'react-icons';

import {BsTag, BsArrowRight } from 'react-icons/bs'

import { RxPlus } from 'react-icons/rx'
import Link from 'next/link'
import { Header } from "../../components/Header/Index";
import { SideBar } from "../../components/Sidebar";
import { Product } from "../../components/Product";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";
import CarouselSlider from '../../components/CarouselSlider';
import { AdsDTO } from '../../dtos/AdsDTO';
import { storageAdsGet } from '../../storage/storageAds';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ButtonDefault } from '../../components/Button';

export default function Preview() {

    const [ads, setAds] = useState<AdsDTO | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { colors, sizes } = useTheme();
    const router = useRouter();

    const methodIcons: { [key: string]: React.ComponentType<IconBaseProps> } = {
        boleto: RiBarcodeLine,
        pix: RiQrCodeFill,
        cash: IoMdCash,
        card: BsFillCreditCardFill,
        deposit: BsBank
    };

    function handleLoading() {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    function handleGoHome(){
        router.push(`/newannouncement`);
    };

    async function handleCreateNewAd() {           
        try {
            // setIsLoading(true);
            const data = {
                name: ads?.name,
                description: ads?.description,
                is_new: ads?.is_new,
                price: ads?.price,
                accept_trade: ads?.accept_trade,
                payment_methods: ads?.payment_methods
            }

            // const response_product = await api.post('/products', data);  
            handleLoading()

            toast.success('Seu anúncio foi publicado com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
                        
            // if (response_product.data.id) {   

            //     let formData = new FormData(); 

            //     ads?.images.map(( item ) => {
            //         formData.append("images", {
            //             uri: item,
            //             name: "image.jpg",
            //             type: "image/jpg",
            //         });
            //     })

            //     formData.append('product_id', response_product.data.id)
            
                
            //     await api.post('/products/images', formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //         },
            //         transformRequest: (data, headers) => {                        
            //             return formData;
            //         },
            //     });

            //     const title = 'Seu anúncio foi salvo com sucesso!';
            //     toast.show({    
            //         title,
            //         placement: 'top',
            //         bgColor: 'green.500'
            //     })   

            //     // handleGoHome();

            handleGoHome();

            // } else {
            //     throw new Error();
            // }         

        } catch(error) {

            // const isAppError = error instanceof AppError;
            // const title = isAppError ? error.message : 
            // 'Não foi possível enviar os dados. Tente novamente mais tarde';

            // setIsLoading(false);
        
            // toast.show({    
            //     title,
            //     placement: 'top',
            //     bgColor: 'red.500'
            // })
        }
    }

    async function fetchAds() {
       
        try {
            const adLoad = await storageAdsGet();
            setAds(adLoad);
        
        }   catch (error) {

            // const isAppError = error instanceof AppError;
            // const title = isAppError ? error.message : 'Não foi possível carregar os produtos';
        
            // toast.show({
            //     title,
            //     placement: 'top',
            //     bgColor: 'red.500'
            // })
        }
    }

    useEffect(() => {
        fetchAds()
    }, []);  

  return (
    <Flex direction="column" height="100vh"> 
        <Header/>   
        
        <Flex width="100%" my="6" maxWidth={1250} mx="auto" px="6">
          <SideBar /> 
          <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" bg='gray.100'> 
            <Flex direction="column" mb={20}>
                <Heading size="md" fontWeight="normal" color="blue.500" >Pré Visualização do anúncio</Heading>
                <Divider my="2" borderColor="blue.500" ></Divider>

                <Text color="gray.500" fontSize="md" mt={5} mb={5}>É assim que seu anúncio irá aparecer</Text>

                <CarouselSlider
                    // images={[ads?.images]}
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
                        name='Carlos Henrique'
                        bg="blue.500" 
                        src="https://github.com/carloshenriquepvh@hotmail.com.png">
                    </Avatar>
                    <Text color="gray.500" fontWeight="bold">Carlos Henrique</Text>
                </HStack>

                <Button
                    bg="gray.200" 
                    color={"gray.500"}
                    _hover={{ backgroundColor: "gray.200" }}                                              
                    fontSize="sm" 
                    justifyContent="center"
                    alignItems="center"
                    borderRadius={30}
                    w="15%"
                    mt={5}
                    cursor="default"
                >
                    {ads?.is_new ? 'Novo' : 'Usado'}
                </Button> 

                <HStack 
                    justifyContent="space-between" 
                    alignItems="center"   
                    spacing={2}   
                    mt={5}                                
                >
                    <Text color="gray.500" fontWeight="bold">{ads?.name}</Text>
                    <Text color="gray.500" fontWeight="bold">R$ {ads?.price}</Text>
                </HStack>

                <Text color="gray.500" fontSize="sm" mt={5}>{ads?.description}</Text>

                <HStack 
                    justifyContent="flex-start" 
                    alignItems="center"   
                    spacing={2}   
                    mt={5}                                
                >
                    <Text color="gray.500" fontWeight="bold">Aceita troca?</Text>
                    <Text color="gray.500" fontSize="md">{ads?.accept_trade ? 'Sim' : 'Não'}</Text>
                </HStack>

                <Text color="gray.500" fontSize="md" fontWeight="bold" mt={5}>Meios de pagamento</Text>

                <VStack
                    alignItems="left"
                    justify="flex-start"
                    mt={2}
                    fontSize="sm"
                >
                    {ads?.payment_methods.map(method =>
                        <HStack alignItems='center' key={method}>
                            { methodIcons[method] && (
                                <Icon as={methodIcons[method]} name={method} size={6} color='gray.600' mr={1}/>
                            )}
                            <Text fontFamily='body' textTransform='capitalize' fontSize='sm' color='gray.600'>
                                {method}
                            </Text>
                        </HStack>
                    )}   

                </VStack>

                <HStack justifyContent='space-between' w='100%' mt={5} mb={5} bg="white" h={20} px={10}>

                    <ButtonDefault
                        title="Voltar e Editar"
                        icon={<RiArrowLeftLine color={colors.gray[600]} size={sizes[5]}/>}
                        variant="default"
                        size="half"
                        onClick={handleCreateNewAd}
                        isLoading={isLoading}
                    />

                    <ButtonDefault
                        title="Publicar"
                        icon={<BsTag color={colors.gray[200]} size={sizes[4]}/>}
                        variant="base1"
                        size="half"
                        onClick={handleCreateNewAd}
                        isLoading={isLoading}
                    />
                </HStack>              
            </Flex>
          </SimpleGrid>
          <ToastContainer/> 
        </Flex>
    </Flex>
  )
}