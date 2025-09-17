import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomPieChart from "@/pages/components/mui/CustomPieChart";
import {useRouter} from "next/router";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {useEffect, useState} from "react";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";
import {ca} from "date-fns/locale";

export const DevDashboard = () => {
    const router = useRouter();

    // const data = [
    //     { name: 'Task', value: 400 },
    //     { name: 'Case', value: 400 },
    // ];

    const [data, setData] = useState<any>([]);
    const [dataCount, setDataCount] = useState<any>([]);

    const [projectSum, setProjectSum] = useState<number>(0);

    const [taskSum, setTaskSum] = useState<number>(0);
    const [caseSum, setCaseSum] = useState<number>(0);

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

                await fetchUserDashboard(dataUser.uuid);
                await fetchProjectDashboard(dataUser.uuid);
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

    const fetchProjectDashboard = async (userUUID :string)=> {
        try {
            let dataReq = {
                userId: userUUID
            };

            let response = await axios.post(URLAPI+'/api/monitoring/sumCountUserProject', dataReq);

            let dataUser = response.data.data;

            console.log(dataUser);

            // if(dataUser){
                setDataCount(
                    [
                        { name: 'Project', value: dataUser.countProjectData ?? 0},
                    ]
                )
            // }

            console.log(dataCount);

            setProjectSum(dataUser.countProjectData ?? 0);

        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
        }
    }

    const fetchUserDashboard = async (userName: string) => {
        try {
            let dataReq = {
                userId: userName,
            }

            console.log(dataReq);

            // let response = await axios.post(URLAPI+'/api/monitoring/sumDurationTaskUserId', dataReq);

            let response = await axios.post(URLAPI+'/api/monitoring/sumCountTaskCase', dataReq);

            let dataSum = response.data.data;

            console.log(dataSum);

            // setData([
            //         // { name: 'Task', value: 50, unit: 'seconds'},
            //         // { name: 'Case', value: 50, unit: 'minutes'},
            //         { name: 'Task', ...convertTime(dataSum.sumTask)},
            //         { name: 'Case', ...convertTime(dataSum.sumCase)},
            // ]);

            setData(
                [
                            { name: 'Task', value: dataSum.sumTask ?? 0},
                            { name: 'Case', value: dataSum.sumCase ?? 0},
                ]
            )

            setTaskSum(dataSum.sumTask ?? 0);
            setCaseSum(dataSum.sumCase ?? 0);

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
                        <CustomTypography size={'L'}>Task / Case</CustomTypography>
                        <CustomSpacer width={Constants(4)}></CustomSpacer>
                        {taskSum === 0 || caseSum === 0 ? (<CustomTypography size={'M'}> No Data </CustomTypography>) : (<CustomPieChart data={data} dataKey={'value'} nameKey={'name'}></CustomPieChart>)}
                        <CustomSpacer height={Constants(4)}></CustomSpacer>
                        <CustomTypography size={'L'}>Project</CustomTypography>
                        <CustomSpacer width={Constants(4)}></CustomSpacer>
                        {projectSum === 0  ? (<CustomTypography size={'M'}> No Data </CustomTypography>) : (<CustomPieChart data={dataCount} dataKey={'value'} nameKey={'name'}></CustomPieChart>)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DevDashboard;