'use client'
import { Box, Divider, Flex, HStack, Input, InputGroup, InputRightElement, Text, VStack, useBreakpointValue, useDisclosure, useTheme } from '@chakra-ui/react'
// import { SearchBox } from './SearchBox'
// import { Logo } from './Logo';

// import SocialMidia from './SocialMidia'
import Menu from '../Menu'
// import { SideBarMenu } from './Sidebar/SidebarMenu';
// import { DrawerProvider, useDrawerContext } from '../context/DrawerContext';
import { useEffect, useState } from 'react';
import { SearchBox } from '../Header/SearchBox';
import { Logo } from '../Header/Logos';
import { RiSearchLine, RiSoundModuleFill } from 'react-icons/ri';
import { ProductDTO } from "../../dtos/ProductDTO";
import { api } from "../../services/api";
import { AppError } from '../../utils/AppError';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationsNav } from '../Header/NotificationsNav';
import { Profile } from '../Header/Profile';
import { motion } from 'framer-motion';

export default function Header() {

  // const { openDrawer } = useDrawerContext();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const [filterNameInput, setFilterNameInput] = useState('');
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const { colors, sizes } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const Spacer = ({ children }) => (
    <Box flex="1" display="flex">
      {children}
    </Box>
  );

  const gradientBackground = 'linear-gradient(135deg, #00102c 0%, #00102c 50%,  #1a4971 60%, #225177 70%, #103153 90%)';

  function handleSearchByNameProduct(event: any) {
    setFilterNameInput(event.target.value);
  }

  async function handleFilterByName() {
    try {
      const response = await api.get(`/products?query=${filterNameInput}`)
      setProducts(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os filtros do produto';

      toast.error(title, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    // openDrawer();
  }, []);

  return (
    <Flex
      bg={gradientBackground}
      w="100%"
      h="200px"
      align="center"
      marginX="auto"
      px="6"
    >
      <VStack
        w="100%"
        h="200px"
      >
        <HStack alignItems="center" justifyContent="space-between" w="100%" h="10" mt={2} maxWidth={1480}>
          {isWideVersion ? (
            <>
              <Text color="gray.100" fontSize={"sm"}>Welcome to the marketspace store</Text>
              <HStack spacing={3}>
                <Text color="gray.100" fontSize={"sm"}>English</Text>
                <Text color="gray.100" fontSize={"sm"}>| US Dolar</Text>
                <Text color="gray.100" fontSize={"sm"}>| Track your orders</Text>
                <Text color="gray.100" fontSize={"sm"}>| Stores Loaction</Text>
              </HStack>
            </>
          ) : (
            <></>
            // <DrawerProvider>
            //   <SideBarMenu />
            // </DrawerProvider>
          )
          }
        </HStack>

        <HStack alignItems="center" display="flex" w="100%" h="20" mt={1} maxWidth={1480}>
          <Logo />
          <Spacer>
            <SearchBox />
          </Spacer>
          <Profile showProfileData={isWideVersion} />
        </HStack>

        <Box w="70%" mt={10}>
          <Divider borderColor="gray.400"></Divider>
        </Box>

        {isWideVersion && (
          <HStack alignItems="center" justifyContent="center">
            <Menu color='gray.100' />
          </HStack>
        )}

      </VStack>
    </Flex>
  )
}