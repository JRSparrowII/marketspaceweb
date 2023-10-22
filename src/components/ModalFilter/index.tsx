import {
  Box, Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text, Button,
  InputGroup, InputRightElement, Input, useDisclosure, Switch, Image,
  AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, useTheme,
  AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Checkbox, CheckboxGroup, Spacer, Stack, Center
} from "@chakra-ui/react";

export default function ModalFilter(){
  return(
    {/* 
            <AlertDialog
              motionPreset='slideInBottom'
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered                
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader color="gray.500">Filtrar anúncios</AlertDialogHeader>                            
                <AlertDialogCloseButton color="gray.700"/>

                <AlertDialogBody color="gray.500" fontWeight="bold">
                  <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={3}>
                    Condição
                  </Text>

                  <HStack mb={5}>
                    <Button
                      bg="gray.200" 
                      color={selectedButton === "novo" ? "blue.500" : "gray.400"}
                      border={selectedButton === "novo" ? "2px solid" : "0px solid"} 
                      _hover={{ backgroundColor: "gray.300" }}                                              
                      fontSize="sm" 
                      justifyContent="center"
                      alignItems="center"
                      borderRadius={20}
                      onClick={() => handleFilterEnabled()} 
                    >
                      Novo
                    </Button> 

                    <Button
                      bg="gray.200" 
                      color={selectedButton === "usado" ? "blue.500" : "gray.400"}
                      border={selectedButton === "usado" ? "2px solid" : "0px solid"}  
                      _hover={{ backgroundColor: "gray.300" }}                                            
                      fontSize="sm" 
                      justifyContent="center"
                      alignItems="center"
                      borderRadius={20}
                      onClick={() => handleFilterDisabled()} 
                    >
                      Usado
                    </Button> 
                  </HStack>    

                  <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={1}>
                    Aceita troca?
                  </Text>

                  <Switch
                    // isChecked={isBannerVisible}
                    // onChange={handleSwitchChange}
                    size="lg"
                    colorScheme="blue"
                    id='email-alerts'
                  />

                  <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={3} mt={5}>
                    Métodos de Pagamentos Aceitos:
                  </Text>

                  <CheckboxGroup 
                    colorScheme='blue' 
                    onChange={setPaymentMethods} 
                    value={paymentMethods} 
                    accessibilityLabel="choose numbers"
                  >
                    <VStack spacing={[1, 2]} direction={['column']} alignItems="left" justify="flex-start" mt={3}>
                      <Checkbox value='boleto' color="gray.500" size='sm'>Boleto</Checkbox>
                      <Checkbox value='pix'color="gray.500" size='sm'>Pix</Checkbox>
                      <Checkbox value='cash' color="gray.500" size='sm'>Dinheiro</Checkbox>
                      <Checkbox value='card' color="gray.500" size='sm'>Cartão Crédito</Checkbox>
                      <Checkbox value='deposit' color="gray.500" size='sm'>Depósito Bancário</Checkbox>
                    </VStack>
                  </CheckboxGroup>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <HStack justifyContent='space-between' w='100%'>
                    <Button 
                      bg='gray.200' 
                      // ref={cancelRef} 
                      onClick={onClose} 
                      w="48%"
                      fontSize='sm'
                      _hover={{ backgroundColor: "gray.300" }}
                    >
                      Resetar Filtros
                    </Button>

                    <Button 
                      bg='gray.700' 
                      color="gray.200" 
                      // ref={cancelRef} 
                      onClick={handleFilterProducts} 
                      w="48%"
                      fontSize='sm'
                      _hover={{ backgroundColor: "gray.400" }}
                    >
                      Aplicar Filtros
                    </Button>
                  </HStack>
                </AlertDialogFooter>

              </AlertDialogContent>
            </AlertDialog>  */}
  )
 }