import CustomTypography from "@/pages/components/mui/CustomTypography";
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import {AccountCircle, ArrowBack} from "@mui/icons-material";
import CustomButton from "@/pages/components/mui/CustomButton";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";
import {Box} from "@mui/material";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import sharp from 'sharp';

import {router} from "next/client";

function isLocalStorageAvailable() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

export const ProfilePage = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [nik, setNik] = useState<string>('');
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [active, setActive] = useState<string>("");
    const [photo, setPhoto] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [team, setTeam] = useState<string>('');

    const [createdBy, setCreatedBy] = useState<string>("");

    const fetchUserProfile = async (userId: string | null) => {
        try {
            setIsLoading(true);

            const routeAPI: string = '/api/user/getUserWithRole';

            let data = {
                nik: userId,
                type: 'profile',
            };

            const response = await axios.post(URLAPI + routeAPI, data)

            if(response) {
                let userData = response.data.data;

                if(userData) {
                    const profilePhotoData = userData.profile_photo.data;
                    const uint8Array = new Uint8Array(profilePhotoData);

                    const blob = new Blob([uint8Array], { type: 'image/png' });

                    const url = URL.createObjectURL(blob);
                    setNik(userData.nik ?? '-');
                    setFullName(userData.full_name ?? '-');
                    setEmail(userData.email ?? '-');
                    setGender(userData.gender === 'L' ? 'Men' : 'Female')
                    setActive(userData.active === '1' ? 'On' : 'Off')
                    setPhoto(url);
                    setRole(userData.role.role_name ?? '-')
                    setTeam(userData.team.team_name ?? '-')
                }
            }
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.log("Failed to fetch users", error);
        }

    }

    useEffect(() => {
            if(isLocalStorageAvailable()) {
                const nikFromLocal: string | null = localStorage.getItem('nikUser');
                console.log('nikFromLocal : ', nikFromLocal);
                // setCreatedBy(nikFromLocal ?? '');
                fetchUserProfile(nikFromLocal).then(() => {
                    setIsLoading(false);
                });
            }
    }, []);

    return (
        <>
            <MyAppBar></MyAppBar>
            {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (<></>)}

            <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
                <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                    {isLoading ? (<></>) : (
                        <>
                            <CustomButton leftIcon={<ArrowBack/>} variant="contained" color="primary" onClick={() => {
                                router.back();
                            }} style={{ marginBottom: '20px' }}>
                                Back
                            </CustomButton>
                            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                <CustomTypography bold size={'L'}>Profile</CustomTypography>
                                <CustomSpacer height={Constants(4)}></CustomSpacer>
                                {photo ? (
                                    <img style={{width: '100px', height: '100px', borderRadius: '100%'}} src={photo} alt="Profile"/>
                                ) : (
                                    <AccountCircle fontSize={'large'}></AccountCircle>
                                )}
                                <CustomSpacer height={Constants(4)}></CustomSpacer>

                                <CustomTypography size={'L'}>{fullName}</CustomTypography>
                                <Box sx={{
                                    width: '500px',
                                    padding: '16px',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    backgroundColor: '#f9f9f9',
                                    maxWidth: '750px',
                                    margin: '16px auto',
                                }}>
                                    <Box style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <CustomTypography  size={'S'}>NIK</CustomTypography>
                                        <CustomTypography  size={'S'}>{nik}</CustomTypography>
                                    </Box>
                                    <Box style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <CustomTypography  size={'S'}>Email</CustomTypography>
                                        <CustomTypography  size={'S'}>{email}</CustomTypography>
                                    </Box>
                                    <Box style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <CustomTypography  size={'S'}>Gender</CustomTypography>
                                        <CustomTypography  size={'S'}>{gender}</CustomTypography>
                                    </Box>
                                    <Box style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <CustomTypography  size={'S'}>Active User</CustomTypography>
                                        <CustomTypography  size={'S'}>{active}</CustomTypography>
                                    </Box>
                                    <Box style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <CustomTypography  size={'S'}>Role</CustomTypography>
                                        <CustomTypography  size={'S'}>{role}</CustomTypography>
                                    </Box>
                                    <Box style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <CustomTypography  size={'S'}>Team</CustomTypography>
                                        <CustomTypography  size={'S'}>{team}</CustomTypography>
                                    </Box>
                                </Box>

                            </div>
                        </>
                    )}


                </div>
            </div>
        </>

    );
}

export default ProfilePage;