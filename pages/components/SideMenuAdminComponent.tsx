import {Box, VStack, Link, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {useState} from "react";

const SideMenuAdminComponent = () => {
    const router = useRouter();

    // const {activeMenu, setActiveMenu} = useState<boolean>(false);

    return (
        <Box bg="red.100" h="100vh" w="250px" p="4">
            <VStack spacing="4" align="stretch">
                <Link onClick={() => router.push('/dashboard')} color={router.pathname === '/dashboard' ? 'blue.500' : 'gray.600'}>
                    Home
                </Link>
                <Link onClick={() => router.push('/services')} color={router.pathname === '/services' ? 'blue.500' : 'gray.600'}>
                    User Master
                </Link>
                <Link onClick={() => router.push('/services')} color={router.pathname === '/services' ? 'blue.500' : 'gray.600'}>
                    Team Master
                </Link>
                <Link onClick={() => router.push('/contact')} color={router.pathname === '/contact' ? 'blue.500' : 'gray.600'}>
                    Role Master
                </Link>
                <Link onClick={() => router.push('/contact')} color={router.pathname === '/contact' ? 'blue.500' : 'gray.600'}>
                    Settings
                </Link>
                <Link onClick={() => router.push('/contact')} color={router.pathname === '/contact' ? 'blue.500' : 'gray.600'}>
                    About
                </Link>
            </VStack>
        </Box>
    );
};

export default SideMenuComponent;
