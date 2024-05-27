import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {concatAddressAPIRoute} from "@/utils/concatAddressAPIRoute";
import {consoleLogAddressAPI} from "@/utils/consoleLogAddressAPI";
import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import {URLAPI} from "@/pages/api/env";

export default function Dashboard() {

    const router = useRouter();

    const { nik } = router.query;

    const [user, setUser] = useState<[]>([]);

    // const {token, setToken} = useState(null);

    const fetchToken = async () => {
        const routeAPI = '/api/auth/getToken';

        try {
            const response = await axios.get(`${URLAPI}${routeAPI}`);

            console.log(response.data);
            // setToken(response.data);
        } catch (error) {
            console.error('Error fetching protected data', error);
            // router.push('/login');
        }
    }

    const doGetUser = async () => {
        console.log('Run API Get User With Role');

        const routeAPI = '/api/auth/getUserWithRole';


        try {
            const formData = {
                nik: nik,
            }

            console.log(formData);

            const response = await axios.post(`${URLAPI}${routeAPI}`, [formData]);

            console.log(response.data);
            setUser(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            return [JSON.stringify(error), 'false']
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        console.log('Token : ' + token);
    },[]);

    // const [nik, setNik] = useState<string>('');
    // const [password, setPassword] = useState('');
    //
    // const handleLogin = () => {
    //     console.log('login');
    // }

    return (
        <CustomContainerCenter>
            Welcome to ESD Monitoring Team, {nik}
        </CustomContainerCenter>
    );
}
