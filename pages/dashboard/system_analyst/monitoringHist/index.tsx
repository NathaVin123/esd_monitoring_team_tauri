import CustomTypography from "@/pages/components/mui/CustomTypography";
import React, {useEffect, useState} from "react";
import {Refresh} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {ca} from "date-fns/locale";
import {useRouter} from "next/router";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {DataGrid, GridColDef, GridRowClassNameParams} from "@mui/x-data-grid";
import moment from "moment";
import {styled} from "@mui/system";

export const SAMonitoringHistPage = () => {
    const router = useRouter();

    const [userUUID, setUserUUID] = useState<string>('');

    const [userTeamUUID, setUserTeamUUID] = useState<string>('');

    const [monitoringHistRows, setMonitoringHistRows] = useState<[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchUser = async () => {
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

                await fetchMonitoringHist(userTeamUUID);
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

    const fetchMonitoringHist = async (userTeamUUID : string) => {
        try {
            const routeAPI: string = '/api/monitoring/getMonitoringHistTeam';

            let dateReq = {
                teamId : userTeamUUID,
            }

            console.log('Data Req : ',dateReq);

            let response = await axios.post(URLAPI+routeAPI, dateReq);

            console.log(response.data);


            let dataMonitoringHist = response.data.data.map((data: any, index: number) => {
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
                    user: data.user_master_id ?? '-',
                    activity: data.task_master_id ? data.task_master_id : data.case_master_id,
                    case: data.case_master_id ?? '-',
                    // team: data.team_master_id,
                    project: data.project_master_id ?? '-',
                    remark: data.remark,
                    start_time: data.start_time ? (moment(data.start_time).format('DD/MM/YYYY HH:mm:ss')) : '-',
                    end_time: data.end_time ? (moment(data.end_time).format('DD/MM/YYYY HH:mm:ss')) : '-',
                    active: data.active,
                    duration: durationString.trim(),
                    type: data.type,
                    created_at: data.created_at ? (moment(data.created_at).format('DD/MM/YYYY HH:mm:ss')) : '-',
                };
            });

            console.log('Data Monitoring History : '+dataMonitoringHist);

            if(response) {
                setMonitoringHistRows(dataMonitoringHist)
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

    const columnsMonitoringHistTeam: GridColDef[] = [
        { field: "id", headerName: "ID", width: 50, sortable: false },
        { field: "created_at", headerName: "Date", width: 200, editable: false, },
        { field: "user", headerName: "User", width: 200, editable: false },
        // { field: "team", headerName: "Team", width: 200, editable: false },
        { field: "project", headerName: "Project", width: 200, editable: false },
        { field: "activity", headerName: "Activity", width: 200, editable: false },
        { field: "remark", headerName: "Remark", width: 200, editable: false },
        { field: "start_time", headerName: "Start Time", width: 500, editable: false },
        { field: "end_time", headerName: "End Time", width: 200, editable: false },
        { field: "active", headerName: "Active", width: 200, editable: false },
        { field: "duration", headerName: "Duration", width: 200, editable: false },
    ];

    const getRowClassName = (params: GridRowClassNameParams) => {
        return params.row.active ? 'greenRow' : '';
    };

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

    useEffect(() => {
        setIsLoading(true);
        fetchUser().then(() => {
            // fetchMonitoringHist(userTeamUUID).then(() => {
                setIsLoading(false);
            // })
        })
    }, [userTeamUUID]);

    return (
        <>
            <div style={{height: '100vh', width: '100%', overflow: 'hidden'}}>
                <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <CustomTypography bold size={'M'}>Monitoring History</CustomTypography>
                        <IconButton onClick={() => {
                            fetchMonitoringHist(userTeamUUID).then(() => {});
                        }}>
                            <Refresh></Refresh>
                        </IconButton>
                    </div>

                    {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (
                        <>
                            <CustomSpacer height={Constants(2)}></CustomSpacer>

                            <DataGrid columns={columnsMonitoringHistTeam} rows={monitoringHistRows}
                                sortModel={[{
                                    field: 'created_at',
                                    sort: 'desc',
                                }]} getRowClassName={getRowClassName}></DataGrid>
                        </>
                    )}
                </div>

            </div>
        </>
    );
}

export default SAMonitoringHistPage;