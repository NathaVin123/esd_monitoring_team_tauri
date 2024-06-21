import React, {useEffect, useState} from "react";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";
import {useRouter} from "next/router";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import {CustomContainer, CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import CustomTextField from "@/pages/components/mui/CustomTextField";
import CustomButton from "@/pages/components/mui/CustomButton";
import {CustomCircularProgressBar, CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";
import CustomToast from "@/pages/components/mui/CustomToast";
import {AlertColor, Box, Input} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

type keyValue = {
    key: string,
    value: string
};

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


export function Register() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [nik, setNIK] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [teamDropDown, setTeamDropdown] = useState<keyValue[]>([]);
    const [roleSelected, setRoleSelected] = useState<string>('')
    const [teamId, setTeamId] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [genderDropdown, setGenderDropdown] = useState<keyValue[]>([
        {
            key: 'Men',
            value: 'L'
        },
        {
            key: 'Female',
            value: 'P'
        }
    ]);

    const [createdBy, setCreatedBy] = useState<string>('');

    const [photo, setPhoto] = useState<File | null>(null);


    const handleInputNumberOnly = (e: any) => {
        const inputValue = e.target.value;
        const regex = /^\d*$/; // Regex pattern to allow only numeric characters

        if (regex.test(inputValue)) {
            setNIK(inputValue);
        }
        console.log(nik);
    };

    const handleNik = (e: any) => {
        const value = e.target.value;
        // Only allow numbers
        if (/^\d*$/.test(value)) {
            setNIK(value);
        }
    }

    const handleEmail = (e: any) => {
        const inputValue = e.target.value;

        setEmail(inputValue);
    }

    const handleFullName = (e: any) => {
        const inputValue = e.target.value;

        setFullName(inputValue);
    }

    const handlePassword = (e: any) => {
        const inputValue = e.target.value;

        setPassword(inputValue);
    }

    const handleGender = (e: any) => {
        const inputValue = e.target.value;

        setGender(inputValue);
    }

    const handleTeam = (e: any) => {
        const inputValue = e.target.value;

        setTeamId(inputValue);
    }

    const handlePhotoUpload = (e: any) => {
        console.log('File : ',e.target.files[0]);
        setPhoto(e.target.files[0]);
        console.log('Photo : ', photo);
    }

    const [messageError, setMessageError] = useState<string>('');
    const [openToast, setOpenToast] = useState<boolean>(false);
    const [severity, setSeverity] = useState<AlertColor>();
    const handleCloseToast = () => {
        setOpenToast(false);
    };

    const validate = () => {
        if (!nik) {
            setOpenToast(true);
            setMessageError('NIK is required')
            setSeverity('warning');
            return false;
        }
        if (!fullName) {
            setOpenToast(true);
            setMessageError('Full Name is required')
            setSeverity('warning');
            return false;
        }
        if (!email) {
            setOpenToast(true);
            setMessageError('Email is required')
            setSeverity('warning');
            return false;
        }
        if (!password) {
            setOpenToast(true);
            setMessageError('Password is required')
            setSeverity('warning');
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setOpenToast(true);
            setMessageError('Email is not valid');
            setSeverity('warning');
            return false;
        }
        if (!gender) {
            setOpenToast(true);
            setMessageError('Gender is required')
            setSeverity('warning');
            return false;
        }
        if (!teamId) {
            setOpenToast(true);
            setMessageError('Team is required')
            setSeverity('warning');
            return false;
        }

        return true;
    };

    const fetchTeam = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(URLAPI+'/api/team/getAllTeam');

            let teamData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid ?? '-',
                team_name: data.team_name ?? '-',
            }));

            let teamOptions = teamData.map((data: any) => ({
                key: data.uuid,
                value: data.team_name,
            }));

            setTeamDropdown(teamOptions);

            setIsLoading(false);
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
        fetchTeam().then(() => {
            console.log('Get Team Successfully');
            if(isLocalStorageAvailable()) {
                const nikFromLocal: string | null = localStorage.getItem('nikUser');
                setCreatedBy(nikFromLocal ?? '');
                setIsLoading(false);
            }
        });
    }, [roleSelected]);

    const {role} = router.query;

    const handleAddDialogSave = async () => {
        try {
            console.log('Save Photo : ',photo);
            if(validate()){
                const formData = new FormData();
                formData.append('nik', nik);
                formData.append('email', email);
                formData.append('fullName', fullName);
                formData.append('password', password);
                formData.append('gender', gender === 'Men' ? 'L' : 'P');
                formData.append('activeUser', 'true');
                formData.append('roleId', role === 'Developer' ? '92c7c162-a38f-48eb-95f7-d5cb24dab530' : '454b02b0-4218-4713-ba6b-5fe5713072dc');
                formData.append('teamId', teamId);
                formData.append('createdBy', createdBy);

                if (photo) {
                    formData.append('profilePhoto', photo);
                }

                console.log(formData);

                await createUser(formData);

                setOpenToast(true);
                setMessageError('Successfully Register !')
                setSeverity('success');
            }

        } catch (error) {
            console.log("Failed to add user", error);
        }
    };

    const createUser = async (dataNew: any) => {
        try {

            console.log(JSON.stringify(dataNew));
            setIsLoading(true);
            const routeAPI: string = '/api/auth/registerUser';
            await axios.post(URLAPI + routeAPI, dataNew);
            setIsLoading(false);

            setTimeout(() => {
                router.replace('/login');
            }, 3000);

        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.log("Failed to create user", error);
        }
    };

    return (
        <>
            {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (<></>)}
            <CustomContainer>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                    <CustomButton onClick={() => {
                        router.back();
                    }} leftIcon={<ArrowBack/>} variant={'contained'}>Back</CustomButton>
                </div>
                <CustomContainerCenter>
                    <CustomTypography size={'XL'}>
                        Sign Up {role}
                    </CustomTypography>
                    <CustomTypography size={'M'}>
                        {roleSelected}
                    </CustomTypography>

                    <Box padding={10}>
                        <CustomTextField
                            label="NIK"
                            type="text"
                            required
                            value={nik}
                            onChange={(e) => handleNik(e)}
                            sx={{ mb: 2 }}
                        />
                        <CustomTextField
                            label="Email"
                            type="text"
                            required
                            value={email}
                            onChange={(e) => handleEmail(e)}
                            sx={{ mb: 2 }}
                        />
                        <CustomTextField
                            label="Full Name"
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => handleFullName(e)}
                            sx={{ mb: 2 }}
                        />
                        <CustomTextField
                            label="Password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => handlePassword(e)}
                            sx={{ mb: 2 }}
                        />
                        <CustomTextField
                            label="Gender"
                            type="select"
                            required
                            value={gender}
                            onChange={(e) => handleGender(e)}
                            sx={{ mb: 2 }}
                            options={genderDropdown}
                        />
                        <CustomTextField
                            label="Team"
                            type="select"
                            required
                            value={teamId}
                            onChange={(e) => handleTeam(e)}
                            sx={{ mb: 2 }}
                            options={teamDropDown}
                        />
                        <CustomSpacer height={Constants(2)}></CustomSpacer>
                        <CustomTypography>Profile Photo</CustomTypography>
                        <Input
                            type="file"
                            onChange={handlePhotoUpload}
                            inputProps={{ accept: '.png' }}
                            sx={{ mb: 2 }}
                        />
                        <CustomButton disabled={isLoading} type="submit" variant="contained" color="primary" fullWidth onClick={() => {
                            handleAddDialogSave().then(() => {});
                        }
                        }>
                            Submit
                        </CustomButton>
                    </Box>
                </CustomContainerCenter>
            </CustomContainer>
            <CustomToast open={openToast} onClose={handleCloseToast} message={messageError} severity={severity}></CustomToast>
        </>

    );
}

export default Register;
