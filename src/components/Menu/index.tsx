import { HStack } from '@chakra-ui/react';
import LinkMenu from '../LinkMenu';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';

type MenuProps = {
    color: string;
}

export default function Menu({color}: MenuProps){

    const router = useRouter();

    // const navigate = useNavigate();

    function handleClickGoHome() {
        router.push(`/home`);
    }

    function handleGoNewAnnouncement() {
        router.push(`/newannouncement`);
    };

    function handleGoMyAnnouncement() {
        router.push(`/myannouncement`);
    };

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
            <LinkMenu titleMenu='Home' fontColorLink={color} onClick={handleClickGoHome}/>
            <LinkMenu titleMenu='New annoucement' fontColorLink={color} onClick={handleGoNewAnnouncement}/>
            <LinkMenu titleMenu='Products for Sale' fontColorLink={color} onClick={handleClickGoListBoat}/>
            <LinkMenu titleMenu='My annoucement' fontColorLink={color} onClick={handleGoMyAnnouncement}/>
            <LinkMenu titleMenu='About us' fontColorLink={color} onClick={handleClickGoAboutUs}/>
        </HStack>
    )
}