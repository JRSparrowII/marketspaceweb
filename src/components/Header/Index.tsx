import {Flex, IconButton, useBreakpointValue, Icon, HStack, Text, Box} from '@chakra-ui/react'
import {Profile} from './Profile'
import {SearchBox} from './SearchBox'
import {Logo} from './Logos'
import {NotificationsNav} from './NotificationsNav'
import { useSidebarDrawer } from '../../context/SidebarDrawerContext'
import {RiMenuLine } from 'react-icons/ri'


export function Header(){

    const {onOpen} = useSidebarDrawer()

    const isWideVersion = useBreakpointValue({ //Na versao MOBO deixar somente a imagem do usuario
        base: false,
        lg: true,
    })

    return (
        <Flex 
            as="header" 
            w="100%" 
            maxWidth={1950} 
            h={80} 
            align="center"
            marginX="auto"
            // mt="4"
            px="50"
            bg="blue.100"
        >

            {!isWideVersion && (
               <IconButton 
                    aria-label='Open Navigation'
                    icon={<Icon as={RiMenuLine}/>} 
                    fontSize="24" 
                    variant="unstyled" 
                    onClick={onOpen}
                    mr="2"
                >

                </IconButton>
            )}
           
            <Logo/>

            <Box ml={8} w="80%">
                { isWideVersion && <SearchBox/>}
            </Box>
            
            

            <Flex align="center" ml="auto"> 
                <NotificationsNav />
                <Profile showProfileData={isWideVersion}/>
            </Flex>
        </Flex>
    );
}