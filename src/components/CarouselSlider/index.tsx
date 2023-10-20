import { Box, Flex, Image } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


type Props = {
  images?: string[]
  size?: string
}

const CarouselSlider = ({ images = [] }: Props) => {
  return (

    <Flex
      direction="column"
      // mb={8}
      justifyContent="center"
    // borderRadius={8}
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
                <Image 
                  src={image}
                  objectFit={'fill'}
                  height={"400px"} 
                  borderRadius={0} />
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