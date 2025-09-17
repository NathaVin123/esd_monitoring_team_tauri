import CustomTypography from "@/pages/components/mui/CustomTypography";
import React, {useEffect, useState} from "react";
import {Refresh, Style} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {ca} from "date-fns/locale";
import {useRouter} from "next/router";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";
import moment from "moment/moment";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {styled} from "@mui/system";
import {DataGrid, GridColDef, GridRowClassNameParams} from "@mui/x-data-grid";

export const DevActivityHist = () => {
    const [userUUID, setUserUUID] = useState<string>('');
    const [userTeamUUID, setUserTeamUUID] = useState<string>('');
    const [userTeamName, setUserTeamName] = useState<string>('');

    const [rowsMonitoring, setRowsMonitoring] = useState<[]>([]);

    const router = useRouter();

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
                setUserTeamUUID(dataUser.team_master_id);
            }

            if(!response) {
                console.log('Something Wrong !');
            } else {

            }

            // setIsLoading(false);

            await fetchMonitoringUser(userUUID);
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.log("Failed to fetch users", error);
        }
    }

    const fetchMonitoringUser = async (userUUID: string) => {
        try {
            let dataReq = {
                userId: userUUID,
            };

            console.log(dataReq);

            let response = await axios.post(URLAPI+'/api/monitoring/getMonitoringHistUser', dataReq);

            console.log(response);

            let dataMonitoring = response.data.data.map((data: any, index: number) => {

                const duration = moment.duration(data.duration, 'seconds');

                const days = duration.days();
                const hours = duration.hours();
                const minutes = duration.minutes();
                const seconds = duration.seconds();

                let durationString = '';
                if (days > 0) durationString += `${days} Days `;
                if (hours > 0) durationString += `${hours} Hours `;
                if (minutes > 0) durationString += `${minutes} Minutes `;
                if (seconds > 0 || durationString === '') durationString += `${seconds} Seconds`;

                return {
                    id: index + 1,
                    uuid: data.uuid,
                    pic : data.user_master_id,
                    task_name: data.task_master_id ? data.task_master_id + '(Task)' : data.case_master_id + '(Case)',
                    // team_name: data.team?.team_name ?? '-',
                    start_time: data.start_time ? moment(data.start_time).format('DD-MM-yyyy HH:mm:ss') : '-',
                    end_time: data.end_time ? moment(data.end_time).format('DD-MM-yyyy HH:mm:ss') : '-',
                    remark: data.remark ?? '-',
                    active: data.active ? 'Working' : 'Idle',
                    duration: durationString.trim(),
                };

            });

            console.log(dataMonitoring);

            if(response) {
                setRowsMonitoring(dataMonitoring);
            } else {

            }

        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
        }
    }

    const StyledDataGrid = styled(DataGrid)({
        '& .greenRow': {
            backgroundColor: 'green !important',
            color: 'white !important',
            '& .MuiSvgIcon-root': {
                color: 'white !important',
            },
            '& .MuiTypography-root': {
                color: 'white !important',
            },
            '&:hover': {
                backgroundColor: 'darkgreen !important',
            },
        },
    });

    const columnsMonitoringTeam: GridColDef[] = [
        // { field: "id", headerName: "ID", width: 50, sortable: false },
        { field: "active", headerName: "Active", width: 200, editable: false },
        // { field: "uuid", headerName: "UUID", width: 200, editable: false },
        { field: "pic", headerName: "PIC", width: 200, editable: false },
        { field: "task_name", headerName: "Activity", width: 500, editable: false },
        // { field: "case_name", headerName: "Case", width: 200, editable: false },
        // { field: "team_name", headerName: "Team", width: 200, editable: false },
        {
            field: "start_time",
            headerName: "Start Time",
            width: 200,
            editable: false,
        },
        { field: "end_time", headerName: "End Time", width: 200, editable: false },
        { field: "remark", headerName: "Remark", width: 200, editable: false },
        { field: "duration", headerName: "Duration", width: 200, editable: false },
    ];

    const getRowClassName = (params: GridRowClassNameParams) => {
        return params.row.active === 'Working' ? 'greenRow' : '';
    };

    useEffect(() => {
        setIsLoading(true);
        fetchUser().then(() => {
            // fetchMonitoringUser(userUUID).then(() => {
                setIsLoading(false);
            // });
        });
    }, [userUUID]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <>
            <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
                <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <CustomTypography bold size={'M'}>Activity History</CustomTypography>
                        <IconButton onClick={() => {
                            fetchMonitoringUser(userTeamUUID).then(() => {});
                        }}>
                            <Refresh></Refresh>
                        </IconButton>
                    </div>
                    {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (
                        <>
                            <CustomSpacer height={Constants(2)}></CustomSpacer>

                            <DataGrid columns={columnsMonitoringTeam} rows={rowsMonitoring} sortModel={[{
                                field: 'end_time',
                                sort: 'desc',
                            }]}></DataGrid>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default DevActivityHist;