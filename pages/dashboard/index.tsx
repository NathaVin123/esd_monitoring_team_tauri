import ImageComponent from "../components/chakra-ui/ImageComponent"
import PolytronLogo from "../../public/assets/polytron-icon.png";
import CircularProgressBarComponent from "../components/chakra-ui/CircularProgressBarComponent";
import {Container, VStack, Flex, Box, Center, useToast, Input} from '@chakra-ui/react'
import TextComponent from "../components/chakra-ui/TextComponent";
import Image from "next/image";
import { Inter } from "next/font/google";
import {ButtonComponent} from "@/pages/components/chakra-ui/ButtonComponent";
import {ToastComponent} from "@/pages/components/chakra-ui/ToastComponent";

import {useEffect, useState} from "react";
import sendConsoleLog from "@/utils/sendConsoleLog";
import {useRouter} from "next/router";
import SideMenuComponent from "@/pages/components/chakra-ui/SideMenuComponent";
import LayoutComponent from "@/pages/components/chakra-ui/LayoutComponent";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";
import {concatAddressAPIRoute} from "@/utils/concatAddressAPIRoute";
import {consoleLogAddressAPI} from "@/utils/consoleLogAddressAPI";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {

    const router = useRouter();

    const { nik } = router.query;

    const [user, setUser] = useState<>([]);

    // const {token, setToken} = useState(null);

    const fetchToken = async () => {
        const routeAPI = '/api/auth/getToken';

        try {
            const response = await axios.get(`${URLAPI}${routeAPI}`);

            console.log(response.data);
            // setToken(response.data);
        } catch (error) {
            console.error('Error fetching protected data', error);
            // router.push('/login');
        }
    }

    const doGetUser = async () => {
        console.log('Run API Get User With Role');

        const routeAPI = '/api/auth/getUserWithRole';

        const addressAPI = concatAddressAPIRoute(URLAPI, routeAPI);

        await consoleLogAddressAPI('POST', addressAPI);

        try {
            const formData = {
                nik: nik,
            }

            console.log(formData);

            const response = await axios.post(addressAPI, [formData]);

            console.log(response.data);
            setUser(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            return [JSON.stringify(error), 'false']
        }
    }

    useEffect(() => {
        doGetUser().then(() => console.log(user));
        // fetchToken().then(() => {});
    },[]);

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
