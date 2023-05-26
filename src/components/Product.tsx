import { Text, HStack, VStack, Image, Avatar, Box, Button} from '@chakra-ui/react';
import { useState } from 'react';
import { Status } from './Status';
import { ProductDTO } from '../dtos/ProductDTO'
import { MotionFlex, animationFlex, itemAnimation } from '../styles/animation';
import { baseURL } from '../services/api';
// import { baseURL } from "@services/api"

// type Props = TouchableOpacityProps & {
//     data: ProductDTO;
//   };

export function Product({onClick, product_images, is_new, is_active, user, name, price, ...rest}: ProductDTO){

    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');
    const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);

    const MyComponent = () => {
        return (
            
        );
    };

    // export default MyComponent;


    return(
        <MotionFlex variants={animationFlex}>

       
        <Box bg='red' w="100%" h="50%" borderRadius={10}>
            <VStack>
                <Box position="relative" w="100%" h="100%">

                    <Image
                        h={'200px'}
                        w={'full'}
                        borderRadius={10}
                        // src={product_images[0] ? baseURL() + '/images/' + product_images[0].path : userPhoto}
                        src={product_images[0] ? baseURL() + '/images/' + product_images[0].path : userPhoto}
                        alt={name}
                        objectFit="cover"
                    />
                    
                    <Image
                        h={'200px'}
                        w={'full'}
                        src={
                            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                        }
                        objectFit={'cover'}
                        borderRadius={10}
                        // src={{ uri: (product_images[0]) 
                        //     ? baseURL()+ '/images/'+  product_images[0].path : userPhoto }}
                        // alt={name}
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
                        <Avatar h={6} w={6} borderRadius="full" bg="gray.400" />
                        <Status name={is_new} />
                    </HStack>
                </Box>
            </VStack>

            <Text mt={2} fontSize='sm' color='gray.500' textAlign='left'>{name}</Text> 

            <HStack 
                justifyContent="flex-start" 
                bgColor="transparent" 
                // space={1}
            >
                <Text fontWeight="bold" fontSize='sm' color='gray.500' textAlign='left'>
                    R$ 
                </Text> 

                <Text fontWeight="bold" fontSize='sm' color='gray.500' textAlign='left'>
                    {price} 
                </Text>                
            </HStack> 
        </Box>
        </MotionFlex>
              
    )
}

