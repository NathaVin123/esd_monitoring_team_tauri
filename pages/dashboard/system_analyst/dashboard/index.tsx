import * as React from 'react';
import CustomTypography from "@/pages/components/mui/CustomTypography";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";
import CustomPieChart from "@/pages/components/mui/CustomPieChart";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";

export const SADashboard = () => {
    const router = useRouter();

    // const data = [
    //     { name: 'Task', value: 400 },
    //     { name: 'Case', value: 400 },
    // ];

    const [data, setData] = useState<any>([]);

    const [taskSum, setTaskSum] = useState<number>(0);
    const [caseSum, setCaseSum] = useState<number>(0);

    const [projectSum, setProjectSum] = useState<number>(0);

    const [userUUID, setUserUUID] = useState<string>('');
    const [userTeam, setUserTeam] = useState<string>('');
    const [userName, setUserName] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [dataCount, setDataCount] = useState<any>([]);

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

    const fetchUserDashboard = async (userName: string) => {
        try {
            let dataReq = {
                userId: userName,
            }

            console.log(dataReq);

            let response = await axios.post(URLAPI+'/api/monitoring/sumCountTaskCase', dataReq);

            let dataSum = response.data.data;

            console.log(dataSum);

            setData(
                [
                    { name: 'Task', value: dataSum.sumTask},
                    { name: 'Case', value: dataSum.sumCase},
                ]
            )

            setTaskSum(dataSum.sumTask);
            setCaseSum(dataSum.sumCase);

            console.log('Data : ',data);
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
        }
    }

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

    useEffect(() => {
        setIsLoading(true);
        fetchUser().then(() => {
            // fetchUserDashboard(userName).then(() => {
            setIsLoading(false);
            // });
        });
    }, []);

    return (
        <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
            <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <CustomTypography bold size={'M'}>System Analyst Dashboard</CustomTypography>
                </div>
                <CustomSpacer height={Constants(2)}></CustomSpacer>
                {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        <CustomTypography size={'L'}>Task / Case</CustomTypography>
                        {taskSum === 0 || caseSum === 0 ? (
                            <CustomTypography size={'M'}> No Data </CustomTypography>) : (
                            <CustomPieChart data={data} dataKey={'value'} nameKey={'name'}></CustomPieChart>)}
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

export default SADashboard;