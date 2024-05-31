import {useEffect, useState} from "react";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";
import {useRouter} from "next/router";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import CustomTextField from "@/pages/components/mui/CustomTextField";
import CustomButton from "@/pages/components/mui/CustomButton";
import {CustomCircularProgressBar} from "@/pages/components/mui/CustomProgressBar";
import CustomToast from "@/pages/components/mui/CustomToast";
import {Box} from "@mui/material";

type keyValue = {
    key: string,
    value: string
};


export function Register() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [nik, setNIK] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { role } = router.query;
    const [roleDropdown, setRoleDropdown] = useState<keyValue[]>([]);
    const [teamDropDown, setTeamDropdown] = useState<keyValue[]>([]);
    const [roleSelected, setRoleSelected] = useState<string>('')
    const [roleId, setRoleId] = useState<string>('');
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

    const handleInputNumberOnly = (e: any) => {
        const inputValue = e.target.value;
        const regex = /^\d*$/; // Regex pattern to allow only numeric characters

        if (regex.test(inputValue)) {
            setNIK(inputValue);
        }
        console.log(nik);
    };

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

    // const handleItemGender = (selectedItem) => {
    //     console.log('Selected item Gender:', selectedItem.value );
    //
    //     setGender(selectedItem.gender);
    // }
    //
    // const handleItemRole = (selectedItem) => {
    //     console.log('Selected item Role:', selectedItem.role_name );
    //
    //     // setRoleDropdown(selectedItem);
    //     setRoleId(selectedItem.uuid);
    // }
    //
    // const handleItemTeam = (selectedItem) => {
    //     console.log('Selected item Team:', selectedItem.team_name );
    //
    //     setTeamId(selectedItem.uuid);
    //     // setTeamDropdown(selectedItem);
    // }
    //
    // const handleSubmitRegister = async (e) => {
    //     console.log('Register Init');
    //
    //     e.preventDefault();
    //
    //     let fieldMessage: string = '';
    //
    //     if(!nik) {
    //         fieldMessage += 'NIK, ';
    //     }
    //     if(!email) {
    //         fieldMessage += 'Email, ';
    //     }
    //     if(!fullName) {
    //         fieldMessage += 'Full Name, ';
    //     }
    //     if(!password) {
    //         fieldMessage += 'Password, ';
    //     }
    //     if(roleId) {
    //         fieldMessage += 'Role, '
    //     }
    //     if (teamId) {
    //         fieldMessage += 'Team'
    //     }
    //
    //     console.log(nik + ' ' + email + ' ' + fullName + ' ' + password + ' ' + teamId);
    //
    //
    //     if(!nik || !email || !fullName || !password || !roleId || !teamId) {
    //         toast({
    //             title: 'Error',
    //             description: `Field ${fieldMessage} required cannot be empty.`,
    //             status: "error",
    //             duration: 5000,
    //             isClosable: true,
    //         })
    //     }
    //
    //     console.log('Pass');
    //
    //     await doPostRegister().then(() => {
    //         console.log('Register Done');
    //     });
    //
    // }

    // const doFetchRoleData = async () => {
    //     const routeAPI = '/api/role/getRole';
    //
    //     const addressAPI = concatAddressAPIRoute(URLAPI, routeAPI);
    //
    //     console.log(addressAPI);
    //
    //     try {
    //         const response = await axios.get(addressAPI)
    //
    //         console.log(JSON.stringify(response.data.data));
    //
    //         setRoleDropdown(response.data.data);
    //
    //         console.log('Role : ' + JSON.stringify(roleDropdown));
    //
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //         return [JSON.stringify(error), "false"];
    //     }
    // }
    //
    // const doFetchTeamData = async () => {
    //     const routeAPI = '/api/team/getTeam';
    //
    //     const addressAPI = concatAddressAPIRoute(URLAPI, routeAPI);
    //
    //     console.log(addressAPI);
    //
    //     try {
    //         const response = await axios.get(addressAPI)
    //
    //         console.log('Team'+JSON.stringify(response.data.data));
    //
    //         const teamOptions = response.data.data.map((team) => ({
    //             key: team.team_name,
    //             value: team.uuid
    //         }));
    //
    //         setTeamDropdown(teamOptions);
    //
    //         console.log('Team' + JSON.stringify(teamDropDown));
    //
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //         return [JSON.stringify(error), "false"];
    //     }
    // }

    const doPostRegister = async () => {
        const routeAPI = '/api/user/createUser';

        // const addressAPI = concatAddressAPIRoute(URLAPI, routeAPI);

        let formData = [
            {
                nik: nik,
                email: email,
                fullName: fullName,
                password: password,
                gender: gender,
                roleId: roleId,
                teamId: teamId,
                activeUser: true
            }
        ]

        const response = await axios.post(`${URLAPI}${routeAPI}`, formData);

        console.log(response.data);

        // const timeOut =  setTimeout(() => {
        //     router.replace('/login');
        // }, 2000);

    }

    useEffect(() => {
        // doFetchRoleData().then(() => {
        //     console.log('Done Fetch Role Data');
        // });
        // doFetchTeamData().then(() => {
        //     console.log('Done Fetch Team Data');
        // })
        //
        // setRoleSelected(role)
    }, [roleSelected]);

    return (
        <>
            <CustomContainerCenter>
                <CustomTypography size={'XL'}>
                    Sign Up
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
                        onChange={(e) => setNIK(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <CustomTextField
                        label="Email"
                        type="text"
                        required
                        value={nik}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <CustomTextField
                        label="Full Name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
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
                    <CustomTextField
                        label="Gender"
                        type="select"
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        sx={{ mb: 2 }}
                        options={genderDropdown}
                    />
                    <CustomTextField
                        label="Team"
                        type="select"
                        required
                        value={teamId}
                        onChange={(e) => setGender(e.target.value)}
                        sx={{ mb: 2 }}
                        options={teamDropDown}
                    />
                    <CustomButton disabled={isLoading} type="submit" variant="contained" color="primary" fullWidth onClick={() => {
                        // submitLogin().then(() => {
                        //     console.log('Submit Button Clicked!')
                        //     setIsLoading(true);
                        // })
                    }
                    }>
                        {isLoading ? (<CustomCircularProgressBar color={'inherit'}></CustomCircularProgressBar>): 'Submit'}
                    </CustomButton>
                </Box>

            </CustomContainerCenter>
        </>
    );
}

export default Register;
