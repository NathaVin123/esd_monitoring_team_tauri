import {HeaderComponent} from "@/pages/components/HeaderComponent";
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
import NavbarComponent from "@/pages/components/NavbarComponent";
import ImageComponent from "@/pages/components/ImageComponent";
import PolytronLogo from "@/public/assets/polytron-icon.png";
import {useEffect, useState} from "react";
import axios from "axios";
import {teamType} from "@/pages/register/utils/type";
import DropdownComponent from "@/pages/components/DropdownComponent";
import ButtonComponent from "@/pages/components/ButtonComponent";

type keyValue = {
    key: string,
    value: string
};


export function Register() {
    const BASE_URL = `http://localhost:3001`;

    const toast = useToast();

    const [messageErrorField, setMessageErrorField] = useState<string>();

    const [nik, setNIK] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [role, setRole] = useState([]);

    const [team, setTeam] = useState<teamType[]>([]);

    const [gender, setGender] = useState<keyValue[]>([
        {
            key: 'L',
            value: 'Laki-laki'
        },
        {
            key: 'P',
            value: 'Perempuan'
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

    const handleSubmitRegister = async (e) => {
        console.log('Register Init');

        e.preventDefault();

        if(!nik) {

        } else if(!email) {

        } else if(!fullName) {

        } else if(!password) {

        } else if(!role) {

        } else if (!team) {

        }

        if(!nik || !email || !fullName || !password || !role || !team) {
            toast({
                title: 'Error',
                description: 'Field required cannot be empty',
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const doFetchRoleData = async () => {
        const routeAPI = '/api/role/getRole';
        try {
            const response = await axios.get(`${BASE_URL}${routeAPI}`)

            console.log(JSON.stringify(response.data.data));

            setRole(response.data.data);

            console.log('Role : ' + JSON.stringify(role));

        } catch (error) {
            console.error("Error fetching data:", error);
            return [JSON.stringify(error), "false"];
        }
    }

    const doFetchTeamData = async () => {
        const routeAPI = '/api/team/getTeam';

        try {
            const response = await axios.get(`${BASE_URL}${routeAPI}`)

            console.log(JSON.stringify(response.data.data));

            setTeam(response.data.data);

            console.log('Team' + JSON.stringify(role));

        } catch (error) {
            console.error("Error fetching data:", error);
            return [JSON.stringify(error), "false"];
        }
    }

    useEffect(() => {
        doFetchRoleData().then(() => {
            console.log('Done Fetch Role Data');
        });
        doFetchTeamData().then(() => {
            console.log('Done Fetch Team Data');
        })
    }, []);


    return (
        <HeaderComponent>
            <NavbarComponent isDashboard={false}></NavbarComponent>
            <FormControl>
                <VStack direction={"column"} justifyContent={"space-between"}>
                    <Box>
                        <ImageComponent src={PolytronLogo} size={'xs'}></ImageComponent>
                    </Box>
                    <Box>
                        <b style={{fontSize:"40px"}}>Sign In</b>
                    </Box>
                    <Box
                        padding={25}
                        maxW="md"
                        mx="auto"
                        mt={8}
                        p={4}
                        borderWidth="2px"
                        borderRadius="lg"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center">
                        <form onSubmit={() => {}}>
                            <FormControl isRequired>
                                <FormLabel>NIK</FormLabel>
                                <InputGroup>
                                    <Input value={nik} type={'text'} onChange={(e) => {handleInputNumberOnly(e)}} maxLength={10}></Input>
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <InputGroup>
                                    <Input value={email} type={'text'} onChange={(e) => setEmail(e)}></Input>
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Full Name</FormLabel>
                                <InputGroup>
                                    <Input value={fullName} type={'text'} onChange={(e) => setFullName(e)}></Input>
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input value={password} type={'text'} onChange={(e) => setPassword(e)}></Input>
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Role</FormLabel>
                                <InputGroup>
                                    <DropdownComponent items={role}></DropdownComponent>
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Team</FormLabel>
                                <InputGroup>
                                    <DropdownComponent items={team}></DropdownComponent>
                                </InputGroup>
                            </FormControl>
                            <ButtonComponent title={'Submit'}
                                             onClick={ async (e) => {
                                                 await handleSubmitRegister(e).then(() => {

                                                 });
                                             }}>

                            </ButtonComponent>
                        </form>
                        {/*<form onSubmit={(e) => handleSubmitLogin(e)}>*/}
                        {/*<FormControl isRequired>*/}
                        {/*    <FormLabel>NIK</FormLabel>*/}
                        {/*    <InputGroup>*/}
                        {/*        <Input value={nik} type='text' onChange={(e) => {handleInputNumberOnly(e)}} onKeyDown={(e) => {handleNIKKeyDown(e)}} maxLength={10}/>*/}
                        {/*    </InputGroup>*/}
                        {/*    /!*<FormHelperText></FormHelperText>*!/*/}
                        {/*</FormControl>*/}
                        {/*<FormControl isRequired>*/}
                        {/*    <FormLabel>Password</FormLabel>*/}
                        {/*    <InputGroup>*/}
                        {/*        <Input value={password} type={showPassword ? 'text' : 'password'} onChange={(e) => {setPassword(e.target.value)}} />*/}
                        {/*        <InputRightElement width='4.5rem'>*/}
                        {/*            <Button h='1.75rem' size='sm' onClick={handleShowHidePassword}>*/}
                        {/*                {showPassword ? 'Hide' : 'Show'}*/}
                        {/*            </Button>*/}
                        {/*        </InputRightElement>*/}
                        {/*        /!*<FormHelperText></FormHelperText>*!/*/}
                        {/*        <FormErrorMessage>{errorMessage}</FormErrorMessage>*/}
                        {/*    </InputGroup>*/}
                        {/*</FormControl>*/}
                        {/*<Box height={5}>*/}
                        {/*</Box>*/}
                        {/*{errorMessage}*/}
                        {/*<ButtonComponent title={'Submit'}*/}
                        {/*                 onClick={ async (e) => {*/}
                        {/*                     setErrorMessage('');*/}
                        {/*                     await handleSubmitLogin(e);*/}
                        {/*                 }}></ButtonComponent>*/}
                        {/*/!*</form>*!/*/}

                        {/*<Box margin={15}/>*/}
                        {/*<Flex justifyContent="center" alignItems="center">*/}
                        {/*    <Text p="2" fontSize="m">*/}
                        {/*        Doesn't have an account? {' '}*/}
                        {/*        <Link onClick={() => router.push('/register')} textDecoration="underline" _hover={{ color: 'red.500' }}>*/}
                        {/*            Register*/}
                        {/*        </Link>*/}
                        {/*    </Text>*/}
                        {/*</Flex>*/}
                    </Box>
                </VStack>
            </FormControl>
        </HeaderComponent>
    );
}

export default Register;
