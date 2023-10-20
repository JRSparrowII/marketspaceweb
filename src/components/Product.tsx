import { Text, HStack, VStack, Image, Avatar, Box, Button, Stack} from '@chakra-ui/react';
import { useState } from 'react';
import { Status } from './Status';
import { ProductDTO } from '../dtos/ProductDTO'
import { MotionFlex, animationFlex, itemAnimation } from '../styles/animation';
import { baseURL } from '../services/api';
import Link from 'next/link';
import { ButtonDefault } from './Button';
// import { baseURL } from "@services/api"

// type Props = TouchableOpacityProps & {
//     data: ProductDTO;
//   };

export function Product({onClick, product_images, payment_methods, is_new, is_active, user, name, description, price, ...rest}: ProductDTO){

    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');
    const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);

    function handleSignIn(){

    }

    return(
        <MotionFlex variants={animationFlex}>
            {/* <Link href={`/product/${product.id}`} key={product.id}> */}
                <Stack w="100%" h="100%" bg={'white'} as="a" borderWidth={"1px"} borderColor={"blue.300"}>
                    <Stack w="100%" h="100%" spacing={2} bg={'white'} pb={3}> 
                        <VStack>
                            <Box position="relative" w="100%" h="100%">
                                <Image
                                    h={'200px'}
                                    w={'full'}
                                    src={
                                        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                                    }
                                    objectFit={'cover'}
                                    // borderRadius={10}
                                />

                                <HStack
                                    justifyContent="space-between"
                                    w="100%"
                                    bg="transparent"
                                    bgColor="transparent"
                                    // padding={2}
                                    position="absolute"
                                    top={2}
                                    px={2}
                                    zIndex={1}
                                >
                                    <Avatar h={6} w={6} borderRadius="full" bg="gray.400" />
                                    <Status name={is_new} />
                                </HStack>
                            </Box>
                        </VStack>

                        <VStack px={2} justifyContent={'flex-start'}>

                        <Text mt={1} fontWeight="thin" fontSize='sm' color='gray.500' textAlign='left'>{name}</Text> 
                        <Text mt={1} fontWeight="thin" fontSize='sm' color='gray.500' textAlign='left'>{description}</Text> 

                        <HStack 
                            justifyContent="left" 
                            bgColor="transparent" 
                            spacing={1}
                        >
                            <Text  fontSize='xl' color='blue.500' textAlign='left'>
                                R$ 
                            </Text> 

                            <Text   fontSize='xl' color='blue.500' textAlign='left'>
                                {price} 
                            </Text> 
                        </HStack> 

                        <Text fontWeight="thin" fontSize='sm' color='gray.500' textAlign='left'>
                            A vista no PIX ou dinheiro 
                        </Text> 

                        <ButtonDefault
                            title="Buy right now"
                            size="total"
                            variant="base1"
                            onClick={(handleSignIn)}
                        />
                        </VStack>
                    </Stack>
                </Stack>
            {/* </Link> */}
        </MotionFlex>
              
    )
}

