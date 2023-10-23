import { useState } from 'react';
import { Box, IconButton, VStack, Image } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';


export default function Gallery() {
    // const [selectedImageIndex] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const images = [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
        'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
        'https://images.unsplash.com/photo-1513116476489-7635e79feb27?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D'
    ]

    const handleImageChange = (index) => {
        setSelectedImageIndex(index);
    };

    return (
        <Box w='100%' h='550px'>
            <Carousel selectedItem={selectedImageIndex} showArrows={true}>
                {images.map((image, index) => (
                    <Box key={index} h='450px' w='100%' justifyContent='center' alignItems='center'>
                        <img src={image} alt={`Imagem ${index}`} />
                    </Box>
                ))}
            </Carousel>
            <style>
                {`
                    .thumbs-wrapper {
                        display: flex;
                        justify-content: center; /* Centraliza horizontalmente as miniaturas */
                    }
                `}
            </style>
        </Box>

        // <Box w='100%' h='550px' display='flex'>            
        //     <VStack w='100px' justifyContent={'center'} alignItems={'center'}>
        //         {images.map((image, index) => (
        //             <IconButton
        //                 key={index}
        //                 bg={'blue'}
        //                 aria-label={`Thumbnail ${index}`}
        //                 icon={ 
        //                     <Image 
        //                         src={image} 
        //                         alt={`Imagem ${index}`} 
        //                         h='100%' 
        //                         w='100%' 
        //                         objectFit='contain' 
        //                     />
        //                 }
        //                 variant={index === selectedImageIndex ? 'solid' : 'outline'}
        //                 onClick={() => handleImageChange(index)}
        //             />
        //         ))}
        //     </VStack>
        //     <Box flex='1'>
        //         <Image 
        //             src={images[selectedImageIndex]} 
        //             alt={`Imagem ${selectedImageIndex}`} 
        //             h='100%' w='100%' objectFit='cover' 
        //         />
        //     </Box>
        // </Box>
    )
};