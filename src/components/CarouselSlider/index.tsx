import { Box, Flex, Image } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


type Props = {
  images?: string[] 
}

const CarouselSlider = ({ images = []} : Props) => {
  return (
    
    <Flex
      direction="column"
      mb={8}
      justifyContent="center"
      borderRadius={8}
    >
      {images.length > 0 ? (
        <Carousel
            infiniteLoop
            autoPlay
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            width="100%"
            dynamicHeight={false}            
        >                
        {images.map((image) => {                 
          return (
            <Box>
                <Image src={image}
                height="300px" borderRadius={8}/>
            </Box>
          )
        })}   
        </Carousel>
    
    ) : (
      null
    )}
    </Flex>
  );
};

export default CarouselSlider;