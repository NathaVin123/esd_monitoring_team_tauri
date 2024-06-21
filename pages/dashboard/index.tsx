import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { CustomContainer, CustomContainerCenter } from "@/pages/components/mui/CustomContainer";
import { URLAPI } from "@/pages/api/env";
import CustomCircularProgressBar from "@/pages/components/mui/CustomProgressBar";

export default function Dashboard() {

    const router = useRouter();

    const {nik} = router.query;

    const [name, setName] = useState<string>('');
    const [role, setRole] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const doGetUser = async () => {
        try {
            const nik = "001";
            setLoading(true);

            const routeAPI = '/api/user/getUserWithRole';

            const nikUser = localStorage.getItem('nikUser');

            const formData = {
                nik: nikUser,
            }

            const response = await axios.post(URLAPI+routeAPI, formData);

            setName(response.data.data.full_name ?? '-');
            setRole(response.data.data.role.role_name ?? '');

            if(role === 'Admin') {
                await router.replace('/dashboard/admin');
            } else if(role === 'Developer') {
                await router.replace('/dashboard/developer');
            } else if(role === 'System Analyst') {
                await router.replace('/dashboard/system_analyst');
            } else {
                return 'Something wrong with get role';
            }
        } catch (error) {
            console.log('Error fetching data:', error);
            await router.replace('/error');
        }
    }

    useEffect(() => {
        doGetUser().then(() => {
            setLoading(false);
        })
    }, [role]);


    return (
        <CustomContainerCenter>
            {loading ? (<CustomCircularProgressBar></CustomCircularProgressBar>) : (<></>)}
        </CustomContainerCenter>
    );
}
