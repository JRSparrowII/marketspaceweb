'use client'

import { Box, Flex, SimpleGrid, HStack, Text, useTheme, Stack} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { MdDoubleArrow } from "react-icons/md";
import React, { useEffect, useState } from "react";

import Link from 'next/link'
import { useRouter } from 'next/router';

import { api } from "../../services/api";
import { ProductDTO } from "../../dtos/ProductDTO";
import { AppError } from "../../utils/AppError";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NewHeader from "../../components/NewHeader";
import CarouselSlider from "../../components/CarouselSlider";
import Footer from "../../components/Footer";
import RegisterEmail from "../../components/RegisterEmail";
import InfoCard from "../../components/InfoCard";
import DividerTitle from "../../components/DividerTitle";

import { Product } from "../../components/Product";


export default function Home() {

  const cancelRef = React.useRef();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { colors, sizes } = useTheme();

  const [filterName, setFilterName] = useState('');
  const [filterNameInput, setFilterNameInput] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<string[]>([])
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [selectedButton, setSelectedButton] = useState("novo");

  function handleLoading() {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  function handleProductDetails(product_id: string) {
    // router.push('productdetails', {product_id});
  }

  function handleGoNewAnnouncement() {
    router.push(`/newannouncement`);
  };

  function handleGoMyAnnouncement() {
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

  async function fetchProduct() {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
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
  }, [])

  return (
    <Flex direction="column" height="100vh">
      <NewHeader />

      <motion.div
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -150 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          w={{ base: "100%", md: "70%" }}
          maxWidth={1480}
          mx="auto"
          h="100%"
          bg="white"
          justifyContent={'center'}
          alignItems={'center'}
          mt={1}
        >
          <CarouselSlider
            images={[
              'https://img.freepik.com/vetores-gratis/capa-preta-plana-sexta-feira-twitch_23-2149103021.jpg?w=1380&t=st=1697991126~exp=1697991726~hmac=54cd5517d608fce1fcebb88a2b054f292075e9d005ac3a3193d6c55a1a1f5fbc',
              'https://img.freepik.com/vetores-premium/projeto-de-banner-de-vetor-de-venda-de-halloween-texto-de-venda-de-halloween-com-elementos-sazonais-assustadores-e-assustadores_572293-2535.jpg?w=1380',
              'https://img.freepik.com/vetores-gratis/letras-de-feliz-dia-das-bruxas-com-morcegos-e-baloes-fantasma_74855-784.jpg?w=1380&t=st=1697990832~exp=1697991432~hmac=8066b661aab59fa40d5a5ac4d11f3890c76c163da3025d06bd8023d3287c049c',
              'https://img.freepik.com/vetores-premium/black-friday-super-sale-caixas-de-presente-pretas-realistas-com-arco-dourado-fundo-escuro-dourado-e-vermelho_132477-217.jpg?w=1380',
              'https://img.freepik.com/vetores-gratis/faixa-preta-plana-sexta-feira-twitch_23-2149122298.jpg?w=1380&t=st=1697990347~exp=1697990947~hmac=d089b22e0be7b7e13021d57a38c2b7f97e87392f45a705aca2e44fc6cf029f85',
              'https://img.freepik.com/vetores-gratis/feliz-natal-banner-design-com-sinos_74855-1004.jpg?w=1380&t=st=1697990944~exp=1697991544~hmac=cd0c9a8b49f341294ceeb5945dde227e0ac67aca249908e8c2f9ef257c5f7f96'
            ]}
          />
        </Box>
      </motion.div>

      <DividerTitle title="More incredible products for you" />

      <Stack
        width="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
      >
        <AnimatePresence>
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            alignItems="flex-start"
            bg='gray.100'
            width="100%"
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                exit={{ y: -50 }}
                transition={{ duration: 0.9, delay: index * 0.1 }}
              >
                <Link href={`/products/${product.id}`} key={product.id}>
                  <Product
                    product_images={product.product_images}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    is_new={product.is_new}
                    is_active={product.is_active}
                    payment_methods={product.payment_methods}
                    onClick={() => handleProductDetails(product.id)}
                  />
                </Link>
              </motion.div>
            ))}
          </SimpleGrid>
        </AnimatePresence>

        <Link href={`/product/`}>
          <HStack justifyContent={'flex-end'} alignItems={'center'} mt={5} mb={4}>
            <Text textAlign={'right'} fontWeight={'bold'} color="yellow.500" fontSize="md" >
              See all products
            </Text>
            <MdDoubleArrow color={colors.yellow[500]} />
          </HStack>
        </Link>

        <motion.div
          initial={{ opacity: 0, x: 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 150 }}
          transition={{ duration: 0.8 }}
        >
          <DividerTitle title="Join us and live a new experience" />
          <InfoCard />

        </motion.div>

      </Stack>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
      >
        <DividerTitle title="Marketspace News: Receive our offers" />
        <RegisterEmail />
      </motion.div>

      <Footer />
      <ToastContainer />
    </Flex>
  )
}



