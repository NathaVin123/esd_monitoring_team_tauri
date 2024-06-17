import CustomTypography from "@/pages/components/mui/CustomTypography";
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import {ArrowBack} from "@mui/icons-material";
import CustomButton from "@/pages/components/mui/CustomButton";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";

export const ProfilePage = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [active, setActive] = useState<string>("");

    const fetchUserProfile = async () => {
        const routeAPI: string = '/api/user/getUserWithRole';

        let data = {
            nik: '001',
        };

        const response = await axios.post(URLAPI + routeAPI, data)

        if(response) {
            let userData = response.data.data;

            if(userData) {
                setFullName(userData.full_name ?? '-');
                setEmail(userData.email ?? '-');
                setGender(userData.gender === 'L' ? 'Men' : 'Female')
                setActive(userData.active ? 'On' : 'Off')
            }
        }
    }

    useEffect(() => {
        fetchUserProfile().then(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <MyAppBar></MyAppBar>
            <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
                <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                    <CustomButton leftIcon={<ArrowBack/>} variant="contained" color="primary" onClick={() => {
                        router.back();
                    }} style={{ marginBottom: '20px' }}>
                        Back
                    </CustomButton>
                    <CustomTypography bold size={'L'}>Profile</CustomTypography>
                    <CustomTypography size={'S'}>{'Full Name        : '+fullName}</CustomTypography>
                    <CustomTypography size={'S'}>{'Email            : '+email}</CustomTypography>
                    <CustomTypography size={'S'}>{'Gender           : '+gender}</CustomTypography>
                    <CustomTypography size={'S'}>{'Active User           : '+active}</CustomTypography>

                </div>
            </div>
            {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (<></>)}
        </>

    );
}

export default ProfilePage;