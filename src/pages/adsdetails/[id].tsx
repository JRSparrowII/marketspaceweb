import {useRouter} from 'next/router';
import Link from 'next/link'

import { Box, Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text, Button, 
  InputGroup, InputRightElement, Input, useDisclosure, Switch, Image,
  AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, useTheme,
  AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Checkbox, Stack, Tag, Select, Avatar} from "@chakra-ui/react"
;
// import { Header } from "../../components/Header/Index";
// import { SideBar } from "../../components/Sidebar/index";
// import { NewSearchBar } from "../../components/NewSearchBar/index";
import React, { useEffect, useState } from "react";
// import { Input } from "../../components/Form/Input";
import {RiAddLine, RiPencilLine, RiSearchLine, RiFilter2Line, RiSoundModuleFill } from 'react-icons/ri'
import { RxPlus } from 'react-icons/rx'
import { Header } from "../../components/Header/Index";
import { SideBar } from "../../components/Sidebar";
import { Product } from "../../components/Product";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";
import CarouselSlider from '../../components/CarouselSlider';
import { AdsDTO } from '../../dtos/AdsDTO';

import { RiBarcodeLine, RiArrowLeftLine, RiQrCodeFill } from 'react-icons/ri';
import { IoMdCash } from "react-icons/io";
import { BsFillCreditCardFill, BsBank, BsPower, BsTrash } from "react-icons/bs";
import { IconBaseProps } from 'react-icons';

import {BsTag, BsArrowRight } from 'react-icons/bs'
import { storageAdsGet } from '../../storage/storageAds';
import { ProductDetailsDTO } from '../../dtos/ProductDetailsDTO';
import { ButtonDefault } from '../../components/Button';
import { api } from '../../services/api';
import { AppError } from '../../utils/AppError';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// export async function getServerSideProps(context) {

//   const {params} = context
//   // const { productId } = context.query;
//   const data = await api.get(`/users/products/${params.myProductDetailsID}`);
//   const adsID = await data;
//   console.log('aqui as 16:32 =>', adsID)

//   return {
//     props: {
//       adsID,
//     },
//   };
// }

// export async function getStaticPath() {

//   const response = await api.get('/users/products/');
//   const data = await response.data;
//   const paths = data.map((myProductDetails) => ({
//     params: { myProductDetails: `${MyProductDetails}` },
//   }));

//   return {
//     paths,
//     fallback: false
//   };

// }

export default function MyProductDetails() {

  // const router = useRouter()
  // const MyProductDetailsID = router.query.myProductDetailsID

  const { colors, sizes } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [selectedButton, setSelectedButton] = useState("ativado");
  const [ads, setAds] = useState<AdsDTO | undefined>(undefined);
  const [product, setProduct] = useState<ProductDetailsDTO>({} as ProductDetailsDTO); 
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const methodIcons: { [key: string]: React.ComponentType<IconBaseProps> } = {
    boleto: RiBarcodeLine,
    pix: RiQrCodeFill,
    cash: IoMdCash,
    card: BsFillCreditCardFill,
    deposit: BsBank
  };

  function handleGoMyAnnouncement(){
    router.push(`/myannouncement`);
  };

  // function EditMyAd(){
  //   <Link href={`/myannouncement/${MyProductDetailsID}/editMyAds/1`}></Link>
  // }

  function DisableAd(){

  }

  function RemoveAd(){
    
  }

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
    // <h1>E la vamos nos Product 16337: {JSON.stringify(query)}</h1>
    <Flex direction="column" height="100vh"> 
        <Header/>   
        
        <Flex width="100%" my="6" maxWidth={1250} mx="auto" px="6">
          <SideBar /> 
          <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" bg='gray.100'> 
            <Flex direction="column" mb={20}>
              <Heading size="lg" fontWeight="normal" color="blue.500" >Detalhes do Anúncio</Heading>
              <Divider my="2" mb={5} borderColor="blue.500" ></Divider>

              <HStack 
                justifyContent="space-between" 
                alignItems="center"   
                spacing={2}   
                mb={5}                                
              >
                <ButtonDefault
                  title="Voltar"
                  icon={<RiArrowLeftLine color={colors.gray[700]} size={sizes[5]}/>}
                  variant="default"
                  size="small"
                  onClick={handleGoMyAnnouncement}
                  isLoading={isLoading}
                />

                <ButtonDefault
                  title="Editar"
                  icon={<RiPencilLine color={colors.gray[700]} size={sizes[5]}/>}
                  variant="default"
                  size="small"
                  onClick={DisableAd}
                  isLoading={isLoading}
                />
              </HStack>
              
              <VStack>
                <CarouselSlider
                  images={[
                    'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
                    'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
                    'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                  ]}
                />
                
                {/* {!product.is_active &&
                  (
                    <VStack  h='100%' w='100%' justifyContent='center' alignItems='center' position='absolute' zIndex={1}>
                      <Box bg='gray.500' h='100%' w='100%' opacity={0.7} rounded='md'/>
                      <Text fontFamily='heading' fontSize='lg' color='gray.100' position='absolute' zIndex={2}>
                        ANÚNCIO DESATIVADO
                      </Text>
                    </VStack>
                  )
                } */}
              </VStack>

              <HStack 
                justifyContent="flex-start" 
                alignItems="center"   
                spacing={2}                                  
              >
                <Avatar     //IMAGEM DO USUARIO
                  size="sm" 
                  name='Carlos Henrique'
                  bg="blue.500" 
                  src="https://github.com/carloshenriquepvh@hotmail.com.png">
                </Avatar>
                <Text color="gray.600" fontWeight="bold">Carlos Henrique</Text>
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
                HABILITADOS
              </Button> 

              <HStack 
                justifyContent="space-between" 
                alignItems="center"   
                spacing={2}   
                mt={5}                                
              >
                <Text color="gray.600" fontWeight="bold">Cachoeira</Text>
                <Text color="blue.500" fontWeight="bold">R$ 102,58</Text>
              </HStack>

              <Text color="gray.600" mt={5}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere doloribus voluptatem, atque neque officiis libero placeat est molestiae, illum incidunt excepturi blanditiis! Sed, eveniet impedit eum veritatis ipsum accusantium voluptate.</Text>

              <Text color="gray.600" mt={5}>Aceita troca? Sim!</Text>

              <Text color="gray.600" fontWeight="bold" mt={5}>Meios de pagamento</Text>

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

              <VStack 
                justifyContent="space-between" 
                alignItems="center"   
                spacing={2}   
                mt={5}                                
              > 
                <ButtonDefault
                  title="Desativar Anúncio"
                  icon={<BsPower color={colors.gray[200]} size={sizes[5]}/>}
                  variant="base2"
                  size="total"
                  onClick={DisableAd}
                  isLoading={isLoading}
                />

                <ButtonDefault
                  title="Excluir Anúncio"
                  icon={<BsTrash color={colors.gray[700]} size={sizes[5]}/>}
                  variant="default"
                  size="total"
                  onClick={RemoveAd}
                  isLoading={isLoading}
                />    
              </VStack>
            </Flex>
          </SimpleGrid>
          <ToastContainer/>
        </Flex>
    </Flex>
  )
}
