import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Text, Button, Radio, RadioGroup,
   Switch, Image, useTheme, Checkbox, CheckboxGroup, Stack, FormControl
} from "@chakra-ui/react";

import { RxPlus } from 'react-icons/rx'
import { AdsDTO } from "../../dtos/AdsDTO";

import { Header } from "../../components/Header/Index";
import { SideBar } from "../../components/Sidebar";
import { Input } from "../../components/Input";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import {yupResolver } from "@hookform/resolvers/yup";

import Link from 'next/link'
import Dropzone from "../../components/Dropzone";
import { storageAdsGet, storageAdsSave } from "../../storage/storageAds";
import { ButtonDefault } from "../../components/Button";
import { api } from "../../services/api";

import {useRouter} from 'next/router';
import { ADS_STORAGE } from "../../storage/storageConfig";
  
export default function EditAds() {

    const { colors, sizes } = useTheme();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const newAnnouncementFormSchema = yup.object().shape({   
        name: yup.string().required('Nome obrigatório'),
        price: yup.string().required('Preço é obrigatório'),
        description: yup.string().required('Descreva seu produto'),
    }); 
    const {register, handleSubmit, formState} = useForm<AdsDTO>({
        resolver: yupResolver(newAnnouncementFormSchema)
    });
    
    const {errors} = formState

    const [images, setImages] = useState<string[]>([]); 
    
    const [name, setName] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [statusProduto, setStatusProduto] = useState<string | undefined>();
    const [price, setPrice] = useState<number | undefined>();
    const [switchValue, setSwitchValue] = useState <boolean | undefined> (false);
    const [isTradable, setIsTradable] = useState <boolean | undefined> (undefined);

    // const paymentMethodsData = localStorage.getItem('payment_methods'); 
        // const [isNew, setIsNew] = useState <boolean | undefined> (undefined);
    const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
    
    const router = useRouter();
    const { id } = router.query;

    async function fetchGetProductDetails() {
        try {

            setIsLoading(true);
            const response = await storageAdsGet()      
            // const response = await api.get(`/products/${id}`);
            console.log('trouxe os dados as 14:57 =>', response)

            const convertStatusProdutoToString = (status: boolean): string => {
                if (response?.is_new) {
                  return "new";
                } else {
                  return "used";
                }
            };

            // setImages(response.images)
            setName(response?.name);
            setDescription(response?.description);
            // setStatusProduto(convertStatusProdutoToString);
            setPrice(response?.price);
            setSwitchValue(response?.accept_trade);
            // setPaymentMethods(response?.payment_methods)
            setPaymentMethods(response?.payment_methods || []);
        
        } catch (error) {
            const title = 'Não foi possível carregar os detalhes do produto';        
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
    
        } finally {
            setIsLoading(false);
        }
    }

    function RadioStatusProduct(){
        return (
            <RadioGroup
                name="radioGroupStatusProduto"
                value={statusProduto}
                onChange={(nextValue) => {setStatusProduto(nextValue)}}              
            >
                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    w="30%"
                    mt={3}
                    color="gray.600" 
                    fontSize='sm'
                >
                    <Radio size='sm' value="new" my={1}>
                        Produto novo
                    </Radio>

                    <Radio size='sm' value="used" my={1}>
                        Produto usado
                    </Radio>
                </HStack>       
            </RadioGroup>
        );
    };

    function Switches(){
        const toggleSwitch = () => { setSwitchValue(!switchValue)};
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

    function handleLoading() {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    function getConverteStatusProdutoBoolean(status : string): boolean {
        if (statusProduto == "new") {
            return true;
        } else {
            return false;
        }
    } 

    async function handleNewAd({ name, price, description }: AdsDTO) {
        try {  

            if(paymentMethods.length === 0) {
                toast.warning('Atenção! Por favor, escolha um método de pagamento.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });        
                return
            }

            if ( !statusProduto ) {
                toast.warning('Atenção! Por favor, status para seu produto.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });        
                return
            }

            if ( !images ) {
                toast.warning('Atenção! Por favor, escolha uma imagem.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });        
                return
            }   

            handleLoading()

            const data = {
                name: name,
                description: description,
                is_new:  getConverteStatusProdutoBoolean(statusProduto),
                price: price,
                accept_trade:  switchValue,
                payment_methods: paymentMethods,
                images: images
            }
            
            // await storageAdsSave(data);
            // console.log( 'TESTANDO AS 13:43 =>', data)
            // setIsLoading(false)
            // handleOpenPreview();      
                  
        } catch (error) {
            setIsLoading(false);
        
            toast.error('Ocorreu um erro, tente mais tarde!', {
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
        fetchGetProductDetails();
    },[id])
    
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
                            <Heading size="md" fontWeight="normal" color="blue.500">Editar anúncio</Heading>
                        </HStack>
                        <Divider my="2" borderColor="blue.500" ></Divider>

                        <Text color="gray.600" fontSize="md" mt={3} fontWeight="bold">Imagens</Text>
                        <Text color="gray.600" fontSize="sm" mt={3}>
                            Escolha até 3 imagens para mostrar o quanto seu produto é incrível
                        </Text>

                        
                        
                        <HStack position="relative" w="100%" h="100%" mt={5}>

                            {/* <Box position="relative" w="80%" h="150px">
                                <Dropzone onFileUploaded={setImages} />
                            </Box> */}

                            {/* {images.length > 0 && (
                                <>
                                    {images.map((image: any) => {
                                        return (
                                            <Box position="relative" w="80%" h="150px">
                                                <Dropzone onFileUploaded={setImages} key={image}/>
                                            </Box>
                                        );
                                    })}
                                </>
                            )} */}

                            

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

                        <Stack w={'100%'} mt={5}>
                            {/* <FormControl>
                                <Input
                                    placeholder='Título do seu anúncio'
                                    name='name'
                                    type={'text'}
                                    onChangeText={() => setName}
                                    value={name} 
                                    error={errors.name}
                                    register={register}
                                    options={{
                                    required: 'É necessário informar um nome para o anúncio.',
                                    }}
                                />
                            </FormControl> */}
                        </Stack>

                        <Stack w={'100%'} mt={3}>
                            <FormControl>
                                {/* <Input
                                    placeholder='Descrição do seu anúncio'
                                    name='description'
                                    type={'text'}
                                    onChangeText={() => setDescription}
                                    value={description} 
                                    error={errors.description}
                                    register={register}
                                    options={{
                                    required: 'É necessário informar a descrição do anúncio.',
                                    }}
                                /> */}
                            </FormControl>
                        </Stack>

                        <RadioStatusProduct/>

                        <Text color="gray.600" fontSize="md" mt={3} fontWeight="bold">Venda</Text>

                        <Stack w={'100%'} mt={3}>
                            <FormControl>
                                {/* <Input
                                    placeholder='Valor do produto'
                                    name='price'
                                    type={'text'}
                                    onChangeText={() => setPrice}
                                    value={price}
                                    error={errors.price}
                                    register={register}
                                    options={{
                                    required: 'É necessário informar um valor para o anúncio.',
                                    }}
                                /> */}
                            </FormControl>
                        </Stack> 

                        <Text color="gray.600" fontSize="md" mt={3} fontWeight="bold">Aceita troca?</Text>

                        <Switches/>

                        <Text color="gray.600" fontSize="md" mt={5} fontWeight="bold">Métodos de pagamento</Text>

                        {/* <CheckboxGroup 
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
                        </CheckboxGroup> */}

                        <HStack justifyContent='space-between' w='100%' mt={5} mb={10}>
                            <ButtonDefault
                                title="Cancelar"
                                // icon={<BsPlusCircle color={colors.gray[200]} size={sizes[4]}/>}
                                variant="base1"
                                size="half"
                                onClick={handleLoading}
                                isLoading={isLoading}
                            />

                            <ButtonDefault
                                title="Avançar"
                                // icon={<BsPlusCircle color={colors.gray[200]} size={sizes[4]}/>}
                                variant="base2"
                                size="half"
                                onClick={handleSubmit(handleNewAd)}
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
    
  