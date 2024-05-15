import ImageComponent from "../components/ImageComponent"
import PolytronLogo from "../../public/assets/polytron-icon.png";
import CircularProgressBarComponent from "../components/CircularProgressBarComponent";
import {Container, VStack, Flex, Box, Center, useToast, Input} from '@chakra-ui/react'
import TextComponent from "../components/TextComponent";
import Image from "next/image";
import { Inter } from "next/font/google";
import {ButtonComponent} from "@/pages/components/ButtonComponent";
import {ToastComponent} from "@/pages/components/ToastComponent";

import { PORT, URL_DEV_LOCAL } from '../api/env';

import {useEffect, useState} from "react";
import sendConsoleLog from "@/utils/sendConsoleLog";
import {useRouter} from "next/router";
import SideMenuComponent from "@/pages/components/SideMenuComponent";
import LayoutComponent from "@/pages/components/LayoutComponent";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {

    const router = useRouter();

    const { nik } = router.query;

    const BASE_URL = `http://localhost:3001`;

    // const {token, setToken} = useState(null);

    const fetchToken = async () => {
        const routeAPI = '/api/auth/getToken';
        try {
            const response = await axios.get(`${BASE_URL}${routeAPI}`);

            console.log(response.data);
            // setToken(response.data);
        } catch (error) {
            console.error('Error fetching protected data', error);
            // router.push('/login');
        }
    }

    useEffect(() => {
        fetchToken().then(() => {});
    },[]);

    const doFetchLoginData = async () => {
        console.log('Do fetch login data');
        const routeAPI = '/api/auth/loginUser';
        try {
            const formData = {
                nik: nik,
            };

            const response = await axios.post(`http://${URL_DEV_LOCAL}:${PORT}/api/auth/loginUser`, formData);

            console.log(response);

            // return [response.data.message, response.data.success];
        } catch (error) {
            console.error('Error fetching data:', error);
            return [JSON.stringify(error), 'false']
        }
    };

    const doGetUser = async () => {
        console.log('Run API Get User With Role');

        const routeAPI = '/api/auth/getUserWithRole';

        try {
            const formData = {
                nik: nik,
            }

            const response = await axios.post(`${BASE_URL}${routeAPI}`)

            console.log(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            return [JSON.stringify(error), 'false']
        }
    }

    // const [nik, setNik] = useState<string>('');
    // const [password, setPassword] = useState('');
    //
    // const handleLogin = () => {
    //     console.log('login');
    // }

    return (
        <LayoutComponent>
            Welcome to ESD Monitoring Team, {nik}
        </LayoutComponent>
    );
}
