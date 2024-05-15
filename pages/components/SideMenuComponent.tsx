import {Box, VStack, Link, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {useState} from "react";

const SideMenuComponent = () => {
    const router = useRouter();

    // const {activeMenu, setActiveMenu} = useState<boolean>(false);

    return (
        <Box bg="red.100" h="100vh" w="250px" p="4">
            <VStack spacing="4" align="stretch">
                <Link onClick={() => router.push('/dashboard')} color={router.pathname === '/dashboard' ? 'blue.500' : 'gray.600'}>
                    Home
                </Link>
                <Accordion allowMultiple>
                    <AccordionItem>
                        {/*<h2>*/}
                            <AccordionButton>
                                <Box as='span' flex='1' textAlign='left'>
                                    Project
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        {/*</h2>*/}
                        <AccordionPanel pb={4}>
                            <VStack alignItems="flex-start" spacing="4" direction="column">
                                <Link onClick={() => router.push('/project-detail')} color={router.pathname === '/' ? 'blue.500' : 'gray.600'}>
                                    Project Detail
                                </Link>
                                <Link onClick={() => router.push('/task-history')} color={router.pathname === '/task-history' ? 'blue.500' : 'gray.600'}>
                                    Task List
                                </Link>
                                <Link onClick={() => router.push('/')} color={router.pathname === '/' ? 'blue.500' : 'gray.600'}>
                                    Task History
                                </Link>
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
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
