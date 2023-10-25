import React, { useState } from "react";
import {
    Box, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Text, Button, Radio, RadioGroup,
    Switch, Image, useTheme, Checkbox, CheckboxGroup, Stack, FormControl, Link
} from "@chakra-ui/react";

import { AdsDTO } from "../../dtos/AdsDTO";
import { Input } from "../../components/Input";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Dropzone from "../../components/Dropzone";
import { storageAdsSave } from "../../storage/storageAds";
import { ButtonDefault } from "../../components/Button";

import { useRouter } from 'next/router';
import NewHeader from "../../components/NewHeader";

import { Center, UnorderedList, ListItem, IconButton } from "@chakra-ui/react";

import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { CgAddR } from "react-icons/cg";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsTrash } from "react-icons/bs";

interface CustomFile extends File {
    preview: string;
}

export default function NewAnnouncement() {

    const { colors, sizes } = useTheme();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const newAnnouncementFormSchema = yup.object().shape({
        name: yup.string().required('Nome obrigatório'),
        price: yup.string().required('Preço é obrigatório'),
        description: yup.string().required('Descreva seu produto'),
    });
    const { register, handleSubmit, formState } = useForm<AdsDTO>({
        resolver: yupResolver(newAnnouncementFormSchema)
    });

    const { errors } = formState

    const [selectedImage, setSelectedImage] = React.useState('');
    const [images, setImages] = useState<string[]>([]);
    const [files, setFiles] = useState<CustomFile[]>([]);
    const [statusProduto, setStatusProduto] = useState<string | undefined>(undefined);
    const [switchValue, setSwitchValue] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState<string[]>([])

    function handleGoPreview() {
        router.push(`/preview`);
    };

    function handleGoHome() {
        router.push(`/home`);
    };

    function RadioStatusProduct() {
        return (
            <RadioGroup
                name="radioGroupStatusProduto"
                value={statusProduto}
                onChange={(nextValue) => { setStatusProduto(nextValue) }}
                w={'100%'}
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

    function Switches() {
        const toggleSwitch = () => { setSwitchValue(!switchValue) };
        return (
            <VStack alignItems="flex-start" w={'100%'}>
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

    function getConverteStatusProdutoBoolean(status: string): boolean {
        if (statusProduto == "new") {
            return true;
        } else {
            return false;
        }
    }

    async function handleNewAd({ name, price, description }: AdsDTO) {
        try {

            if (paymentMethods.length === 0) {
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

            if (!statusProduto) {
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

            if (!files) {
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
                is_new: getConverteStatusProdutoBoolean(statusProduto),
                price: price,
                accept_trade: switchValue,
                payment_methods: paymentMethods,
                images: files.map(image => ({ url: image })),
                // images: images
            }

            // console.log('aqui as 12:37 =>', data)
            // return

            await storageAdsSave(data);
            handleGoPreview()
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

    const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
        maxFiles: 5,
        // implementando tipo de arquivos aceitos
        accept: {
            "image/png": [".png", ".jpg"],
            "text/html": [".html", ".htm"],
        },
        onDrop: (acceptedFiles) => {
            const updatedFiles: CustomFile[] = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            setFiles(updatedFiles);
        },
    });

    const acceptedFileItems = acceptedFiles.map((file) => (
        <ListItem key={file.name}>{file.name}</ListItem>
    ));

    const fileRejectionItems = fileRejections.map(({ file }) => {
        return <ListItem key={file.name}>{file.name}</ListItem>;
    });

    const removeFile = (fileToRemove: CustomFile) => {
        const updatedFiles = files.filter((file) => file !== fileToRemove);
        setFiles(updatedFiles);
    };

    const Preview = files.map((file) => (
        <Box key={file.name} borderWidth="1px" borderRadius="lg" p={1} m={2} position="relative">
            <IconButton
                aria-label="Excluir"
                bg="red.500"
                size="sm"
                onClick={() => removeFile(file)}
                position="absolute"
                top={2}
                right={2}
                zIndex={1}
                _hover={{ bg: 'red.600' }}
            >
                <Box color="white">
                    <BsTrash />
                </Box>
            </IconButton>

            <Box position="relative">
                {file.type.startsWith("image/") ? (
                    <img src={file.preview} alt={file.name} width="100%" height="100%" />
                ) : (
                    <iframe src={file.preview} title={file.name} width="100%" height="300px" />
                )}
            </Box>
        </Box>
    ));


    return (

        <Flex direction="column" height="100vh">
            <NewHeader />

            <Flex width="100%" my="6" maxWidth={1000} mx="auto" px="6">
                {/* <SideBar />  */}
                <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" bg='gray.100'>
                    <Flex direction="column">
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 150 }}
                            transition={{ duration: 0.8 }}
                            style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}
                        >
                            <HStack
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                            >
                                <CgAddR color={colors.blue[500]} size={sizes[6]} />
                                <Heading size="md" fontWeight="normal" color="blue.500">Crie um novo anúncio</Heading>
                            </HStack>
                        </motion.div>
                        <Divider my="2" borderColor="blue.500" ></Divider>

                        <Text color="gray.600" fontSize="md" mt={3} fontWeight="bold">Imagens</Text>
                        <Text color="gray.600" fontSize="md" mt={3}>
                            Escolha até 5 imagens para mostrar o quanto seu produto é incrível
                        </Text>

                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 150 }}
                            transition={{ duration: 0.8 }}
                            style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <HStack position="relative" w="100%" h="100%" mt={5}>
                                <VStack spacing={4} w="100%" h="100%">
                                    <Center w="100%" h="100%">
                                        <Box
                                            {...getRootProps({ className: "dropzone" })}
                                            p={4}
                                            borderWidth={2}
                                            borderColor="blue.300"
                                            borderStyle="dashed"
                                            borderRadius="md"
                                            textAlign="center"
                                            w='100%'
                                            cursor={'pointer'}
                                        >
                                            <input {...getInputProps()} />
                                            <Text> Drop some files and photos here or click to select files...</Text>
                                        </Box>
                                    </Center>

                                    <Box display="flex" justifyContent="center" alignItems="center" w='100%'>
                                        <Box w="50%" px={2} borderRightWidth={1} borderColor="gray.300">
                                            <Text fontSize="lg" fontWeight="bold" textAlign={'center'}>Accepted Files</Text>
                                            <UnorderedList color={'blue.300'} mt={1}>{acceptedFileItems}</UnorderedList>
                                        </Box>
                                        <Box w="50%" px={2}>
                                            <Text fontSize="lg" fontWeight="bold" textAlign={'center'}>Rejected Files</Text>
                                            <UnorderedList color={'red.300'} pl={2} mt={1}>{fileRejectionItems}</UnorderedList>
                                        </Box>
                                    </Box>

                                    <Box w="100%">
                                        <Text fontSize="lg" fontWeight="bold">Files Preview</Text>
                                        <Box display="flex" flexWrap="wrap">
                                            {Preview}
                                        </Box>
                                    </Box>
                                </VStack>
                            </HStack>
                        </motion.div>

                        <Text color="gray.600" fontSize="md" mt={5} fontWeight="bold">Sobre o produto</Text>

                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 150 }}
                            transition={{ duration: 0.8 }}
                            style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                            <VStack w={'100%'}>
                                <Stack w={'100%'} mt={5}>
                                    <FormControl>
                                        <Input
                                            placeholder='Título do seu anúncio'
                                            name='name'
                                            type={'text'}
                                            error={errors.name}
                                            register={register}
                                            options={{
                                                required: 'É necessário informar um nome para o anúncio.',
                                            }}
                                        />
                                    </FormControl>
                                </Stack>

                                <Stack w={'100%'} mt={3}>
                                    <FormControl>
                                        <Input
                                            placeholder='Descrição do seu anúncio'
                                            name='description'
                                            type={'text'}
                                            error={errors.description}
                                            register={register}
                                            options={{
                                                required: 'É necessário informar a descrição do anúncio.',
                                            }}
                                        />
                                    </FormControl>
                                </Stack>

                                <RadioStatusProduct />

                                <Text w={'100%'} color="gray.600" fontSize="md" mt={3} fontWeight="bold">Venda</Text>

                                <Stack w={'100%'} mt={3}>
                                    <FormControl>
                                        <Input
                                            placeholder='Valor do produto'
                                            name='price'
                                            type={'text'}
                                            error={errors.price}
                                            register={register}
                                            options={{
                                                required: 'É necessário informar um valor para o anúncio.',
                                            }}
                                        />
                                    </FormControl>
                                </Stack>

                                <Text w={'100%'} color="gray.600" fontSize="md" mt={3} fontWeight="bold">Aceita troca?</Text>

                                <Switches />

                                <Text w={'100%'} color="gray.600" fontSize="md" mt={5} fontWeight="bold">Métodos de pagamento</Text>

                                <CheckboxGroup
                                    colorScheme='blue'
                                    onChange={setPaymentMethods}
                                    value={paymentMethods}
                                    accessibilityLabel="choose numbers"
                                >
                                    <VStack w={'100%'} spacing={[1, 2]} direction={['column']} alignItems="left" justify="flex-start" mt={3}>
                                        <Checkbox value='boleto' color="gray.500" size='sm'>Boleto</Checkbox>
                                        <Checkbox value='pix' color="gray.500" size='sm'>Pix</Checkbox>
                                        <Checkbox value='cash' color="gray.500" size='sm'>Dinheiro</Checkbox>
                                        <Checkbox value='card' color="gray.500" size='sm'>Cartão Crédito</Checkbox>
                                        <Checkbox value='deposit' color="gray.500" size='sm'>Depósito Bancário</Checkbox>
                                    </VStack>
                                </CheckboxGroup>
                            </VStack>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.3 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.3 }}
                            transition={{ duration: 0.3 }}
                            className='origin-center'
                        >
                            <HStack justifyContent='space-between' w='100%' mt={5} mb={10}>
                                <ButtonDefault
                                    title="Cancelar"
                                    icon={<BsFillArrowLeftCircleFill color={colors.gray[200]} size={sizes[4]} />}
                                    variant="base1"
                                    size="half"
                                    onClick={handleGoHome}
                                    isLoading={isLoading}
                                />

                                <ButtonDefault
                                    title="Avançar"
                                    icon={<BsFillArrowRightCircleFill color={colors.gray[200]} size={sizes[4]} />}
                                    variant="base2"
                                    size="half"
                                    onClick={handleSubmit(handleNewAd)}
                                    isLoading={isLoading}
                                />
                            </HStack>
                        </motion.div>
                    </Flex>
                </SimpleGrid>
                <ToastContainer />
            </Flex>
        </Flex>
    )
}

