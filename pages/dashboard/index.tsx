import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { CustomContainer, CustomContainerCenter } from "@/pages/components/mui/CustomContainer";
import { URLAPI } from "@/pages/api/env";
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CustomCircularProgressBar from "@/pages/components/mui/CustomProgressBar";
import CustomButton from "@/pages/components/mui/CustomButton";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Contants from "@/pages/components/mui/value/contants";
import CustomSideBar from "@/pages/components/mui/CustomSideBar";
import { Box } from "@mui/material";

export default function Dashboard() {

    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    const doGetUser = async () => {
        setLoading(true);
        console.log('Run API Get User With Role');

        const routeAPI = '/api/user/getUserWithRole';

        const nikUser = localStorage.getItem('nikUser');

        console.log(nikUser);

        try {
            const formData = {
                nik: '001',
            }

            console.log(formData);

            const response = await axios.post(`${URLAPI}${routeAPI}`, formData);

            setName(response.data.data.full_name);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            return [JSON.stringify(error), 'false']
        }
    }

    useEffect(() => {
        doGetUser().then(r => {
            console.log('Get User Done')
        })
    }, [name]);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nikUser');
        router.push('/login');
    };

    const handleDrawerClose = () => {
        setSidebarOpen(false);
    };

    return (
        <>
            <CustomSideBar open={sidebarOpen} handleDrawerClose={handleDrawerClose}></CustomSideBar>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    marginLeft: sidebarOpen ? '240px' : '0px', // Adjust this value based on your sidebar width
                    transition: 'margin 0.3s',
                    overflow: 'auto',
                }}
            >
                <CustomContainer>
                    <CustomSpacer height={Contants(10)}></CustomSpacer>
                    <CustomTypography size={'M'}>
                        Admin Center
                    </CustomTypography>
                    <Box style={{ justifyContent: 'flex-end', alignItems: 'center'}}>
                        <CustomTypography>
                            Welcome Back, {name}
                        </CustomTypography>
                        <CustomSpacer width={Contants(2)}></CustomSpacer>
                        <CustomButton
                            size='small'
                            variant="contained"
                            color="secondary"
                            startIcon={<ExitToAppIcon />}
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </CustomButton>
                    </Box>
                    {loading ? (<CustomCircularProgressBar></CustomCircularProgressBar>) : (
                        <>
                            <CustomTypography>
                                Tes
                            </CustomTypography>
                        </>
                    )}
                </CustomContainer>
            </Box>
        </>
    );
}
