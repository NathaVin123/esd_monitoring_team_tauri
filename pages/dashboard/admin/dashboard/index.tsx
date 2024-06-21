import React, { useEffect, useState } from "react";
import axios from "axios";
import { URLAPI } from "@/pages/api/env";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import { CustomProgressBarEntireScreen } from "@/pages/components/mui/CustomProgressBar";
import { Grid, Paper, Typography } from "@mui/material";
import {router} from "next/client";

export const AdminDashboard = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [countUser, setCountUser] = useState<number>(0);
    const [countTeam, setCountTeam] = useState<number>(0);
    const [countRole, setCountRole] = useState<number>(0);
    const [countStatus, setCountStatus] = useState<number>(0);
    const [countProject, setCountProject] = useState<number>(0);
    const [countTask, setCountTask] = useState<number>(0);
    const [countCase, setCountCase] = useState<number>(0);
    const [countActiveUserMonitoring, setCountActiveUserMonitoring] = useState<number>(0);

    const doFetchCountAdmin = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(URLAPI + '/api/global/countAdminSummary');

            const dataCount = response.data.data;

            setCountUser(dataCount.countUser ?? 0);
            setCountTeam(dataCount.countTeam ?? 0);
            setCountRole(dataCount.countRole ?? 0); // Fixed: countRole should not be assigned countTeam value
            setCountStatus(dataCount.countStatus ?? 0);
            setCountProject(dataCount.countProject ?? 0);
            setCountTask(dataCount.countTask ?? 0);
            setCountCase(dataCount.countTask ?? 0);
            setCountActiveUserMonitoring(dataCount.countActiveUserMonitoring ?? 0);

        } catch (error : any) {
            console.log(error);
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }}
            );
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        doFetchCountAdmin().then(() => {});
    }, [])

    return (
        <>
            <div style={{ height: '100vh', width: '85vw', overflow: 'hidden' }}>
                <div style={{ height: '100%', overflow: 'auto', padding: '20px' }}>
                    <CustomTypography bold size={'M'}>Welcome To Admin</CustomTypography>
                    {isLoading ? (
                        <CustomProgressBarEntireScreen />
                    ) : (
                        <Grid container spacing={2} style={{ marginTop: '20px' }}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper elevation={3} style={{ padding: '20px' }}>
                                    <Typography variant="h6">Users</Typography>
                                    <Typography variant="h4">{countUser}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper elevation={3} style={{ padding: '20px' }}>
                                    <Typography variant="h6">Teams</Typography>
                                    <Typography variant="h4">{countTeam}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper elevation={3} style={{ padding: '20px' }}>
                                    <Typography variant="h6">Roles</Typography>
                                    <Typography variant="h4">{countRole}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper elevation={3} style={{ padding: '20px' }}>
                                    <Typography variant="h6">Status</Typography>
                                    <Typography variant="h4">{countStatus}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper elevation={3} style={{ padding: '20px' }}>
                                    <Typography variant="h6">Project</Typography>
                                    <Typography variant="h4">{countProject}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper elevation={3} style={{ padding: '20px' }}>
                                    <Typography variant="h6">Task</Typography>
                                    <Typography variant="h4">{countTask}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper elevation={3} style={{ padding: '20px' }}>
                                    <Typography variant="h6">Case</Typography>
                                    <Typography variant="h4">{countCase}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper elevation={3} style={{ padding: '20px' }}>
                                    <Typography variant="h6">Active User Monitoring</Typography>
                                    <Typography variant="h4">{countActiveUserMonitoring}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;