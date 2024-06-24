import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomPieChart from "@/pages/components/mui/CustomPieChart";
import {useRouter} from "next/router";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {useEffect, useState} from "react";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";

export const DevDashboard = () => {
    const router = useRouter();

    // const data = [
    //     { name: 'Task', value: 400 },
    //     { name: 'Case', value: 400 },
    // ];

    const [data, setData] = useState<any>([]);

    const [userUUID, setUserUUID] = useState<string>('');
    const [userTeam, setUserTeam] = useState<string>('');
    const [userName, setUserName] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchUser = async () => {
        // setIsLoading(true);

        try {
            const routeAPI: string = '/api/user/getFirstUser';

            const nik = localStorage.getItem('nikUser');

            let dataReq = {
                nik: nik,
            }

            let response = await axios.post(URLAPI+routeAPI, dataReq);

            if(response) {
                let dataUser = response.data.data;

                setUserUUID(dataUser.uuid);
                setUserTeam(dataUser.team_master_id);
                setUserName(dataUser.full_name);

                await fetchUserDashboard(dataUser.full_name);
            }

            if(!response) {
                console.log('Something Wrong !');
            } else {
                // setIsLoading(false);
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

    const convertTime = (value: number) => {
        const flooredValue = Math.floor(value);

        if (value >= 3600) {
            return { value: Math.floor(flooredValue / 3600), unit: 'hours' };
        } else if (value >= 60) {
            return { value: Math.floor(flooredValue / 60), unit: 'minutes' };
        } else {
            return { value: Math.floor(flooredValue), unit: 'seconds' };
        }
    };

    const fetchUserDashboard = async (userName: string) => {
        try {
            let dataReq = {
                userId: userName,
            }

            console.log(dataReq);

            let response = await axios.post(URLAPI+'/api/monitoring/sumDurationTaskUserId', dataReq);

            let dataSum = response.data.data;

            console.log(dataSum);

            setData([
                    // { name: 'Task', value: 50, unit: 'seconds'},
                    // { name: 'Case', value: 50, unit: 'minutes'},
                    { name: 'Task', ...convertTime(dataSum.sumTask)},
                    { name: 'Case', ...convertTime(dataSum.sumCase)},
            ]);

            console.log('Data : ',data);
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchUser().then(() => {
            // fetchUserDashboard(userName).then(() => {
                setIsLoading(false);
            // });
        });
    }, []);

    return (
        <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <div style={{ height: '100%', overflow: 'auto', padding: '20px' }}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <CustomTypography bold size={'M'}>Developer Dashboard</CustomTypography>
                </div>
                <CustomSpacer height={Constants(2)}></CustomSpacer>
                {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        <CustomTypography size={'S'}>Duration Activity</CustomTypography>
                        <CustomPieChart data={data} dataKey={'value'} nameKey={'name'}></CustomPieChart>
                    </div>
                )}

            </div>
        </div>
    );
}

export default DevDashboard;