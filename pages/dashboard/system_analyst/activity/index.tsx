import { DataGrid, GridColDef, GridRowClassNameParams, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { styled } from '@mui/system';
import axios from 'axios';
import moment from 'moment';
import CustomTypography from "@/pages/components/mui/CustomTypography";
import { CustomProgressBarEntireScreen } from "@/pages/components/mui/CustomProgressBar";
import { URLAPI } from "@/pages/api/env";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import CustomButton from "@/pages/components/mui/CustomButton";
import {Refresh} from "@mui/icons-material";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {TiTick} from "react-icons/ti";
import {ca} from "date-fns/locale";

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

interface MonitoringData {
    id: number;
    task_name: string;
    case_name: string;
    start_time: string;
    end_time: string;
    remark: string;
    active: boolean;
    isRunning: boolean;
}

export const SAActivityPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [rowsMonitoring, setRowsMonitoring] = useState<MonitoringData[]>([]);

    const handleStart = async (id: number) => {
        const updatedRows = rowsMonitoring.map(row => row.id === id ? { ...row, isRunning: true } : row);
        setRowsMonitoring(updatedRows);

        const selectedRow = updatedRows.find(row => row.id === id);
        if (selectedRow) {
            await doUpdateMonitoringStart(selectedRow);
        }

        fetchMonitoring(userUUID).then(() => {
            setIsLoading(false);
        });

        setIsRunning(true);
    };

    const handleStop = async (id: number) => {
        const updatedRows = rowsMonitoring.map(row => row.id === id ? { ...row, isRunning: false } : row);
        setRowsMonitoring(updatedRows);

        const selectedRow = updatedRows.find(row => row.id === id);
        if (selectedRow) {
            await doUpdateMonitoringEnd(selectedRow);
        }

        fetchMonitoring(userUUID).then(() => {
            setIsLoading(false);
        });

        setIsRunning(false);
    };

    const doUpdateMonitoringStart = async (params : any) => {
        try {
            setIsLoading(true);
            console.log('Tes Monitoring start : ',params);
            const routeAPI: string = '/api/monitoring/updateMonitoringStart';

            const data = {
                uuid: params.uuid,
            };

            console.log('Data : ', data);

            const response = await axios.post(URLAPI + routeAPI, data);

            if(response) {
                console.log('API Monitoring Start Success');
            } else {
                console.log('Something wrong');
            }

            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    const doUpdateMonitoringEnd = async (params: any) => {
        try {
            setIsLoading(true);
            console.log('Tes Monitoring end : ',params);

            const routeAPI: string = '/api/monitoring/updateMonitoringEnd';

            const data = {
                uuid: params.uuid,
            };

            const response = await axios.post(URLAPI + routeAPI, data);

            if(response) {
                console.log('API Monitoring End Success');
            } else {
                console.log('Something wrong');
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const columnsMonitoring: GridColDef[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            sortable: false,
            renderCell: (params: GridRenderCellParams<MonitoringData>) => {
                return (
                    <div>
                        {!params.row.active ? (
                            <>
                                <IconButton onClick={() => handleStart(params.row.id)}>
                                    <PlayArrowIcon />
                                    <CustomTypography>Start</CustomTypography>
                                </IconButton>
                                {/*IconButton<IconButton onClick={() => {*/}
                                {/*    console.log(params.row);*/}
                                {/*}}>*/}
                                {/*    <TiTick>*/}
                                {/*    </TiTick>*/}
                                {/*    <CustomTypography>Done</CustomTypography>*/}
                                {/*</IconButton>*/}
                            </>

                        ) : (
                            <IconButton onClick={() => handleStop(params.row.id)}>
                                <StopIcon />
                                <CustomTypography>Stop</CustomTypography>
                            </IconButton>
                        )}
                    </div>
                );
            }
        },
        { field: 'id', headerName: 'ID', width: 50, sortable: false },
        { field: 'project_name', headerName: 'Project Name', width: 200, editable: false },
        { field: 'task_name', headerName: 'Activity Name', width: 200, editable: false },
        // { field: 'case_name', headerName: 'Case Name', width: 200, editable: false },
        { field: 'team_name', headerName: 'Team Name', width: 200, editable: false },
        { field: 'start_time', headerName: 'Start Time', width: 200, editable: false },
        { field: 'end_time', headerName: 'End Time', width: 200, editable: false },
        { field: 'duration', headerName: 'Duration', width: 200, editable: false },
    ];

    const fetchMonitoring = async (userId: any) => {
        try {
            console.log('Fetch Monitoring...');
            const routeAPI: string = '/api/monitoring/getMonitoring';

            console.log(URLAPI + routeAPI);

            const data = {
                userId: userId,
            };

            const response = await axios.post(URLAPI + routeAPI, data);

            const activeUserMonitoringData = response.data.data.map((data: any, index: number) => {
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
                    project_name: data.project?.project_name ?? '-',
                    taskId: data.task?.task_name ?? "",
                    caseId: data.case?.case_name ?? "",
                    task_name: data.task?.task_name ? data.task?.task_name ?? '-' : data.case?.case_name ?? '-',
                    team_name: data.team?.team_name ?? '-',
                    start_time: data.start_time ? moment(data.start_time).format('hh:mm:ss') : '-',
                    end_time: data.end_time ? moment(data.end_time).format('hh:mm:ss') : '-',
                    remark: data.remark ?? '-',
                    duration: durationString.trim(),
                    active: data.active
                };
            });

            console.log(activeUserMonitoringData);

            setRowsMonitoring(activeUserMonitoringData);
        } catch (error) {
            console.log(error);
        }
    };

    const [userUUID, setUserUUID] = useState<string>('');

    const [userTeam, setUserTeam] = useState<string>('');

    const router = useRouter();

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
                setUserTeam(dataUser.team_master_id);

                await fetchMonitoring(userUUID);
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

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef: any = useRef(null);

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isRunning]);

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    const formatTime = (time : any) => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes : any = `${Math.floor(time / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    };

    const monitoringDone = async () => {
        try {

            let dataReq = {
                uuid: '',
                taskId : '',
                caseId : '',
            };

            let response = await axios.post(URLAPI+'/api/monitoring/monitoringDone', dataReq);

            if(response) {

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

    useEffect(() => {
        setIsLoading(true);
        fetchUser().then(() => {
            // fetchMonitoring(userUUID).then(() => {
                setIsLoading(false);
            // });
        });

    }, [userUUID]);

    return (
        <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
            <div style={{ height: "100%", overflow: "auto", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <CustomTypography bold size={"M"}>
                        Activity
                    </CustomTypography>
                    <IconButton
                        onClick={() => {
                            fetchMonitoring(userUUID).then(() => {});
                        }}
                    >
                        <Refresh></Refresh>
                    </IconButton>
                </div>

                <h1>{formatTime(time)}</h1>

                <CustomSpacer height={Constants(2)}></CustomSpacer>
                <StyledDataGrid
                    rows={rowsMonitoring}
                    columns={columnsMonitoring}
                    getRowClassName={(params: GridRowClassNameParams) => {
                        if (params.row.active) {
                            return "greenRow";
                        }
                        return "";
                    }}
                />
            </div>
            {isLoading ? (
                <>
                    <CustomProgressBarEntireScreen />
                </>
            ) : (
                <></>
            )}
        </div>
    );


    // const columnsCase: GridColDef[] = [
    //     {
    //         field: "actions",
    //         headerName: "Actions",
    //         width: 100,
    //         sortable: false,
    //         renderCell: (params) => {
    //             return (
    //                 <div>
    //                     <IconButton onClick={() => {}}>
    //                         <EditIcon />
    //                     </IconButton>
    //                     <IconButton onClick={() => {}}>
    //                         <DeleteIcon />
    //                     </IconButton>
    //                 </div>
    //             );
    //         },
    //     },
    //     { field: "id", headerName: "ID", width: 50, sortable: false },
    //     { field: "uuid", headerName: "UUID", width: 200, editable: false },
    //     { field: "pic", headerName: "PIC", width: 200, editable: false },
    //     { field: "task_name", headerName: "Task", width: 200, editable: false },
    //     { field: "case_name", headerName: "Case", width: 200, editable: false },
    //     { field: "team_name", headerName: "Team", width: 200, editable: false },
    //     {
    //         field: "start_time",
    //         headerName: "Start Time",
    //         width: 200,
    //         editable: false,
    //     },
    //     { field: "end_time", headerName: "End Time", width: 200, editable: false },
    //     { field: "remark", headerName: "Remark", width: 200, editable: false },
    //     { field: "active", headerName: "Active", width: 200, editable: false },
    // ];
    //
    // const router = useRouter();
    //
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    //
    // const [userUUID, setUserUUID] = useState<string>('');
    // const [userTeam, setUserTeam] = useState<string>('');
    //
    // const [rows, setRows] = useState<[]>([]);
    //
    // const fetchUser = async () => {
    //     // setIsLoading(true);
    //
    //     try {
    //         const routeAPI: string = '/api/user/getFirstUser';
    //
    //         const nik = localStorage.getItem('nikUser');
    //
    //         let dataReq = {
    //             nik: nik,
    //         }
    //
    //         let response = await axios.post(URLAPI+routeAPI, dataReq);
    //
    //         if(response) {
    //             let dataUser = response.data.data;
    //
    //             console.log('Data User : ', dataUser.team_master_id);
    //
    //             setUserUUID(dataUser.uuid);
    //             setUserTeam(dataUser.team_master_id);
    //         }
    //
    //         if(!response) {
    //             console.log('Something Wrong !');
    //         } else {
    //             // setIsLoading(false);
    //         }
    //     } catch (error : any) {
    //         await router.replace({
    //             pathname: '/error',
    //             query : {
    //                 message: error.message,
    //             }});
    //         console.log("Failed to fetch users", error);
    //     }
    // }
    //
    // const fetchActiveUserMonitoring = async (teamId: string) => {
    //     try {
    //         console.log('Fetch Monitoring...');
    //
    //         const routeAPI: string = '/api/monitoring/getMonitoringWithTeam';
    //
    //         console.log(URLAPI + routeAPI);
    //
    //         console.log(teamId);
    //
    //         const dataReq = {
    //             teamId: teamId,
    //         };
    //
    //         let response = await axios.post(URLAPI+routeAPI, dataReq);
    //
    //         let monitoringData = response.data.data;
    //
    //         console.log('Monitoring Data : ',monitoringData);
    //
    //         let monitoringData2 = monitoringData.map((data: any, index: number) => ({
    //             id: index + 1,
    //             uuid : data.uuid,
    //             pic : data.user?.full_name,
    //             task_name: data.task?.task_name ?? '-',
    //             case_name: data.case?.case_name ?? '-',
    //             team_name: data.team?.team_name ?? '-',
    //             start_time: data.start_time ? moment(data.start_time).format('hh:mm:ss') : '-',
    //             end_time: data.end_time ? moment(data.end_time).format('hh:mm:ss') : '-',
    //             remark: data.remark ?? '-',
    //             active: data.active,
    //         }));
    //
    //         console.log(monitoringData2);
    //
    //         setRows(monitoringData2);
    //
    //     } catch (error : any) {
    //         await router.replace({
    //             pathname: '/error',
    //             query : {
    //                 message: error.message,
    //             }});
    //         console.log(error);
    //     }
    // }
    //
    // const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
    //
    // const handleAddDialogClose = () => {
    //     setIsAddDialogOpen(false);
    // }
    //
    // const handleNewUserId = (e : any) => {
    //     setUserId(e.target.value);
    // }
    //
    // const handleNewTask = (e : any) => {
    //     setTask(e.target.value);
    // }
    //
    // const handleNewCase = (e : any) => {
    //     setCase(e.target.value);
    // }
    //
    // const handleNewRemark = (e: any) => {
    //     setRemark(e.target.value);
    // }
    //
    // const handleAddDialogSave = async () => {
    //     try {
    //         let dataReq = {
    //             userId : userId,
    //             taskId : task,
    //             caseId : newCase,
    //             teamId: userTeam,
    //             remark: remark,
    //         };
    //
    //         console.log(dataReq);
    //
    //         let response = await axios.post(URLAPI+'/api/monitoring/createActivity', dataReq);
    //
    //         if(response) {
    //             console.log('Insert monitoring successfully');
    //         } else {
    //             console.log('Something wrong');
    //         }
    //
    //         await fetchActiveUserMonitoring(userTeam);
    //
    //         setIsAddDialogOpen(false);
    //     } catch (error : any) {
    //         await router.replace({
    //             pathname: '/error',
    //             query : {
    //                 message: error.message,
    //             }});
    //         console.log(error);
    //     }
    // }
    //
    // const [userId, setUserId] = useState<string>('')
    //
    // const [task, setTask] = useState<string>('');
    //
    // const [newCase, setCase] = useState<string>('');
    //
    // const [userOptions, setUserOptions] = useState<[]>([]);
    //
    // const [taskOptions, setTaskOptions] = useState<[]>([]);
    //
    // const [caseOptions, setCaseOptions] = useState<[]>([]);
    //
    // const [remark, setRemark] = useState<string>('');
    //
    // const fetchUserDropdown = async (teamId : string) => {
    //     try {
    //         let dataReq = {
    //             teamId: teamId,
    //         };
    //
    //         const response = await axios.post(URLAPI+'/api/user/getAllUserTeam', dataReq);
    //
    //         let userData = response.data.data.map((data: any, index: number) => ({
    //             id: index + 1,
    //             uuid: data.uuid ?? '-',
    //             user_name: data.full_name ?? '-',
    //         }));
    //
    //         let userDataOptions = userData.map((data: any) => ({
    //             key : data.uuid,
    //             value: data.user_name,
    //         }));
    //
    //         setUserOptions(userDataOptions);
    //
    //     } catch (error : any) {
    //         await router.replace({
    //             pathname: '/error',
    //             query : {
    //                 message: error.message,
    //             }});
    //         console.log(error);
    //     }
    // }
    //
    // const fetchTaskDropdown = async () => {
    //     try {
    //         const response = await axios.get(URLAPI+'/api/task/getAllTask');
    //
    //         let taskData = response.data.data.map((data: any, index: number) => ({
    //             id: index + 1,
    //             uuid: data.uuid ?? '-',
    //             task_name: data.task_name ?? '-',
    //         }));
    //
    //         let taskDataOptions = taskData.map((data: any) => ({
    //             key : data.uuid,
    //             value: data.task_name,
    //         }));
    //
    //
    //         setTaskOptions(taskDataOptions);
    //
    //     } catch (error : any) {
    //         await router.replace({
    //             pathname: '/error',
    //             query : {
    //                 message: error.message,
    //             }});
    //         console.log(error);
    //     }
    // }
    //
    // const fetchCaseDropdown = async () => {
    //     try {
    //         const response = await axios.get(URLAPI+'/api/case/getAllCase');
    //
    //         let taskData = response.data.data.map((data: any, index: number) => ({
    //             id: index + 1,
    //             uuid: data.uuid ?? '-',
    //             case_name: data.case_name ?? '-',
    //         }));
    //
    //         let caseDataOptions = taskData.map((data: any) => ({
    //             key : data.uuid,
    //             value: data.case_name,
    //         }));
    //
    //         setCaseOptions(caseDataOptions);
    //
    //     } catch (error : any) {
    //         await router.replace({
    //             pathname: '/error',
    //             query : {
    //                 message: error.message,
    //             }});
    //         console.log(error);
    //     }
    // }
    //
    // useEffect(() => {
    //     setIsLoading(true);
    //     fetchUser().then(() => {
    //         fetchActiveUserMonitoring(userTeam).then(() => {
    //             fetchUserDropdown(userTeam).then(() => {
    //                 fetchTaskDropdown().then(() => {
    //                     fetchCaseDropdown().then(() => {
    //                         setIsLoading(false);
    //                     });
    //                 });
    //             });
    //         });
    //     });
    //
    // }, [userTeam]);
    //
    // return (
    //     <>
    //     {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (<></>)}
    //         <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
    //             <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
    //                 <div style={{display: 'flex', flexDirection : 'row', alignItems: 'center'}}>
    //                     <CustomTypography bold size={'M'}>Activity</CustomTypography>
    //                     <IconButton onClick={() => {
    //                         fetchActiveUserMonitoring(userTeam).then(() => {});
    //                     }}>
    //                         <Refresh></Refresh>
    //                     </IconButton>
    //                 </div>
    //
    //                 <CustomSpacer height={Constants(2)}></CustomSpacer>
    //
    //                 {/*<CustomButton onClick={() => {*/}
    //                 {/*    setIsAddDialogOpen(true);*/}
    //                 {/*}} leftIcon={<Add/>} variant={'contained'}>Add Activity</CustomButton>*/}
    //
    //
    //                 <DataGrid columns={columnsCase} rows={rows}></DataGrid>
    //
    //                 <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
    //                     <DialogTitle>Add User</DialogTitle>
    //                     <DialogContent>
    //                         <DialogContentText>Enter user details and save.</DialogContentText>
    //                         <CustomTextField
    //                             margin="dense"
    //                             name="user"
    //                             label="Assigned By"
    //                             type="select"
    //                             fullWidth
    //                             value={userId}
    //                             onChange={handleNewUserId}
    //                             options={userOptions}
    //                         />
    //                         <CustomTextField
    //                             margin="dense"
    //                             name="task"
    //                             label="Task"
    //                             type="select"
    //                             fullWidth
    //                             value={task}
    //                             onChange={handleNewTask}
    //                             options={taskOptions}
    //                         />
    //                         <CustomTextField
    //                             margin="dense"
    //                             name="case"
    //                             label="Case"
    //                             type="select"
    //                             fullWidth
    //                             value={newCase}
    //                             onChange={handleNewCase}
    //                             options={caseOptions}
    //                         />
    //                         <CustomTextField
    //                             margin="dense"
    //                             name="case"
    //                             label="Case"
    //                             type="select"
    //                             fullWidth
    //                             value={newCase}
    //                             onChange={handleNewCase}
    //                             options={caseOptions}
    //                         />
    //                         <CustomTextField
    //                             margin="dense"
    //                             name="remark"
    //                             label="Remark"
    //                             type="text"
    //                             fullWidth
    //                             value={remark}
    //                             onChange={handleNewRemark}
    //                         />
    //                     </DialogContent>
    //                     <DialogActions>
    //                         <CustomButton variant={'contained'} onClick={handleAddDialogClose}>Cancel</CustomButton>
    //                         <CustomButton variant={'contained'} onClick={handleAddDialogSave}>Save</CustomButton>
    //                     </DialogActions>
    //                 </Dialog>
    //             </div>
    //             {/*<DataGrid columns={}></DataGrid>*/}
    //         </div>
    //     </>
    // );
}

export default SAActivityPage;