import { Box, Button, Center, FormControl, HStack, Input, InputGroup, SimpleGrid, Text } from "@chakra-ui/react";
import { ButtonDefault } from "../Button";

export default function RegisterEmail() {

  function handleSignIn() {

  }
  return (
    <Center>
      <SimpleGrid
      columns={[1, 4]}
      spacing={4}
      width="100%"
      maxWidth={1480} 
      mt={5}
    >
      <Text fontSize="md" mt={2} fontWeight={'bold'}>
        Do you want to receive wounderful offers? Sign In
      </Text>
      <Input placeholder="your name" />
      <Input placeholder="your email" />
      <Button colorScheme="blackAlpha">
        Get Notifications
      </Button>
    </SimpleGrid>
    </Center>
  )
}
