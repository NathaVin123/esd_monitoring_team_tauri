import {Center, Flex, Button, Box, Text} from "@chakra-ui/react";
import {Inter} from "next/font/google";
import {useState} from "react";
import { FaUser } from "react-icons/fa";
import ButtonComponent from "@/pages/components/ButtonComponent";
import {HeaderComponent} from "@/pages/components/HeaderComponent";
import NavbarComponent from "@/pages/components/NavbarComponent";
import {useRouter} from "next/router";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export function RegisterRole() {
    const BASE_URL = 'http://localhost:3001'
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<string>('');

    const [role, setRole] = useState<string>('');

    const handleRoleSelect = async (role: string) => {
        await setSelectedRole(role);

        router.push('/register/form')
    };

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

    return (
        <>
            <NavbarComponent isDashboard={false}></NavbarComponent>
            <HeaderComponent>
                <Flex flexDirection="column" alignItems="center">
                    <Box p="4">
                        <Text fontSize="xl" fontWeight="bold">Choose your role:</Text>
                    </Box>
                    <Flex flexDirection="row" justifyContent="center" alignItems="center">
                        <Box p="4">
                            <Button
                                leftIcon={<FaUser/>}
                                colorScheme={selectedRole === 'Developer' ? 'red' : 'gray'}
                                onClick={() => handleRoleSelect('Developer')}
                            >
                                Developer
                            </Button>
                        </Box>
                        <Box p="4">
                            <Button
                                leftIcon={<FaUser/>}
                                colorScheme={selectedRole === 'System Analyst' ? 'red' : 'gray'}
                                onClick={() => handleRoleSelect('System Analyst')}
                            >
                                System Analyst
                            </Button>
                        </Box>
                    </Flex>
                    <ButtonComponent title={'Next'}></ButtonComponent>
                </Flex>
            </HeaderComponent>
        </>
    );

}

export default RegisterRole;
