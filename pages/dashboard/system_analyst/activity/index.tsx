import {DataGrid, GridColDef} from "@mui/x-data-grid";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomButton from "@/pages/components/mui/CustomButton";
import {Add, Refresh} from "@mui/icons-material";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {
    Box, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    LinearProgress,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useEffect, useState} from "react";
import {URLAPI} from "@/pages/api/env";
import axios from "axios";
import {useRouter} from "next/router";
import moment from "moment/moment";
import CustomTextField from "@/pages/components/mui/CustomTextField";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";

export const SAActivityPage = () => {
    const columnsCase: GridColDef[] = [
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <IconButton onClick={() => {}}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => {}}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                );
            },
        },
        { field: "id", headerName: "ID", width: 50, sortable: false },
        { field: "uuid", headerName: "UUID", width: 200, editable: false },
        { field: "pic", headerName: "PIC", width: 200, editable: false },
        { field: "task_name", headerName: "Task", width: 200, editable: false },
        { field: "case_name", headerName: "Case", width: 200, editable: false },
        { field: "team_name", headerName: "Team", width: 200, editable: false },
        {
            field: "start_time",
            headerName: "Start Time",
            width: 200,
            editable: false,
        },
        { field: "end_time", headerName: "End Time", width: 200, editable: false },
        { field: "remark", headerName: "Remark", width: 200, editable: false },
        { field: "active", headerName: "Active", width: 200, editable: false },
    ];

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [userUUID, setUserUUID] = useState<string>('');
    const [userTeam, setUserTeam] = useState<string>('');

    const [rows, setRows] = useState<[]>([]);

    const fetchUser = async () => {
        setIsLoading(true);

        try {
            const routeAPI: string = '/api/user/getFirstUser';

            const nik = localStorage.getItem('nikUser');

            let dataReq = {
                nik: nik,
            }

            let response = await axios.post(URLAPI+routeAPI, dataReq);

            if(response) {
                let dataUser = response.data.data;

                console.log('Data User : ', dataUser.team_master_id);

                setUserUUID(dataUser.uuid);
                setUserTeam(dataUser.team_master_id);
            }

            if(!response) {
                console.log('Something Wrong !');
            } else {
                setIsLoading(false);
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

    const fetchActiveUserMonitoring = async (teamId: string) => {
        try {
            console.log('Fetch Monitoring...');

            const routeAPI: string = '/api/monitoring/getMonitoringWithTeam';

            console.log(URLAPI + routeAPI);

            console.log(teamId);

            const dataReq = {
                teamId: teamId,
            };

            let response = await axios.post(URLAPI+routeAPI, dataReq);

            let monitoringData = response.data.data;

            console.log('Monitoring Data : ',monitoringData);

            let monitoringData2 = monitoringData.map((data: any, index: number) => ({
                id: index + 1,
                uuid : data.uuid,
                pic : data.user?.full_name,
                task_name: data.task?.task_name ?? '-',
                case_name: data.case?.case_name ?? '-',
                team_name: data.team?.team_name ?? '-',
                start_time: data.start_time ? moment(data.start_time).format('hh:mm:ss') : '-',
                end_time: data.end_time ? moment(data.end_time).format('hh:mm:ss') : '-',
                remark: data.remark ?? '-',
                active: data.active,
            }));

            console.log(monitoringData2);

            setRows(monitoringData2);

        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.log(error);
        }
    }

    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

    const handleAddDialogClose = () => {
        setIsAddDialogOpen(false);
    }

    const handleNewUserId = (e : any) => {
        setUserId(e.target.value);
    }

    const handleNewTask = (e : any) => {
        setTask(e.target.value);
    }

    const handleNewCase = (e : any) => {
        setCase(e.target.value);
    }

    const handleNewRemark = (e: any) => {
        setRemark(e.target.value);
    }

    const handleAddDialogSave = async () => {
        try {
            let dataReq = {
                userId : userId,
                taskId : task,
                caseId : newCase,
                teamId: userTeam,
                remark: remark,
            };

            console.log(dataReq);

            let response = await axios.post(URLAPI+'/api/monitoring/createActivity', dataReq);

            if(response) {
                console.log('Insert monitoring successfully');
            } else {
                console.log('Something wrong');
            }

            await fetchActiveUserMonitoring(userTeam);

            setIsAddDialogOpen(false);
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.log(error);
        }
    }

    const [userId, setUserId] = useState<string>('')

    const [task, setTask] = useState<string>('');

    const [newCase, setCase] = useState<string>('');

    const [userOptions, setUserOptions] = useState<[]>([]);

    const [taskOptions, setTaskOptions] = useState<[]>([]);

    const [caseOptions, setCaseOptions] = useState<[]>([]);

    const [remark, setRemark] = useState<string>('');

    const fetchUserDropdown = async (teamId : string) => {
        try {
            let dataReq = {
                teamId: teamId,
            };

            const response = await axios.post(URLAPI+'/api/user/getAllUserTeam', dataReq);

            let userData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid ?? '-',
                user_name: data.full_name ?? '-',
            }));

            let userDataOptions = userData.map((data: any) => ({
                key : data.uuid,
                value: data.user_name,
            }));

            setUserOptions(userDataOptions);

        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.log(error);
        }
    }

    const fetchTaskDropdown = async () => {
        try {
            const response = await axios.get(URLAPI+'/api/task/getAllTask');

            let taskData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid ?? '-',
                task_name: data.task_name ?? '-',
            }));

            let taskDataOptions = taskData.map((data: any) => ({
                key : data.uuid,
                value: data.task_name,
            }));


            setTaskOptions(taskDataOptions);

        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.log(error);
        }
    }

    const fetchCaseDropdown = async () => {
        try {
            const response = await axios.get(URLAPI+'/api/case/getAllCase');

            let taskData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid ?? '-',
                case_name: data.case_name ?? '-',
            }));

            let caseDataOptions = taskData.map((data: any) => ({
                key : data.uuid,
                value: data.case_name,
            }));

            setCaseOptions(caseDataOptions);

        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.log(error);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchUser().then(() => {
            fetchActiveUserMonitoring(userTeam).then(() => {
                fetchUserDropdown(userTeam).then(() => {
                    fetchTaskDropdown().then(() => {
                        fetchCaseDropdown().then(() => {
                            setIsLoading(false);
                        });
                    });
                });
            });
        });

    }, [userTeam]);

    return (
        <>
        {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (<></>)}
            <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
                <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                    <div style={{display: 'flex', flexDirection : 'row', alignItems: 'center'}}>
                        <CustomTypography bold size={'M'}>Activity</CustomTypography>
                        <IconButton onClick={() => {
                            fetchActiveUserMonitoring(userTeam).then(() => {});
                        }}>
                            <Refresh></Refresh>
                        </IconButton>
                    </div>

                    <CustomSpacer height={Constants(2)}></CustomSpacer>

                    {/*<CustomButton onClick={() => {*/}
                    {/*    setIsAddDialogOpen(true);*/}
                    {/*}} leftIcon={<Add/>} variant={'contained'}>Add Activity</CustomButton>*/}


                    <DataGrid columns={columnsCase} rows={rows}></DataGrid>

                    <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
                        <DialogTitle>Add User</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Enter user details and save.</DialogContentText>
                            <CustomTextField
                                margin="dense"
                                name="user"
                                label="Assigned By"
                                type="select"
                                fullWidth
                                value={userId}
                                onChange={handleNewUserId}
                                options={userOptions}
                            />
                            <CustomTextField
                                margin="dense"
                                name="task"
                                label="Task"
                                type="select"
                                fullWidth
                                value={task}
                                onChange={handleNewTask}
                                options={taskOptions}
                            />
                            <CustomTextField
                                margin="dense"
                                name="case"
                                label="Case"
                                type="select"
                                fullWidth
                                value={newCase}
                                onChange={handleNewCase}
                                options={caseOptions}
                            />
                            <CustomTextField
                                margin="dense"
                                name="case"
                                label="Case"
                                type="select"
                                fullWidth
                                value={newCase}
                                onChange={handleNewCase}
                                options={caseOptions}
                            />
                            <CustomTextField
                                margin="dense"
                                name="remark"
                                label="Remark"
                                type="text"
                                fullWidth
                                value={remark}
                                onChange={handleNewRemark}
                            />
                        </DialogContent>
                        <DialogActions>
                            <CustomButton variant={'contained'} onClick={handleAddDialogClose}>Cancel</CustomButton>
                            <CustomButton variant={'contained'} onClick={handleAddDialogSave}>Save</CustomButton>
                        </DialogActions>
                    </Dialog>
                </div>
                {/*<DataGrid columns={}></DataGrid>*/}
            </div>
        </>
    );
}

export default SAActivityPage;