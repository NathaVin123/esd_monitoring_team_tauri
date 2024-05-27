import {HeaderComponent} from "@/pages/components/chakra-ui/HeaderComponent";
import {
    Box,
    Button, Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement, Link, Text, useToast, VStack
} from "@chakra-ui/react";
import NavbarComponent from "@/pages/components/chakra-ui/NavbarComponent";
import ImageComponent from "@/pages/components/chakra-ui/ImageComponent";
import PolytronLogo from "@/public/assets/polytron-icon.png";
import {useEffect, useState} from "react";
import axios from "axios";
import {roleType, teamType} from "@/pages/register/utils/type";
import DropdownComponent from "@/pages/components/chakra-ui/DropdownComponent";
import ButtonComponent from "@/pages/components/chakra-ui/ButtonComponent";
import {concatAddressAPIRoute} from "@/utils/concatAddressAPIRoute";
import {URLAPI} from "@/pages/api/env";
import {resolveAppleWebApp} from "next/dist/lib/metadata/resolvers/resolve-basics";
import {useRouter} from "next/router";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import CustomTextField from "@/pages/components/mui/CustomTextField";
import CustomButton from "@/pages/components/mui/CustomButton";
import {CustomCircularProgressBar} from "@/pages/components/mui/CustomProgressBar";
import CustomToast from "@/pages/components/mui/CustomToast";

type keyValue = {
    key: string,
    value: string
};


