import ImageComponent from "../components/ImageComponent"
import PolytronLogo from "../../public/assets/polytron-icon.png";
import CircularProgressBarComponent from "../components/CircularProgressBarComponent";
import {Container, VStack, Flex, Box, Center, useToast, Input, Divider, Text, Link, InputGroup, InputRightElement, Button} from '@chakra-ui/react'
import TextComponent from "../components/TextComponent";
import Image from "next/image";
import { Inter } from "next/font/google";
import {ButtonComponent} from "@/pages/components/ButtonComponent";
import {ToastComponent} from "@/pages/components/ToastComponent";

import {fetchLoginData} from '../api/api';

import type { NextRequest, NextResponse } from "next/server";

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

import {PORT, URL_DEV_LOCAL} from "../api/env";

import {useEffect, useState} from "react";
import sendConsoleLog from "@/utils/sendConsoleLog";
import {useRouter} from "next/router";
import {HeaderComponent} from "@/pages/components/HeaderComponent";
import NavbarComponent from "@/pages/components/NavbarComponent";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export function Login() {
    // console.log(URL_DEV_LOCAL + PORT);

    const BASE_URL = `http://localhost:3001`;


    console.log(BASE_URL);

    const router = useRouter();
    const toast = useToast();

    const [nik, setNik] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [user, setUser] = useState(null);

    // const [formData, setFormData] = useState({nik: '', password: ''})

    const [result, setResult] = useState<any>();

    useEffect(() => {

    },[nik, password]);


    const doFetchLoginData = async () => {
        const routeAPI = '/api/auth/loginUser';

        console.log("Do fetch login data");
      try {
        const formData = {
          nik: nik,
          password: password,
        };

        console.log(formData);

        const response = await axios.post(`${BASE_URL}${routeAPI}`, formData);

        console.log(response.data);

        return [response.data.message, response.data.success];
      } catch (error) {
        console.error("Error fetching data:", error);
        return [JSON.stringify(error), "false"];
      }
    };

    const handleSubmitLogin = async (e) => {
        console.log('login');

        e.preventDefault();

        if(!nik || !password) {
            toast({
                title: 'Error',
                description: 'NIK and Password cannot be empty!',
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
        else {
            await doFetchLoginData().then(([message, success]) => {
                // toast({
                //     title: data,
                //     description: data,
                //     status: data,
                //     duration: 5000,
                //     isClosable: true,
                // })

                toast({
                    title: success === true ? 'Success : ' : 'Failed : ',
                    description: message,
                    status: success === true ? 'success' : 'error',
                    duration: 5000,
                    isClosable: true,
                })

                if(success === true) {
                    router.push({
                        pathname: '/dashboard',
                        query: {
                            nik: nik,
                        }
                    })
                }


            });
        }
    }

    const handleInputNumberOnly = (e) => {
        const inputValue = e.target.value;
        const regex = /^\d*$/; // Regex pattern to allow only numeric characters

        if (regex.test(inputValue)) {
            setNik(inputValue);
        }
        console.log(nik);
    };

    const handleNIKKeyDown = (e) => {
        const numericKeys = /^[0-9]*$/;

        if (!numericKeys.test(e.key)) {
            return false;
        } else {
            return true;
        }
    };

    const handleShowHidePassword = () => setShowPassword(!showPassword)

    return (
        <>
        <NavbarComponent isDashboard={false}></NavbarComponent>
        <HeaderComponent>
            <Center>
                <Flex direction={["column", "row"]}>
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
                            {/*<form onSubmit={(e) => handleSubmitLogin(e)}>*/}
                                <FormControl isRequired>
                                    <FormLabel>NIK</FormLabel>
                                    <InputGroup>
                                        <Input value={nik} type='text' onChange={(e) => {handleInputNumberOnly(e)}} onKeyDown={(e) => {handleNIKKeyDown(e)}} maxLength={10}/>
                                    </InputGroup>
                                    {/*<FormHelperText></FormHelperText>*/}
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input value={password} type={showPassword ? 'text' : 'password'} onChange={(e) => {setPassword(e.target.value)}} />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleShowHidePassword}>
                                                {showPassword ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                        {/*<FormHelperText></FormHelperText>*/}
                                        <FormErrorMessage>{errorMessage}</FormErrorMessage>
                                    </InputGroup>
                                </FormControl>
                                <Box height={5}>
                                </Box>
                                {errorMessage}
                                <ButtonComponent title={'Submit'}
                                                 onClick={ async (e) => {
                                                     setErrorMessage('');
                                                     await handleSubmitLogin(e);
                                                 }}></ButtonComponent>
                            {/*</form>*/}

                            <Box margin={15}/>
                            <Flex justifyContent="center" alignItems="center">
                                <Text p="2" fontSize="m">
                                    Doesn't have an account? {' '}
                                    <Link onClick={() => router.push('/register')} textDecoration="underline" _hover={{ color: 'red.500' }}>
                                        Register
                                    </Link>
                                </Text>
                            </Flex>
                        </Box>
                    </VStack>
                </Flex>
            </Center>
        </HeaderComponent>
        </>
    );
}

export default Login;
