import {
    Box, Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text, Button,
    InputGroup, InputRightElement, Input, useDisclosure, Switch, Image,
    AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, useTheme,
    AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Checkbox, Stack, Tag, Select, Center
} from "@chakra-ui/react"
    ;

import React, { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine, RiSearchLine, RiFilter2Line, RiSoundModuleFill } from 'react-icons/ri'
import { RxPlus } from 'react-icons/rx'
import Link from 'next/link'
import { Header } from "../../components/Header/Index";
import { SideBar } from "../../components/Sidebar";
import { Product } from "../../components/Product";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";
import { ProductDTO } from "../../dtos/ProductDTO";
import { AppError } from "../../utils/AppError";
import { api } from "../../services/api";
import { CgFileDocument } from "react-icons/cg";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/router';
import NewHeader from "../../components/NewHeader";
import { AnimatePresence, motion } from "framer-motion";


export default function MyAnnouncement() {

    const { colors, sizes } = useTheme();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [selectedButton, setSelectedButton] = useState("ativado");
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [filterTypeSelected, setFilterTypeSelected] = useState('todos');

    const router = useRouter();
    const { id } = router.query;

    function handleOptionSelected(event: any) {
        setFilterTypeSelected(event.target.value);
    }

    function handleProductDetails(id: string) {
        // navigation.navigate('myadsdetails', {userProduct_id});
        router.push(`/adsdetails, ${id}`);
    }

    async function fetchMyAds() {
        try {
            const response = await api.get('/users/products');
            setProducts(response.data);
            console.log('aqui as 21:28 =>', response.data);
            //   setLoading(false); 

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

    useEffect(() => {
        fetchMyAds()
    }, [])

    return (

        <Flex direction="column" height="100vh">
            <NewHeader />

            <Flex width="100%" my="6" maxWidth={1000} mx="auto" px="6">
                {/* <SideBar />  */}
                <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" bg='gray.100'>
                    <Flex direction="column" mb={20}>
                        <HStack
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={2}
                        >
                            <CgFileDocument color={colors.blue[500]} size={sizes[6]} />
                            <Heading size="md" fontWeight="normal" color="blue.500">
                                Meus anúncios para venda
                            </Heading>
                        </HStack>
                        <Divider my="2" borderColor="blue.500" ></Divider>

                        <HStack
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={5}
                            mt={5}
                        >
                            <Text color="gray.600" fontSize="md" mt={3}>
                                {products.length} anúncios
                            </Text>

                            <Select
                                variant='filled'
                                w="30%"
                                // borderBottom="2px solid" 
                                borderColor="gray.300"
                                // border="0px 0px 3px 0px"
                                value={filterTypeSelected}
                                onChange={handleOptionSelected}
                            >
                                <option value='todos'>Todos</option>
                                <option value='novo'>Novo</option>
                                <option value='usado'>Usado</option>
                            </Select>
                        </HStack>

                        <AnimatePresence>
                            <SimpleGrid
                                columns={{ sm: 1, md: 3 }}
                                spacing="4"
                                // minChildWidth="380px"
                                width="100%"
                                h='500px'
                                mt={10}
                            >
                                {products.map((product, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ y: -50 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -50 }}
                                        transition={{ duration: 0.9, delay: index * 0.1 }}
                                    >
                                        <Link href={`/adsdetails/${product.id}`} key={product.id}>
                                            <Product
                                                product_images={product.product_images}
                                                name={product.name}
                                                price={product.price}
                                                is_new={product.is_new}
                                                is_active={product.is_active}
                                                onClick={() => handleProductDetails(product.id)}
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </SimpleGrid>
                        </AnimatePresence>

                    </Flex>
                </SimpleGrid>
                <ToastContainer />
            </Flex>
        </Flex>
    )
}
