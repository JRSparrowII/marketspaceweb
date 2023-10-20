import { HStack } from '@chakra-ui/react';
import LinkMenu from '../LinkMenu';
import { useNavigate } from 'react-router-dom';

type MenuProps = {
    color: string;
}

export default function Menu({color}: MenuProps){

    // const navigate = useNavigate();

    function handleClickGoHome() {
        // navigate('/');
    }

    function handleClickGoListBoat() {
        // navigate('/listBoat');
    }

    function handleClickGoChoosePlan() {
        // navigate('/choosePlan');
    }

    function handleClickGoAboutUs() {
        // navigate('/aboutUs');
    }

    return(
        <HStack justifyContent={'center'} alignItems={'center'} gap={8}>       
            <LinkMenu titleMenu='New annoucement' fontColorLink={color} onClick={handleClickGoHome}/>
            <LinkMenu titleMenu='Products for Sale' fontColorLink={color} onClick={handleClickGoListBoat}/>
            <LinkMenu titleMenu='Sell my Boats' fontColorLink={color} onClick={handleClickGoChoosePlan}/>
            <LinkMenu titleMenu='About us' fontColorLink={color} onClick={handleClickGoAboutUs}/>
        </HStack>
    )
}