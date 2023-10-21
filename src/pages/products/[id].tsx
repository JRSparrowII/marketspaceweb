import React, { useEffect, useState } from "react";

import CarouselSlider from '../../components/CarouselSlider';
import { Header } from "../../components/Header/Index";
import { SideBar } from "../../components/Sidebar";

import {
  Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text,
  Button, Avatar, Stack, useTheme, useDisclosure, Center
} from "@chakra-ui/react"
  ;

import { RiBarcodeLine, RiQrCodeFill } from 'react-icons/ri';
import { IoMdCash } from "react-icons/io";
import { BsFillCreditCardFill, BsBank, BsTrash } from "react-icons/bs";
import { IconBaseProps } from 'react-icons';

import { AppError } from '../../utils/AppError';
import { api } from '../../services/api';
import { ProductDetailsDTO } from '../../dtos/ProductDetailsDTO';
import { useAuth } from '../../hooks/useAuth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import NewHeader from "../../components/NewHeader";
import { ButtonDefault } from "../../components/Button";
import Gallery from "../../components/Gallery";

export default function ProductDetails() {

  const [product, setProduct] = useState<ProductDetailsDTO>({} as ProductDetailsDTO);
  const { user } = useAuth();

  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { colors, sizes } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const methodIcons: { [key: string]: React.ComponentType<IconBaseProps> } = {
    boleto: RiBarcodeLine,
    pix: RiQrCodeFill,
    cash: IoMdCash,
    card: BsFillCreditCardFill,
    deposit: BsBank
  };

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
                <Gallery />
              </VStack>

              <Stack h={'550px'} bg={'white'} px={5} position={'relative'}>
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
                    mb={5}
                    cursor="default"
                  >
                    {product.is_new ? 'Novo' : 'Usado'}
                  </Button>
                </HStack>

                <Text color="gray.600" fontSize={'xs'}> À vista no PIX com até 10% OFF</Text>
                <Text color="gray.600" mt={10}>{product.description}</Text>
                <Text color="gray.600" mt={5}>Aceita troca? {product.accept_trade ? 'Sim' : 'Não'}</Text>

                {product.accept_trade === true ? (
                  <Text color="gray.600" fontSize="xs" fontWeight="thin" mt={5}>
                    Em até 10x de {product.price / 10} sem juros no cartão ou em 1x no cartão com até 10% OFF
                  </Text>
                ) : null}

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

                <Center>
                <VStack style={{ position: 'absolute', bottom: '0' }}
                  pb={6}
                  justifyContent="center"
                  alignItems="center"
                  w={'75%'}
                  // bg={'red'}
                >
                  <Divider my="2" mb={2} borderColor="blue.500" ></Divider>

                  <Text fontFamily='body' fontSize='sm' color='gray.500'>
                    Fale com o vendedor atraves do
                  </Text>

                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    // bg='red'
                    w={'95%'}
                    mt={5}

                  >
                    <ButtonDefault
                      title="Fale com vendedor"
                      icon={<BsTrash color={colors.gray[100]} size={sizes[5]} />}
                      variant="base1"
                      size="half"
                      onClick={onOpen}
                      isLoading={isLoading}
                    />
                    <ButtonDefault
                      title="Fale com vendedor"
                      icon={<BsTrash color={colors.gray[100]} size={sizes[5]} />}
                      variant="base1"
                      size="half"
                      onClick={onOpen}
                      isLoading={isLoading}
                    />
                  </HStack>
                </VStack>,
                </Center>
              </Stack>
            </SimpleGrid>
          </Flex>
        </SimpleGrid>

        <ToastContainer />
      </Flex>
    </Flex>
  )
}
