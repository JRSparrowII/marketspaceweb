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
      // mt={10}
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
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
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
              'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
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
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit={'cover'}
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