import { Box, Center, SimpleGrid, Text } from "@chakra-ui/react";

interface Props {
  title: string;
}

export default function DividerTitle({title} : Props) {
  return (
    <Center>
      <SimpleGrid
        minChildWidth="380px"
        maxWidth={1480}
        width="100%"
        bg="blue.500"
        justifyContent="center"
        alignItems="center"
        mt={5}
      >
        <Box pt={2}>
          <Text color="gray.100" fontSize="lg" mb={3} fontFamily="body" textAlign="center" mt={1}>
            {title}
          </Text>
        </Box>
      </SimpleGrid>
    </Center>
  )
}