import PolytronLogo from "../../public/assets/polytron-icon.png";
import {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomContainer, { CustomContainerCenter } from "@/pages/components/mui/CustomContainer";
import CustomImage from "@/pages/components/mui/CustomImage";
import { CustomLinearProgessBar, CustomCircularProgressBar } from "@/pages/components/mui/CustomProgressBar";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import CustomButton from "@/pages/components/mui/CustomButton";
import CustomToast from "@/pages/components/mui/CustomToast";
import {AlertColor} from "@mui/material";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";
import {jwtDecode} from "jwt-decode";
import {router} from "next/client";

interface DecodedToken {
    exp: number;
}

export default function Splash() {

    const [toastOpen, setToastOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [state, setState] = useState<boolean>(false);

    // const doUseAuthRedirect = useAuthRedirect();

    const [isLoading, setIsLoading] = useState(false);

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    const [message, setMessage] = useState<string>('');

    const [severity, setSeverity] = useState<AlertColor>('info');

    const doCheckConnectivityToServer = async()  => {
        try {


        } catch (error) {
            console.log(error);
        }
    }

    const useAuthRedirect = async () => {
            try {
                const routeAPI: string = '/api/auth/checkConnectivity';

                console.log(URLAPI+routeAPI);
                await axios.get(URLAPI+routeAPI);

                const token = localStorage.getItem('token');

                if (!token) {
                    await router.replace('/login');
                    return;
                }

                const decodedToken = jwtDecode<DecodedToken>(token);

                const currentTime = Date.now() / 1000;

                console.log('Token Expiration Time:', decodedToken.exp);
                console.log('Current Time:', currentTime);

                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem('token');
                    router.replace('/login').then(r => {});
                    setState(false)
                    return false;
                } else {
                    router.replace('/dashboard').then(r => {});
                    setState(true);
                    return false;
                }
            } catch (error: any) {
                await router.replace({pathname: '/error', query: {message: error.message}});
                console.log(error);
                localStorage.removeItem('token');

                await router.replace({
                    pathname: "/error",
                    query: {
                        message: error.message,
                    },
                });
            }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        setIsLoading(true);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const doUseAuthRedirect = useAuthRedirect();

        setIsLoading(false);

    }, []);


    return (
        <CustomContainerCenter>
            <CustomImage path={PolytronLogo} />
            <CustomTypography size={"L"} bold>ESD Monitoring Team</CustomTypography>
            <CustomSpacer height={Constants(2)} />
            <CustomLinearProgessBar />
            <CustomSpacer height={Constants(2)} />
            <CustomToast open={toastOpen} onClose={handleCloseToast} message={message}></CustomToast>
        </CustomContainerCenter>

    );
}
