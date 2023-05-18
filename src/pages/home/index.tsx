import { Box, Flex, Heading, Icon, Divider, VStack, SimpleGrid, HStack, Text, Button, 
  InputGroup, InputRightElement, Input, useDisclosure,
  AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, useTheme,
  AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Checkbox, Stack, Tag} from "@chakra-ui/react";
// import { Header } from "../../components/Header/Index";
// import { SideBar } from "../../components/Sidebar/index";
// import { NewSearchBar } from "../../components/NewSearchBar/index";
import React from "react";
// import { Input } from "../../components/Form/Input";
import {RiAddLine, RiPencilLine, RiSearchLine, RiFilter2Line } from 'react-icons/ri'
import Link from 'next/link'
import { Header } from "../../components/Header/Index";
import { SideBar } from "../../components/Sidebar";
import { Product } from "../../components/Product";

export default function Home() {

  const { colors, sizes } = useTheme();
  
  return (

    <Flex direction="column" height="100vh"> 
      <Header/>   
      
      <Flex width="100%" my="6" maxWidth={1250} mx="auto" px="6">
        <SideBar /> 
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" bg='gray.100'> 
          <Flex direction="column" >
            <Text color="gray.500" fontSize="md">Seus produtos anunciados para venda</Text>
            <Box
              bg="blue.100" 
              mt={5}          
              rounded={5}   
              h={20} 
              w="100%"                         
            >             
              <HStack justifyContent="space-between" alignItems="center" padding={3}>                
                <HStack 
                  justifyContent="space-between" 
                  alignItems="center"   
                  // bg="red"                                             
                >
                  <Tag color={colors.blue[700]} size={sizes[10]} />

                  <VStack ml={4}>
                    <Text 
                      color="gray.600" 
                      fontFamily={'heading'} 
                      fontSize="md" 
                      fontWeight="bold" 
                      lineHeight={'md'}
                      textAlign="left"
                    >
                      4
                      {/* {products.length} */}
                    </Text>  
                    <Text color="black" fontSize="md">anúncios ativos</Text> 
                  </VStack>
                </HStack>

                <Button bg="blue.100">
                  <HStack 
                    justifyContent="space-between" 
                    alignItems="center" 
                    // space={1}                      
                  >
                    <Text 
                      color="blue.500" 
                      fontFamily={'heading'} 
                      fontWeight="bold" 
                      fontSize="md"
                      
                    >
                      Meus anúncios 
                    </Text>
                    {/* <ArrowRight color={colors.blue[500]} size={sizes[5]}/> */}
                  </HStack>   
                </Button>                                                
              </HStack>                    
            </Box>

            <Text color="gray.500" mt={8} mb={4}>
                Compre produtos variados
            </Text>

            <InputGroup>
              <Input 
                color="gray.700"
                variant="filled" 
                borderColor="blue.100"
                // borderBottom="2px solid"
                placeholder='Digite sua pesquisa'
                _placeholder={{color: 'gray.400'}}
                fontSize="sm"                                                    
                type="text" 
                // value={filterNameInput} 
                // onChange={handleSearchByNameCompany}
              />       

              <InputRightElement 
                // onClick={handleSearch}
                cursor="pointer"
              >
                {/* {isLoading ? (
                    <Spinner size="sm" />
                ) : ( */}
                    <RiSearchLine color="blue.200"/>
                    <RiSearchLine color="blue.200"/>
                {/* )} */}
              </InputRightElement>
            </InputGroup>

            <SimpleGrid 
              columns={{ sm: 1, md: 2 }} 
              spacing="4"
              // minChildWidth="380px"
              width="100%"
              h='500px'
              mb={10}
              mt={10}
              bg="red.500"
            >
              <Product
                // product_images='eeeeeee'
                name={'Carlos'}
                price={999}
                user={'item.user'}
                is_active={true}
                onPress={() => handleProductDetails(item.id)} 
              />

            </SimpleGrid>
          </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
  


