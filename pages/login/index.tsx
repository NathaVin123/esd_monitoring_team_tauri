import { useEffect, useState } from "react";
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
import { CustomCircularProgressBar } from "@/pages/components/mui/CustomProgressBar";

import Link from 'next/link';

export function Login() {
    const router = useRouter();

    const [toastOpen, setToastOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [nik, setNik] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [severity, setSeverity] = useState<AlertColor>('info');

    const [message, setMessage] = useState<string>('');

    const [result, setResult] = useState<any>();

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    useEffect(() => {
        validateInput(nik, password);
    }, [nik, password]);

    const validateInput = (nik: string, password: string) => {
        if (!nik.trim() || !password.trim()) {
            setSeverity('warning');
            setMessage('Both fields are required');
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
        if (success === false) {
            setSeverity('warning');
            setMessage(message);
        } else if (success === true) {
            setSeverity('success');
            setMessage(message);
            router.replace('/dashboard');
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

            console.log(response.data.data.token);
            console.log(response.data.success);

            if (response.data.success) {
                localStorage.setItem('token', response.data.data.token);
            }

            return [response.data.success, response.data.message];
        } catch (error) {
            console.error("Error fetching data:", error);
            return [false, JSON.stringify(error)];
        }
    };

    return (
        <CustomContainerCenter>
            <CustomTypography size={'XL'}>
                Log In
            </CustomTypography>
            <CustomSpacer height={Constants(4)} />
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
                <CustomButton disabled={isLoading} type="submit" variant="contained" color="primary" fullWidth onClick={submitLogin}>
                    {isLoading ? (<CustomCircularProgressBar color={'inherit'} />) : 'Submit'}
                </CustomButton>

                <CustomToast open={toastOpen} onClose={handleCloseToast} message={message} severity={severity} />

                <CustomSpacer height={Constants(1)} />

                <Box textAlign={'center'}>
                    <Link href="/register" passHref>
                        Don&apos;t have an account? <MuiLink underline="hover" onClick={() => { router.push('/register') }}> Register here</MuiLink>
                    </Link>
                </Box>
            </Box>
        </CustomContainerCenter>
    );
}

export default Login;
