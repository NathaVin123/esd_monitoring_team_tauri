import ImageComponent from "../components/chakra-ui/ImageComponent"
import PolytronLogo from "../../public/assets/polytron-icon.png";
// import CircularProgressBarComponent from "../components/chakra-ui/CircularProgressBarComponent";
import {Container, VStack, Flex, Box, Center, useToast} from '@chakra-ui/react'
import TextComponent from "../components/chakra-ui/TextComponent";
import Image from "next/image";
import { Inter } from "next/font/google";
// import {ButtonComponent} from "@/pages/components/chakra-ui/ButtonComponent";
// import {ToastComponent} from "@/pages/components/chakra-ui/ToastComponent";

const inter = Inter({ subsets: ["latin"] });

import {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {HeaderComponent} from "@/pages/components/chakra-ui/HeaderComponent";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomContainer, {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import CustomImage from "@/pages/components/mui/CustomImage";
import {CustomLinearProgessBar, CustomCircularProgressBar} from "@/pages/components/mui/CustomProgressBar";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import CustomButton from "@/pages/components/mui/CustomButton";
import CustomToast from "@/pages/components/mui/CustomToast";

export default function Splash() {
    // const toast = useToast();
    const router = useRouter();

    const [toastOpen, setToastOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleShowToast = () => {
        // setToastOpen(true);

        // router.push('/login');
        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            // setToastOpen(true);
            // setLoading(false);

            router.replace('/login').then(r => {}); // Uncomment if you want to navigate to login after showing the toast
        }, 4000);
    };

    const handleCloseToast = () => {
        setToastOpen(false);
    };
    //
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         router.push('/login');
    //     }
    // }, [router]);


    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //
    //     if (!token) {
    //         const timeout = setTimeout(() => {
    //             router.push('/login');
    //         }, 4000)
    //     } else {
    //         router.push('/dashboard');
    //     }
    //
    // },[router]);

    return (
        <CustomContainerCenter>
            {/*<Box*/}
            {/*    sx={{*/}
            {/*        display: 'flex',*/}
            {/*        flexDirection: 'column',*/}
            {/*        justifyContent: 'center',*/}
            {/*        alignItems: 'center',*/}
            {/*        height: '100vh'*/}
            {/*    }}*/}
            {/*>*/}
                <CustomImage path={PolytronLogo} />
                <CustomTypography size={"L"} bold>ESD Monitoring Team</CustomTypography>
                <CustomSpacer height={Constants(2)}></CustomSpacer>
                {/*<CustomCircularProgressBar></CustomCircularProgressBar>*/}
                <CustomLinearProgessBar></CustomLinearProgessBar>

                <CustomSpacer height={Constants(2)}></CustomSpacer>

                {/*<CustomButton type={'submit'} variant={"contained"} onClick={handleShowToast}>Next</CustomButton>*/}

            <Box position="relative">
                <CustomButton type={'submit'} variant={"contained"} onClick={handleShowToast} disabled={loading} fullWidth>
                    {loading ? <CustomCircularProgressBar></CustomCircularProgressBar> : "Next"}
                </CustomButton>
            </Box>

            <CustomToast
                open={toastOpen}
                onClose={handleCloseToast}
                message="To Login"
                severity="success"
            />
            {/*</Box>*/}
        </CustomContainerCenter>

    );
}
