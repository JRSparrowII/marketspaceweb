import { Text, HStack, VStack, Image, Avatar, Box, Button} from '@chakra-ui/react';
import { useState } from 'react';

import BackgroundImg from '@assets/produto_1.png';
import { Status } from './Status';
import { ProductDTO } from '../dtos/ProductDTO'
// import { baseURL } from "@services/api"

// type Props = TouchableOpacityProps & {
//     data: ProductDTO;
//   };

export function Product({onPress, product_images, is_new, is_active, user, name, price, ...rest}: ProductDTO){

    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');
    const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);

    return(
                 
        // <VStack
        //     w={'100%'}
        //     h={'100%'}
        //     // px={2}
        //     backgroundColor="gray.200"
        //     borderRadius={5}
        // >        
        //     <Button
        //         bgColor="blue.500"
        //         w={'100%'}
        //         h={'100%'}
        //     >                                 
        //         <VStack>
        //             <Image
        //                 w='100%'
        //                 h='100%' 
        //                 source={{ uri: 'https://picsum.photos/200/300' }}                      
        //                 // source={ userPhoto }
        //                 alt={name}                   
        //             />
        //         </VStack>

        //         <HStack 
        //             justifyContent="space-between" 
        //             w="100%"
        //             bg='red'
        //             // bgColor="transparent"  
        //             padding={2}
        //             // top={-120}
        //         >                                               
        //             <Avatar h={6} w={6} borderRadius="full" bg="gray.100" 
        //                 // source={{ uri: baseURL() + '/images/'+ user.avatar }}
        //             />                    
        //             <Status name={is_new} />
        //         </HStack>                       
                
        //     </Button>

        //     <Text mt={2} fontSize='sm' color='gray.500' textAlign='left'>Tenis Vermelho da praia</Text> 

        //     <HStack 
        //         justifyContent="flex-start" 
        //         bgColor="transparent" 
        //         // space={1}
        //     >
        //         <Text fontWeight="bold" fontSize='sm' color='gray.500' textAlign='left'>
        //             R$ 
        //         </Text> 

        //         <Text fontWeight="bold" fontSize='sm' color='gray.500' textAlign='left'>
        //             256,00 
        //         </Text>                
        //     </HStack> 
                
        // </VStack> 

        <Box bg='white' w="100%" h="50%">
            <Box bg='blue' w="100%" h="70%">
                <HStack 
                    justifyContent="space-between" 
                    w="100%"
                    bg='transparent'
                    // bgColor="transparent"  
                    padding={2}
                    // top={-120}
                >                                               
                    <Avatar h={6} w={6} borderRadius="full" bg="gray.100" 
                        // source={{ uri: baseURL() + '/images/'+ user.avatar }}
                    />                    
                    <Status name={is_new} />
                </HStack>  
            </Box>
            <Text mt={2} fontSize='sm' color='gray.500' textAlign='left'>Tenis Vermelho da praia</Text> 

            <HStack 
                justifyContent="flex-start" 
                bgColor="transparent" 
                // space={1}
            >
                <Text fontWeight="bold" fontSize='sm' color='gray.500' textAlign='left'>
                    R$ 
                </Text> 

                <Text fontWeight="bold" fontSize='sm' color='gray.500' textAlign='left'>
                    256,00 
                </Text>                
            </HStack> 
        </Box>
              
    )
}

