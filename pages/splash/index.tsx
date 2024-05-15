import ImageComponent from "../components/ImageComponent"
import PolytronLogo from "../../public/assets/polytron-icon.png";
import CircularProgressBarComponent from "../components/CircularProgressBarComponent";
import {Container, VStack, Flex, Box, Center, useToast} from '@chakra-ui/react'
import TextComponent from "../components/TextComponent";
import Image from "next/image";
import { Inter } from "next/font/google";
import {ButtonComponent} from "@/pages/components/ButtonComponent";
import {ToastComponent} from "@/pages/components/ToastComponent";

const inter = Inter({ subsets: ["latin"] });

import { useEffect } from 'react';
import {useRouter} from "next/router";
import {HeaderComponent} from "@/pages/components/HeaderComponent";


export default function Splash() {
    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);


    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            const timeout = setTimeout(() => {
                router.push('/login');
            }, 4000)
        } else {
            router.push('/dashboard');
        }

    },[router]);

    return (
        // <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
        <HeaderComponent>
            <Center>
                <Flex direction={["column", "row"]}>
                    <VStack direction={"column"} justifyContent={"space-between"}>
                        <Box>
                            <ImageComponent src={PolytronLogo} size={'xs'}></ImageComponent>
                        </Box>
                        <Box>
                            <TextComponent type={'b'} label={'ESD Monitoring Team'} size={'5xl'}></TextComponent>
                        </Box>
                        <Box height={200}></Box>
                        <Box>
                            <CircularProgressBarComponent></CircularProgressBarComponent>
                        </Box>
                        {/*<ButtonComponent title={'Check'} onClick={() => { ToastComponent('Test', 'TestDesc')}}></ButtonComponent>*/}
                    </VStack>
                </Flex>
            </Center>
        </HeaderComponent>

        // </main>
    );
}
