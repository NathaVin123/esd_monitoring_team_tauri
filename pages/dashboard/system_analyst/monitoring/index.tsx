import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomButton from "@/pages/components/mui/CustomButton";
import {DataGrid, GridColDef, GridRowClassNameParams} from "@mui/x-data-grid";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useEffect, useState} from "react";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {router} from "next/client";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";
import moment from "moment";
import {styled} from "@mui/system";
import {Refresh} from "@mui/icons-material";
import {useRouter} from "next/router";

export const SAMonitoringPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [rowsMonitoring, setRowsMonitoring] = useState<[]>([]);

    const router = useRouter(); // Initialize useRouter


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
        { field: "team_name", headerName: "Team", width: 200, editable: false },
        {
            field: "start_time",
            headerName: "Start Time",
            width: 200,
            editable: false,
        },
        { field: "end_time", headerName: "End Time", width: 200, editable: false },
        { field: "remark", headerName: "Remark", width: 200, editable: false },
    ];

    const [userUUID, setUserUUID] = useState<string>('');
    const [userTeamUUID, setUserTeamUUID] = useState<string>('');
    const [userTeamName, setUserTeamName] = useState<string>('');

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
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.log("Failed to fetch users", error);
        }
    }


    const fetchTeam = async (userTeamUUID : string) => {
        try {
            let data = {
                uuid: userTeamUUID,
            };

            let response = await axios.post(URLAPI+'/api/team/getTeam', data);

            let teamData = response.data.data ?? [];

            setUserTeamName(teamData.team_name);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchMonitoring = async (userTeamUUID : string) => {
        try {
            // setIsLoading(true);
            let dataReq = {
                teamId: userTeamUUID,
            };

            console.log(dataReq);

            let response = await axios.post(URLAPI+'/api/monitoring/getAllMonitoringTeam', dataReq);

            let dataMonitoring = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid : data.uuid,
                pic : data.user?.full_name,
                task_name: data.task?.task_name ? data.task?.task_name + '(Task)' : data.case?.case_name + '(Case)',
                team_name: data.team?.team_name ?? '-',
                start_time: data.start_time ? moment(data.start_time).format('DD-MM-yyyy hh:mm:ss') : '-',
                end_time: data.end_time ? moment(data.end_time).format('DD-MM-yyyy hh:mm:ss') : '-',
                remark: data.remark ?? '-',
                active: data.active ? 'Working' : 'Idle',
            }));

            console.log('Team Monitoring : ', dataMonitoring);

            setRowsMonitoring(dataMonitoring);
            // setIsLoading(false);
        } catch (error: any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
        }
    }

    const getRowClassName = (params: GridRowClassNameParams) => {
        return params.row.active === 'Working' ? 'greenRow' : '';
    };

    useEffect(() => {
        setIsLoading(true);
        fetchUser().then(() => {
            fetchTeam(userTeamUUID).then(() => {
                fetchMonitoring(userTeamUUID).then(() => {
                    setIsLoading(false);
                })
            });
        });
    }, [userTeamUUID, userTeamName]);


    return (
        <>
            <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
                <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <CustomTypography bold size={'M'}>Monitoring Team {userTeamName ?? '-'}</CustomTypography>
                        <IconButton onClick={() => {
                            fetchMonitoring(userTeamUUID).then(() => {});
                        }}>
                            <Refresh></Refresh>
                        </IconButton>
                    </div>
                    {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (
                        <>
                            <CustomSpacer height={Constants(2)}></CustomSpacer>
                            {/*<DataGrid columns={columnsMonitoringTeam} rows={rowsMonitoring}></DataGrid>*/}
                            <StyledDataGrid
                                sortModel={[
                                    {
                                        field: 'active',
                                        sort: 'desc',
                                    },
                                ]}
                                columns={columnsMonitoringTeam}
                                rows={rowsMonitoring}
                                getRowClassName={getRowClassName}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );


}

export default SAMonitoringPage;