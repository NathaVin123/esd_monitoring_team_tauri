import {useCallback, useEffect, useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { URLAPI } from "@/pages/api/env";
import CustomContainer, { CustomContainerCenter } from "@/pages/components/mui/CustomContainer";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomTextField from "@/pages/components/mui/CustomTextField";
import CustomButton from "@/pages/components/mui/CustomButton";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {AlertColor, Box, Link as MuiLink} from "@mui/material";
import CustomToast from "@/pages/components/mui/CustomToast";
import {CustomCircularProgressBar, CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";

import Link from 'next/link';
import CustomImage from "@/pages/components/mui/CustomImage";

import PolytronIcon from '../../public/assets/polytron-icon.png';

export function Login() {
    const router = useRouter();

    const [toastOpen, setToastOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [nik, setNik] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [severity, setSeverity] = useState<AlertColor>('info');

    const [message, setMessage] = useState<string>('');

    const [result, setResult] = useState<any>();

    const [errors, setErrors] = useState({ nik: false, password: false });

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    const handleNikError = useCallback((hasError : any) => {
        setErrors((prev) => ({ ...prev, nik: hasError }));
    }, []);

    const handlePasswordError = useCallback((hasError : any) => {
        setErrors((prev) => ({ ...prev, password: hasError }));
    }, []);

    const handleNIK = (e: any) => {
        const value = e.target.value;

        if (/^\d*$/.test(value)) {
            setNik(value);
        }
    }

    const handlePassword = (e: any) => {
        const value = e.target.value;

        setPassword(value);
    }

    useEffect(() => {
    }, [nik, password]);

    const validateInput = (nik: string, password: string) => {
        if (!nik.trim()) {
            setSeverity('warning');
            setMessage('Nik are required !');
            setToastOpen(true);
            return false;
        }

        if (!password.trim()) {
            setSeverity('warning');
            setMessage('Password are required !');
            setToastOpen(true);
            return false;
        }

        if(password.trim().length < 8) {
            setSeverity('warning');
            setMessage('Password must be at least 8 characters long !');
            setToastOpen(true);
            return false;
        }

        return true;
    };

    const submitLogin = async () => {
        if (!validateInput(nik, password)) {
            return;
        }
        setIsLoading(true);
        const [success, message] = await doFetchLoginData();
        if (!success) {
            setSeverity('warning');
            setMessage(message);
        } else if (success) {
            setSeverity('success');
            setMessage(message);
            setTimeout(() => {
                router.replace({
                    pathname: '/dashboard',
                    query: { nik }
                });

                localStorage.setItem('nikUser', nik);
            }, 2000);

        } else {
            setSeverity('error');
            setMessage('Something went wrong!');
        }
        setToastOpen(true);
        setIsLoading(false);
    };

    const doFetchLoginData = async (): Promise<[boolean, string]> => {
        const routeAPI = '/api/auth/loginUser';

        try {
            console.log(`${URLAPI}${routeAPI}`);
            const formData = {
                nik: nik,
                password: password,
            };

            const response = await axios.post(`${URLAPI}${routeAPI}`, formData);

            if (response.data.success) {
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('nikUser', response.data.data.nik);
            }

            return [response.data.success, response.data.message];
        } catch (error) {
            console.log("Error fetching data:", error);
            return [false, JSON.stringify(error)];
        }
    };

    return (
        <>
            <CustomContainerCenter>
                <CustomImage path={PolytronIcon}></CustomImage>
                <CustomTypography bold size={'XL'}>
                    ESD Monitoring Team
                </CustomTypography>
                <CustomSpacer height={Constants(4)} />
                <CustomTypography size={'L'}>
                    Log In
                </CustomTypography>
                <CustomSpacer height={Constants(4)} />
                <Box>
                    <CustomTextField
                        label="NIK"
                        type="text"
                        value={nik}
                        onChange={(e) => handleNIK(e)}
                        onError={handleNikError}
                        sx={{ mb: 2 }}
                    />
                    <CustomTextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => handlePassword(e)}
                        onError={handlePasswordError}
                        sx={{ mb: 2 }}
                    />
                    <CustomButton disabled={isLoading} type="submit" variant="contained" color="primary" fullWidth onClick={submitLogin}>
                        Submit
                    </CustomButton>


                    <CustomSpacer height={Constants(1)} />

                    <Box textAlign={'center'}>
                        <Link href="/register" passHref>
                            Don&apos;t have an account? <MuiLink underline="hover" onClick={() => { router.push('/register') }}> Register here</MuiLink>
                        </Link>
                    </Box>
                </Box>
            </CustomContainerCenter>
            <CustomToast open={toastOpen} onClose={handleCloseToast} message={message} severity={severity} />
            {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (<></>)}
        </>
    );
}

export default Login;
