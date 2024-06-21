import React, {useEffect, useState} from "react";

import {useRouter} from "next/router";
import axios from "axios";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import {CustomContainer, CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import CustomButton from "@/pages/components/mui/CustomButton";

import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Contants from "@/pages/components/mui/value/contants";
import {URLAPI} from "@/pages/api/env";
import {Box} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

export function RegisterRole() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<string>('');

    const [role, setRole] = useState<string>('');

    // const handleRoleSelect = async (role: string) => {
    //     setSelectedRole(role);
    //
    //     router.push('/register/form')
    // };

    const doFetchRoleData = async () => {
        const routeAPI = '/api/role/getRole';
        try {
            const response = await axios.get(`${URLAPI}${routeAPI}`)

            console.log(JSON.stringify(response.data.data));

            setRole(response.data.data);

            console.log('Role : ' + JSON.stringify(role));

        } catch (error) {
            console.log("Error fetching data:", error);
            return [JSON.stringify(error), "false"];
        }
    }

    const handleRoleSelection = async (role: string) => {
        await router.push({
            pathname: '/register/form',
            query: {role}
        });

        return role;
    };

    useEffect(() => {

    }, []);

    return (
        <CustomContainer>
            <div style={{alignItems: 'flex-start'}}>
                <CustomButton onClick={() => {
                    router.back();
                }} leftIcon={<ArrowBack/>} variant={'contained'}>Back</CustomButton>

            </div>
            <CustomContainerCenter>
                <CustomTypography size={'XL'}>Pick Your Role : </CustomTypography>
                <CustomSpacer height={Contants(2)}></CustomSpacer>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2 }}>
                    <CustomButton leftIcon={<DeveloperModeIcon fontSize={'large'} />} type={'button'} variant={'contained'} onClick={() => {
                        handleRoleSelection('Developer').then(r => {
                            console.log(r +' selected');
                        });
                    }}>
                        <CustomTypography size={'L'}>Developer</CustomTypography>
                    </CustomButton>
                    <CustomSpacer width={Contants(2)}></CustomSpacer>
                    <CustomButton leftIcon={<AssignmentIndIcon fontSize={'large'} />} type={'button'} variant={'contained'} onClick={() => {
                        handleRoleSelection('System Analyst').then(r => {
                            console.log(r +' selected');
                        });
                    }}>
                        <CustomTypography size={'L'}>System Analyst</CustomTypography>
                    </CustomButton>
                </Box>
            </CustomContainerCenter>
        </CustomContainer>
    );

}

export default RegisterRole;