export function Register() {
    const router = useRouter();

    const { role } = router.query;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [messageErrorField, setMessageErrorField] = useState<string>();

    const [nik, setNIK] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [roleDropdown, setRoleDropdown] = useState<keyValue[]>([]);
    const [teamDropDown, setTeamDropdown] = useState<keyValue[]>([]);

    const [roleSelected, setRoleSelected] = useState<string>('')

    const [roleId, setRoleId] = useState<string>('');
    const [teamId, setTeamId] = useState<string>('');

    const [gender, setGender] = useState<string>('');

    const [genderDropdown, setGenderDropdown] = useState<keyValue[]>([
        {
            key: 'Men',
            value: 'Laki-laki'
        },
        {
            key: 'Female',
            value: 'P'
        }
    ]);

    const handleInputNumberOnly = (e) => {
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

    const handleItemGender = (selectedItem) => {
        console.log('Selected item Gender:', selectedItem.value );

        setGender(selectedItem.gender);
    }

    const handleItemRole = (selectedItem) => {
        console.log('Selected item Role:', selectedItem.role_name );

        // setRoleDropdown(selectedItem);
        setRoleId(selectedItem.uuid);
    }

    const handleItemTeam = (selectedItem) => {
        console.log('Selected item Team:', selectedItem.team_name );

        setTeamId(selectedItem.uuid);
        // setTeamDropdown(selectedItem);
    }

    const handleSubmitRegister = async (e) => {
        console.log('Register Init');

        e.preventDefault();

        let fieldMessage: string = '';

        if(!nik) {
            fieldMessage += 'NIK, ';
        }
        if(!email) {
            fieldMessage += 'Email, ';
        }
        if(!fullName) {
            fieldMessage += 'Full Name, ';
        }
        if(!password) {
            fieldMessage += 'Password, ';
        }
        if(roleId) {
            fieldMessage += 'Role, '
        }
        if (teamId) {
            fieldMessage += 'Team'
        }

        console.log(nik + ' ' + email + ' ' + fullName + ' ' + password + ' ' + teamId);


        if(!nik || !email || !fullName || !password || !roleId || !teamId) {
            toast({
                title: 'Error',
                description: `Field ${fieldMessage} required cannot be empty.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }

        console.log('Pass');

        await doPostRegister().then(() => {
            console.log('Register Done');
        });

    }

    const doFetchRoleData = async () => {
        const routeAPI = '/api/role/getRole';

        const addressAPI = concatAddressAPIRoute(URLAPI, routeAPI);

        console.log(addressAPI);

        try {
            const response = await axios.get(addressAPI)

            console.log(JSON.stringify(response.data.data));

            setRoleDropdown(response.data.data);

            console.log('Role : ' + JSON.stringify(roleDropdown));

        } catch (error) {
            console.error("Error fetching data:", error);
            return [JSON.stringify(error), "false"];
        }
    }

    const doFetchTeamData = async () => {
        const routeAPI = '/api/team/getTeam';

        const addressAPI = concatAddressAPIRoute(URLAPI, routeAPI);

        console.log(addressAPI);

        try {
            const response = await axios.get(addressAPI)

            console.log('Team'+JSON.stringify(response.data.data));

            const teamOptions = response.data.data.map((team) => ({
                key: team.team_name,
                value: team.uuid
            }));

            setTeamDropdown(teamOptions);

            console.log('Team' + JSON.stringify(teamDropDown));

        } catch (error) {
            console.error("Error fetching data:", error);
            return [JSON.stringify(error), "false"];
        }
    }

    const doPostRegister = async () => {
        const routeAPI = '/api/user/createUser';

        const addressAPI = concatAddressAPIRoute(URLAPI, routeAPI);

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

        const response = await axios.post(addressAPI, formData);

        console.log(response.data);

        // const timeOut =  setTimeout(() => {
        //     router.replace('/login');
        // }, 2000);

    }

    useEffect(() => {
        doFetchRoleData().then(() => {
            console.log('Done Fetch Role Data');
        });
        doFetchTeamData().then(() => {
            console.log('Done Fetch Team Data');
        })

        setRoleSelected(role)
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
                {/*<CustomSpacer height={Constants(4)}></CustomSpacer>*/}

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

                    {/*<CustomToast open={toastOpen} onClose={handleCloseToast} message={message} severity={severity}></CustomToast>*/}

                </Box>

            </CustomContainerCenter>
        </>
        // <HeaderComponent>
        //     <NavbarComponent isDashboard={false}></NavbarComponent>
        //     <FormControl>
        //         <VStack direction={"column"} justifyContent={"space-between"}>
        //             {/*<Box>*/}
        //             {/*    <ImageComponent src={PolytronLogo} size={'xs'}></ImageComponent>*/}
        //             {/*</Box>*/}
        //             <Box>
        //                 <b style={{fontSize:"40px"}}>Sign In</b>
        //             </Box>
        //             <Box
        //                 padding={25}
        //                 maxW="md"
        //                 mx="auto"
        //                 mt={8}
        //                 p={4}
        //                 borderWidth="2px"
        //                 borderRadius="lg"
        //                 display="flex"
        //                 flexDirection="column"
        //                 alignItems="center"
        //                 justifyContent="center">
        //                 <form onSubmit={() => {}}>
        //                     <FormControl isRequired>
        //                         <FormLabel>NIK</FormLabel>
        //                         <InputGroup>
        //                             <Input value={nik} type={'text'} onChange={(e) => {handleInputNumberOnly(e)}} maxLength={10}></Input>
        //                         </InputGroup>
        //                     </FormControl>
        //                     <FormControl isRequired>
        //                         <FormLabel>Email</FormLabel>
        //                         <InputGroup>
        //                             <Input value={email} type={'text'} onChange={(e) => handleEmail(e)}></Input>
        //                         </InputGroup>
        //                     </FormControl>
        //                     <FormControl isRequired>
        //                         <FormLabel>Full Name</FormLabel>
        //                         <InputGroup>
        //                             <Input value={fullName} type={'text'} onChange={(e) => handleFullName(e)}></Input>
        //                         </InputGroup>
        //                     </FormControl>
        //                     <FormControl isRequired>
        //                         <FormLabel>Password</FormLabel>
        //                         <InputGroup>
        //                             <Input value={password} type={'text'} onChange={(e) => handlePassword(e)}></Input>
        //                         </InputGroup>
        //                     </FormControl>
        //                     <FormControl isRequired>
        //                         <FormLabel>Gender</FormLabel>
        //                         <InputGroup>
        //                             <DropdownComponent items={genderDropdown} label={'Gender'} field={'Gender'} onItemSelected={handleItemRole}></DropdownComponent>
        //                         </InputGroup>
        //                     </FormControl>
        //                     <FormControl isRequired>
        //                         <FormLabel>Role</FormLabel>
        //                         <InputGroup>
        //                             <DropdownComponent items={roleDropdown} label={'Role'} field={'Role'} onItemSelected={handleItemRole}></DropdownComponent>
        //                         </InputGroup>
        //                     </FormControl>
        //                     <FormControl isRequired>
        //                         <FormLabel>Team</FormLabel>
        //                         <InputGroup>
        //                             <DropdownComponent items={teamDropDown} label={'Team'} field={'Team'} onItemSelected={handleItemTeam}></DropdownComponent>
        //                         </InputGroup>
        //                     </FormControl>
        //                     <Box height={5}></Box>
        //                     <Box justifyContent={"center"} justifyItems={"center"}>
        //                         <ButtonComponent title={'Submit'}
        //                                          onClick={ async (e) => {
        //                                              await handleSubmitRegister(e).then(() => {
        //                                                  console.log('Handle Submit Register Done')
        //                                              });
        //                                          }}>
        //                         </ButtonComponent>
        //                     </Box>
        //                 </form>
        //             </Box>
        //         </VStack>
        //     </FormControl>
        // </HeaderComponent>
    );
}

export default Register;
