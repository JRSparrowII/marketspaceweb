import { useRouter } from 'next/router';
import Link from 'next/link'

import {
  Box, Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text, Button,
  InputGroup, InputRightElement, Input, useDisclosure, Switch, Image,
  AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, useTheme,
  AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Checkbox, Stack, Tag, Select, Avatar
} from "@chakra-ui/react"
  ;
// import { Header } from "../../components/Header/Index";
// import { SideBar } from "../../components/Sidebar/index";
// import { NewSearchBar } from "../../components/NewSearchBar/index";
import React, { useEffect, useState } from "react";
// import { Input } from "../../components/Form/Input";
import { RiAddLine, RiPencilLine, RiSearchLine, RiFilter2Line, RiSoundModuleFill } from 'react-icons/ri'
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

import { BsTag, BsArrowRight } from 'react-icons/bs'
import { storageAdsGet, storageAdsSave } from '../../storage/storageAds';
import { ProductDetailsDTO } from '../../dtos/ProductDetailsDTO';
import { ButtonDefault } from '../../components/Button';
import { api } from '../../services/api';
import { AppError } from '../../utils/AppError';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks/useAuth';
import NewHeader from '../../components/NewHeader';
import Gallery from '../../components/Gallery';


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

  const { colors, sizes } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  // const [selectedButton, setSelectedButton] = useState("ativado");
  // const [ads, setAds] = useState<AdsDTO | undefined>(undefined);
  const [product, setProduct] = useState<ProductDetailsDTO>({} as ProductDetailsDTO);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const { user } = useAuth();

  const methodIcons: { [key: string]: React.ComponentType<IconBaseProps> } = {
    boleto: RiBarcodeLine,
    pix: RiQrCodeFill,
    cash: IoMdCash,
    card: BsFillCreditCardFill,
    deposit: BsBank
  };

  // function formatReal(value: number): string {
  //   const options = {
  //       style: 'currency',
  //       currency: 'BRL',
  //       minimumFractionDigits: 2,
  //   };

  //   return value.toLocaleString('pt-BR', options);
  // }

  function formatReal(value: number): string {
    if (typeof value !== 'number') {
      return 'Valor inválido';
    }

    const options = {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    };

    return value.toLocaleString('pt-BR', options);
  }


  const FormatNumber = ({ price }: any) => (
    <Text fontSize='3xl' color='blue.500' fontWeight={'bold'} textAlign='left'>
      {formatReal(price)}
    </Text>
  );

  function handleGoMyAnnouncement() {
    router.push(`/myannouncement`);
  };

  function GoEdit(id: string) {
    router.push(`/editads/${id}`);
  }

  async function fetchProductDetails() {
    try {

      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
      storageAdsSave(response.data)
      console.log('aqui as 18:00 =>', response.data);
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

  async function handleAdsEnabledOrDisabled() {
    try {
      // setIsUpdating(true)
      // console.log('MOSTRE AQUI OS DADOS 15:21')

      const data = {
        is_active: !product.is_active
      }

      await api.patch(`/products/${id}`, data)

      // console.log('MOSTRE AQUI OS DADOS 15:21', data)

      const title = !product.is_active ? 'Seu anúncio está ativado!' : 'Seu anúncio está desativado!';

      toast.success(title, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // handleOpenMyAds();

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível desabilitar seu produto';

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

    } finally {
      // setIsUpdating(false)
    }
  }

  async function handleDeleteAds(userProduct_id: string) {
    try {
      // setIsDeleting(true)

      await api.delete(`/products/${userProduct_id}`)

      const alert = 'Seu anúncio foi excluído com sucesso!';

      toast.success(alert, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      handleGoMyAnnouncement()

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível excluir o aunúncio! Tente mais tarde!';

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

    } finally {
      // setIsDeleting(false)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [product.id])

  return (
    <Flex direction="column" height="100vh">
      <NewHeader />

      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" bg='gray.100'>
          <Flex direction="column" mb={20}>
            <Heading size="lg" fontWeight="normal" color="blue.500" >Detalhes do Anúncio</Heading>
            <Divider my="2" mb={5} borderColor="blue.500" ></Divider>

            <Heading size="md" fontWeight="normal" color="blue.500" mb={5}>{product.name}</Heading>

            <SimpleGrid
              columns={{ sm: 2, md: 2 }}
              spacing="4"
              minChildWidth="380px"
              // maxWidth={1480}
              width="100%"
              h='550px'
              gap={5}
              // px={'10'}
              spacingX={5}
              bg={'white'}
              justifyContent='center' // Centraliza horizontalmente
              alignItems='center' // Centraliza verticalmente
            // flexDirection='row' // Define a direção como horizontal (row)
            >
              <VStack h={'550px'} bg={'white'}>
                {/* <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  mb={5}
                >
                  <ButtonDefault
                    title="Voltar"
                    icon={<RiArrowLeftLine color={colors.gray[700]} size={sizes[5]} />}
                    variant="default"
                    size="small"
                    onClick={handleGoMyAnnouncement}
                    isLoading={isLoading}
                  />

                  <ButtonDefault
                    title="Editar"
                    icon={<RiPencilLine color={colors.gray[700]} size={sizes[5]} />}
                    variant="default"
                    size="small"
                    onClick={GoEdit}
                    isLoading={isLoading}
                  />

                  <ButtonDefault
                    title="Editar"
                    icon={<RiPencilLine color={colors.gray[700]} size={sizes[5]} />}
                    variant="default"
                    size="small"
                    onClick={GoEdit}
                    isLoading={isLoading}
                  />
                </HStack> */}
                <Gallery />
              </VStack>

              <Stack h={'550px'} bg={'white'} px={5} position={'relative'}>

                {/* <VStack>
                  {!product.is_active &&
                    (
                      <VStack h='30%' w='48%' justifyContent='center' alignItems='center' position='absolute' zIndex={1}>
                        <Box bg='gray.500' h='100%' w='100%' opacity={0.7} rounded='md' />
                        <Text fontFamily='heading' fontSize='lg' color='gray.100' position='absolute' zIndex={2}>
                          ANÚNCIO DESATIVADO
                        </Text>
                      </VStack>
                    )
                  }
                </VStack> */}

                <HStack
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  mt={5}
                  mb={5}
                >
                  <Text color="gray.600">
                    Sell and delivered for:
                    <strong> {user.name}</strong> |
                    <strong color='green'> Avaliable now</strong>
                  </Text>
                </HStack>

                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  mt={10}
                >
                  {/* <Text color="gray.600" fontWeight="bold">{product.name}</Text> */}
                  <FormatNumber price={product.price} />
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


                  {/* <ButtonDefault
                    title="Excluir Anúncio"
                    icon={<BsTrash color={colors.gray[700]} size={sizes[5]} />}
                    variant="default"
                    size="half"
                    onClick={onOpen}
                    isLoading={isLoading}
                  /> */}
                </HStack>

                <Text color="gray.600" mt={5}> À vista no PIX com até 10% OFF</Text>
                <Text color="gray.600" mt={5}>{product.description}</Text>
                <Text color="gray.600" mt={5}>Aceita troca? {product.accept_trade ? 'Sim' : 'Não'}</Text>

                <Text color="gray.600" fontSize={'sm'} fontWeight="thin" mt={5}>
                  Em até 10x de {product.price / 10} sem juros no cartão Ou em 1x no cartão com até 10% OFF
                </Text>

                <Text color="gray.600" fontWeight="bold" mt={5}>Meios de pagamento</Text>
                <VStack
                  alignItems="left"
                  justify="flex-start"
                  mt={2}
                  fontSize="sm"
                >
                  {product.payment_methods && (
                    product.payment_methods.map(method => {
                      const IconComponent = methodIcons[method.key];
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
                  // bg='red'
                  w={'95%'}
                  mt={5}
                  style={{ position: 'absolute', bottom: '0' }}
                  pb={6}
                >
                  <ButtonDefault
                    title={!product.is_active ? 'Ativar anúncio' : 'Desativar anúncio'}
                    icon={<BsPower color={colors.gray[200]} size={sizes[5]} />}
                    variant={!product.is_active ? 'base1' : 'base2'}
                    size="total"
                    onClick={handleAdsEnabledOrDisabled}
                    isLoading={isLoading}
                  />

                  <ButtonDefault
                    title="Excluir Anúncio"
                    icon={<BsTrash color={colors.gray[700]} size={sizes[5]} />}
                    variant="default"
                    size="total"
                    onClick={onOpen}
                    isLoading={isLoading}
                  />

                  <ButtonDefault
                    title="Excluir Anúncio"
                    icon={<BsTrash color={colors.gray[700]} size={sizes[5]} />}
                    variant="default"
                    size="total"
                    onClick={onOpen}
                    isLoading={isLoading}
                  />
                </HStack>
              </Stack>
            </SimpleGrid>
          </Flex>
        </SimpleGrid>
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
              <AlertDialogHeader color="gray.500">ATENÇÃO!!!</AlertDialogHeader>
              <AlertDialogCloseButton color="gray.700"/>

              <AlertDialogBody color="gray.500" fontWeight="bold">
                Você tem certeza que deseja REALMENTE EXCLUIR este anúncio?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button colorScheme='red' ref={cancelRef} onClick={onClose}>
                  Não, Volte!
                </Button>
                
                <Button colorScheme='whatsapp' ml={3} onClick={handleDeleteAds}>
                  Sim, Tenho certeza!
                </Button>                
              </AlertDialogFooter>

            </AlertDialogContent>
          </AlertDialog>       */}

        <ToastContainer />
      </Flex>
    </Flex>
  )
}
