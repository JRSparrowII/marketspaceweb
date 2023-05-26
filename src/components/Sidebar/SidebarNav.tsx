import { Stack, Box, useBreakpointValue } from '@chakra-ui/react'
import { RiDashboardLine, RiArticleLine, RiFileList3Line, RiEdit2Line, RiBankLine, RiAddCircleLine, RiBankCardLine, RiLogoutBoxRLine, RiNumbersLine, RiLogoutBoxLine } from 'react-icons/ri'
import { NavSection } from './NavSection'
import { NavLink } from './NavLink'

export function SidebarNav(){    

    return(
        <Stack spacing="12" align="flex-start">

            <NavSection title='LANÇAMENTOS'>
                <NavLink icon={RiAddCircleLine} href="/newannouncement">Novo Anúncio</NavLink>
                <NavLink icon={RiFileList3Line} href="/home">Home</NavLink>  
                <NavLink icon={RiEdit2Line} href="/myannouncement">Meus Anúncios</NavLink>                                              
            </NavSection>

            {/* <NavSection title='RELATÓRIOS'>                                        
                <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
                <NavLink icon={RiNumbersLine} href="/othersreports">Outros Relatórios</NavLink>
                <NavLink icon={RiBankLine} href="/bankinganalysis">Análise Bancária</NavLink>   
                <NavLink icon={RiArticleLine} href="/resultofperiod">Resultado do Periodo</NavLink>                  
            </NavSection> */}
            
            {/* <NavSection title='ACOMPANHAMENTOS'>
                <NavLink icon={RiBankCardLine} href="/creditcards">Cartão de Créditos</NavLink>
                <NavLink icon={RiLogoutBoxLine} href="/billstoreceive">Contas a Receber</NavLink>   
                <NavLink icon={RiLogoutBoxRLine} href="/billstopay">Contas a Pagar</NavLink>                  
            </NavSection> */}
            
        </Stack>
    );
}



