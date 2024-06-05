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
    const [role, setRole] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const doGetUser = async () => {
        setLoading(true);

        const routeAPI = '/api/user/getUserWithRole';

        const nikUser = localStorage.getItem('nikUser');

        try {
            const formData = {
                nik: nikUser,
            }

            const response = await axios.post(`${URLAPI}${routeAPI}`, formData);

            setName(response.data.data.full_name ?? '-');
            setRole(response.data.data.role.role_name ?? '');
            console.log(role);
            // setRole('System Analyst');

            if(role === 'Admin') {
                await router.replace('/dashboard/admin');
            } else if(role === 'Developer') {
                await router.replace('/dashboard/developer');
            } else if(role === 'System Analyst') {
                await router.replace('/dashboard/system_analyst');
            } else {
                return 'Somothing wrong';
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            return [JSON.stringify(error), 'false']
        }
    }

    useEffect(() => {
        doGetUser().then(r => {
            setLoading(false);
        })
    }, [doGetUser]);

    // const handleSignOut = () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('nikUser');
    //     router.push('/login');
    // };
    //
    // const handleDrawerClose = () => {
    //     setSidebarOpen(false);
    // };

    return (
        <CustomContainerCenter>
            {loading ? (<CustomCircularProgressBar></CustomCircularProgressBar>) : (<></>)}
        </CustomContainerCenter>
    );
}
