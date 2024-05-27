import ImageComponent from "../components/chakra-ui/ImageComponent"
import PolytronLogo from "../../public/assets/polytron-icon.png";
import CircularProgressBarComponent from "../components/chakra-ui/CircularProgressBarComponent";
// import {Container, VStack, Flex, Box, Center, useToast, Input, Divider, Text, Link, InputGroup, InputRightElement, Button} from '@chakra-ui/react'
import TextComponent from "../components/chakra-ui/TextComponent";
import Image from "next/image";
import { Inter } from "next/font/google";
import {ButtonComponent} from "@/pages/components/chakra-ui/ButtonComponent";
import {ToastComponent} from "@/pages/components/chakra-ui/ToastComponent";

import {fetchLoginData} from '../api/api';

import type { NextRequest, NextResponse } from "next/server";

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

import {useEffect, useState} from "react";
import sendConsoleLog from "@/utils/sendConsoleLog";
import {useRouter} from "next/router";
import {HeaderComponent} from "@/pages/components/chakra-ui/HeaderComponent";
import NavbarComponent from "@/pages/components/chakra-ui/NavbarComponent";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";
import CustomContainer, {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomTextField from "@/pages/components/mui/CustomTextField";
import CustomButton from "@/pages/components/mui/CustomButton";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {Box, Link as MuiLink} from "@mui/material";
import CustomToast from "@/pages/components/mui/CustomToast";
import {CustomCircularProgressBar} from "@/pages/components/mui/CustomProgressBar";

import Link from 'next/link'; // Import Link component

const inter = Inter({ subsets: ["latin"] });

export function Login() {
    const router = useRouter();

    const [toastOpen, setToastOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [nik, setNik] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [severity, setSeverity] = useState<any>('');

    const [message, setMessage] = useState<string>('');

    const [result, setResult] = useState<any>();

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    useEffect(() => {

    },[nik, password]);

    const submitLogin = async () => {
        doFetchLoginData().then(([success, message]) => {
            if(success === true) {
                setSeverity('warning');
                setMessage(message);
            } else if(success === false) {
                setSeverity('success');
                setMessage(message);
            } else {
                setSeverity('error');
                setMessage('Something Wrong!');
            }
            setToastOpen(true);
            setIsLoading(false);
        })
    }


    const doFetchLoginData = async () => {
        const routeAPI = '/api/auth/loginUser';

      try {
          console.log(`${URLAPI}${routeAPI}`);
          const formData = {
              nik: nik,
              password: password,
        };

        const response = await axios.post(`${URLAPI}${routeAPI}`, formData);

        console.log(response.data);

        return [response.data.success, response.data.message];

      } catch (error) {
        console.error("Error fetching data:", error);
        return [JSON.stringify(error), "false"];
      }
    };

    return (
        <CustomContainerCenter>
            <CustomTypography size={'XL'}>
                Log In
            </CustomTypography>
            <CustomSpacer height={Constants(4)}></CustomSpacer>
            <Box>
                <CustomTextField
                    label="NIK"
                    type="text"
                    required
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <CustomTextField
                    label="Password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <CustomButton disabled={isLoading} type="submit" variant="contained" color="primary" fullWidth onClick={() => {
                    submitLogin().then(() => {
                        console.log('Submit Button Clicked!')
                        setIsLoading(true);
                    })}
                }>
                    {isLoading ? (<CustomCircularProgressBar color={'inherit'}></CustomCircularProgressBar>): 'Submit'}
                </CustomButton>

                <CustomToast open={toastOpen} onClose={handleCloseToast} message={message} severity={severity}></CustomToast>

                <CustomSpacer height={Constants(1)}></CustomSpacer>

                <Box textAlign={'center'}>
                    <Link href="/register" passHref>
                        Don't have an account? <MuiLink underline="hover" onClick={() => {router.push('/register')}}> Register here</MuiLink>
                    </Link>
                </Box>
            </Box>

        </CustomContainerCenter>
    );
}

export default Login;
