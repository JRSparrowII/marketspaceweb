import { Box, SimpleGrid, Spacer, Text, Image } from "@chakra-ui/react";

export default function InfoCard() {
  return (
    <SimpleGrid
      columns={{ sm: 2, md: 3 }}
      spacing="4"
      minChildWidth="380px"
      maxWidth={1480}
      width="100%"
      h='auto'
      // bg={'red'}
      mt={5}
      gap={5}
      justifyContent={'center'}
      alignItems={'center'}
      px={'auto'}
      spacingX={5}
      bg={'white'}
    >
      <Box h={'250px'} w={'480px'} bg={'white'}>
        <Image
          h={'200px'}
          w={'full'}
          src={
            'https://plus.unsplash.com/premium_photo-1661301082075-c78960f2b979?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fENBUkQlMjBDUkVESVR8ZW58MHx8MHx8fDA%3D'
          }
          objectFit={'cover'}
        // borderRadius={10}
        />
        <Text px={2} textAlign={'left'} fontWeight={'bold'} color="blue.500" fontSize="sm" mt={1} mb={1}>
          Get now your Marketspace card
        </Text>
        <Text px={2} textAlign={'left'} fontWeight={'thin'} color="blue.500" fontSize="sm" mt={1} mb={3}>
          A unique experience for your shopes
        </Text>
      </Box>
      <Spacer>
        <Box h={'250px'} w={'480px'} bg={'white'}>
          <Image
            h={'200px'}
            w={'full'}
            src={
              'https://plus.unsplash.com/premium_photo-1681760172394-1c13fc445fd4?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjE3fHxDQVJEJTIwQ1JFRElUfGVufDB8fDB8fHww'
            }
            objectFit={'cover'}
          // borderRadius={10}
          />
          <Text px={2} textAlign={'left'} fontWeight={'bold'} color="blue.500" fontSize="sm" mt={1} mb={1}>
            Download now Marketspace on your mobile device
          </Text>
          <Text px={2} textAlign={'left'} fontWeight={'thin'} color="blue.500" fontSize="sm" mt={1} mb={3}>
            And enjoy our oportinities
          </Text>
        </Box>
      </Spacer>
      <Box h={'250px'} w={'480px'} bg={'white'}>
        <Image
          h={'200px'}
          w={'full'}
          src={
            'https://plus.unsplash.com/premium_photo-1661779007328-ee926ba0b3dd?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fENBUkQlMjBDUkVESVR8ZW58MHx8MHx8fDA%3D'
          }
          objectFit={'fill'}
        // borderRadius={10}
        />
        <Text textAlign={'left'} fontWeight={'bold'} color="blue.500" fontSize="sm" mt={1} mb={1}>
          Be a partner business
        </Text>
        <Text textAlign={'left'} fontWeight={'thin'} color="blue.500" fontSize="sm" mt={1} mb={3}>
          like a thousand people
        </Text>
      </Box>

    </SimpleGrid>
  )
}