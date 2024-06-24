import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import CustomButton from "@/pages/components/mui/CustomButton";
import { Add, ArrowBack } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import axios from "axios";
import { URLAPI } from "@/pages/api/env";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton, Input, LinearProgress, Slider,
    ToggleButton,
    ToggleButtonGroup, Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { CustomProgressBarEntireScreen } from "@/pages/components/mui/CustomProgressBar";
import CustomTextField from "@/pages/components/mui/CustomTextField";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import CustomToast from "@/pages/components/mui/CustomToast";

export const TaskCase = () => {
    const router = useRouter();

    const [taskName, setTaskName] = useState<string>("");

    const [caseName, setCaseName] = useState<string>("");

    const [taskDescription, setTaskDescription] = useState<string>("");

    const [caseDescription, setCaseDescription] = useState<string>("");

    const [status, setStatus] = useState<string>("");

    const [statusCase, setStatusCase] = useState<string>("");

    const [startDate, setStartDate] = useState<string>("");

    const [startDateCase, setStartDateCase] = useState<string>("");

    const [endDate, setEndDate] = useState<string>("");

    const [endDateCase, setEndDateCase] = useState<string>("");

    const [isDialogOpenTask, setIsDialogOpenTask] = useState<boolean>(false);

    const [isDialogOpenEditTask, setIsDialogOpenEditTask] = useState<boolean>(false);

    const [isDialogOpenCase, setIsDialogOpenCase] = useState<boolean>(false);

    const [isDialogOpenEditCase, setIsDialogOpenEditCase] = useState<boolean>(false);

    const [selectedRow, setSelectedRow] = useState<any>(null);

    const [selectedEditRow, setSelectedEditRow] = useState<any>(null);

    const [selectedRowCase, setSelectedRowCase] = useState<any>(null);

    const [selectedRowEditCase, setSelectedRowEditCase] = useState<any>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { project_name, project_tcode, uuid } = router.query;

    const [view, setView] = useState("tasks"); // 'tasks' or 'cases'

    const [rowsTask, setRowsTask] = useState<[]>([]);

    const [rowsCase, setRowsCase] = useState<[]>([]);

    const [progressValueTask , setProgressValueTask] = useState<number>(0);

    const [progressValueCase , setProgressValueCase] = useState<number>(0);

    const [uuidEditTask, setUuidEditTask] = useState<string>('');

    const [uuidEditCase, setUuidEditCase] = useState<string>('');

    const [isConfirmDialogOpenTask, setIsConfirmDialogOpenTask] = useState<boolean>(false);

    const [isConfirmDialogOpenCase, setIsConfirmDialogOpenCase] = useState<boolean>(false);

    const handleConfirmDialogCloseTask = () => {
        setIsConfirmDialogOpenTask(false);
    }

    const handleConfirmDialogCloseCase = () => {
        setIsConfirmDialogOpenCase(false);
    }


    const handleNewProgressValue = (e: any) => {
        setProgressValueTask(e.target.value);
    }

    const handleNewProgressValueCase = (e: any) => {
        setProgressValueCase(e.target.value);
    }

    const handleDialogCloseTask = () => {
        setIsDialogOpenTask(false);
        setSelectedRow(null);
    };

    const handleDialogCloseEditTask = () => {
        setIsDialogOpenEditTask(false);
        setSelectedEditRow(null);
    };

    const handleDialogCloseCase = () => {
        setIsDialogOpenCase(false);
        setSelectedRowCase(null);
    };

    const handleDialogCloseEditCase = () => {
        setIsDialogOpenEditCase(false);
        setSelectedRowEditCase(null);
    };

    const handleNewTaskName = (e: any) => {
        setTaskName(e.target.value);
    };

    const handleNewCaseName = (e: any) => {
        setCaseName(e.target.value);
    };

    const handleNewTaskDescription = (e: any) => {
        setTaskDescription(e.target.value);
    };

    const handleNewCaseDescription = (e: any) => {
        setCaseDescription(e.target.value);
    };

    const handleNewStatus = (e: any) => {
        setStatus(e.target.value);
    };

    const handleNewStatusCase = (e: any) => {
        setStatusCase(e.target.value);
    };

    const handleNewStartDate = (e: any) => {
        setStartDate(e.target.value);
    };

    const handleNewStartDateCase = (e: any) => {
        setStartDateCase(e.target.value);
    };

    const handleNewEndDate = (e: any) => {
        setEndDate(e.target.value);
    };

    const handleNewEndDateCase = (e: any) => {
        setEndDateCase(e.target.value);
    };

    const [isOpenToast, setIsOpenToast] = useState<boolean>(false);

    const [messageError, setMessageError] = useState<string>('');

    const handleCloseToast = () => {
        setIsOpenToast(false);
    }

    const handleEditTask = async (row: any) => {
        setUuidEditTask('');
        setSelectedEditRow([]);
        setTaskName('');
        setTaskDescription('');
        setStartDate('');
        setEndDate('');

        setSelectedEditRow(row);

        setUuidEditTask(row.uuid);
        setTaskName(row.task_name);
        setTaskDescription(row.task_description);
        setStatus(row.status);
        setStartDate(row.start_date);
        setEndDate(row.end_date);
        setProgressValueTask(row.progress);

        setIsDialogOpenEditTask(true);
    }

    const handleDeleteTask = async (row : any) => {
        setUuidEditTask(row.uuid);

        setIsConfirmDialogOpenTask(true);
    }

    const handleEditCase = (row :any) => {
        setUuidEditCase('');
        setSelectedRowEditCase([]);
        setCaseName('');
        setTaskDescription('');
        setStartDateCase('');
        setEndDateCase('');

        setSelectedRowEditCase(row);

        setUuidEditCase(row.uuid);
        setCaseName(row.case_name);
        setCaseDescription(row.case_description);
        setStatusCase(row.status);
        setStartDateCase(row.start_date);
        setEndDateCase(row.end_date);
        setProgressValueCase(row.progress);

        setIsDialogOpenEditCase(true);
    }

    const [rowsUserOptions, setRowsUserOptions] = useState<[]>([]);

    const [assignedTask, setAssignedTask] = useState<string>('');
    const [assignedCase, setAssignedCase] = useState<string>('');

    const fetchUserTeamDropdown = async (teamId : string) => {

    }

    const handleDeleteCase = (row: any) => {
        setUuidEditCase(row.uuid);

        setIsConfirmDialogOpenCase(true);
    }

    const columnsTask: GridColDef[] = [
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <IconButton onClick={() => {
                            handleEditTask(params.row).then(r => {});
                        }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => {
                            handleDeleteTask(params.row).then(r => {});
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                );
            },
        },
        { field: "id", headerName: "ID", width: 50, sortable: false },
        { field: "uuid", headerName: "UUID", width: 200, editable: false },
        { field: "task_name", headerName: "Task Name", width: 200, editable: false },
        {
            field: "task_description",
            headerName: "Task Description",
            width: 200,
            editable: false,
        },
        {
            field: "status",
            headerName: "Status",
            width: 200,
            editable: false,
        },
        {
            field: "project",
            headerName: "Project",
            width: 200,
            editable: false,
        },
        {
            field: "start_date",
            headerName: "Start Date",
            width: 200,
            editable: false,
        },
        { field: "end_date", headerName: "End Date", width: 200, editable: false },
        {
            field: "progress",
            headerName: "Progress",
            width: 200,
            editable: false,
            renderCell: (params) => (
                <Box display="flex" alignItems="center" height={'100%'} width="100%">
                    <Box width="100%" mr={1}>
                        <LinearProgress variant="determinate" value={params.value} />
                    </Box>
                    <Box minWidth={35}>
                        <Typography variant="body2" color="textSecondary">{`${params.value}%`}</Typography>
                    </Box>
                </Box>
            ),
        },
        {
            field: "assigned_by",
            headerName: "Assigned By",
            width: 200,
            editable: false,
        },
    ];

    const columnsCase: GridColDef[] = [
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <IconButton onClick={() => {
                            handleEditCase(params.row);
                        }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => {
                            handleDeleteCase(params.row);
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                );
            },
        },
        { field: "id", headerName: "ID", width: 50, sortable: false },
        { field: "uuid", headerName: "UUID", width: 200, editable: false },
        { field: "case_name", headerName: "Case Name", width: 200, editable: false },
        {
            field: "case_description",
            headerName: "Case Description",
            width: 200,
            editable: false,
        },
        {
            field: "status",
            headerName: "Status",
            width: 200,
            editable: false,
        },
        {
            field: "project",
            headerName: "Project",
            width: 200,
            editable: false,
        },
        {
            field: "start_date",
            headerName: "Start Date",
            width: 200,
            editable: false,
        },
        { field: "end_date", headerName: "End Date", width: 200, editable: false },
        {
            field: "progress",
            headerName: "Progress",
            width: 200,
            editable: false,
            renderCell: (params) => (
                <Box display="flex" alignItems="center" width="100%" height={'100%'}>
                    <Box width="100%" mr={1}>
                        <LinearProgress variant="determinate" value={params.value} />
                    </Box>
                    <Box minWidth={35}>
                        <Typography variant="body2" color="textSecondary">{`${params.value}%`}</Typography>
                    </Box>
                </Box>
            ),
        },
        {
            field: "assigned_by",
            headerName: "Assigned By",
            width: 200,
            editable: false,
        },
    ];

    const [userUUID, setUserUUID] = useState<string>("");
    const [userTeam, setUserTeam] = useState<string>("");

    const fetchUser = async () => {
        // setIsLoading(true);

        try {
            const routeAPI: string = "/api/user/getFirstUser";

            const nik = localStorage.getItem("nikUser");

            let dataReq = {
                nik: nik,
            };

            let response = await axios.post(URLAPI + routeAPI, dataReq);

            if (response) {
                let dataUser = response.data.data;

                setUserUUID(dataUser.uuid);
                setUserTeam(dataUser.team_master_id);

                // setIsLoading(true);

                let dataReq = {
                    teamId : dataUser.team_master_id,
                };

                console.log(dataReq);

                console.log(URLAPI+'/api/user/getUserAllTeam');

                try {
                    let response = await axios.post(URLAPI+'/api/user/getAllUserTeam', dataReq);

                    let userData = response.data.data;

                    console.log(userData);

                    if(userData) {
                        let data = userData.map((data : any, index : number) => ({
                            id : index + 1,
                            uuid : data.uuid,
                            user_name: data.full_name,
                        }));

                        console.log('Test 1', userData);

                        let userOptions = data.map((data : any, index : number) => ({
                            key : data.uuid,
                            value: data.user_name,
                        }))

                        console.log(userOptions);

                        setRowsUserOptions(userOptions);

                        console.log(rowsUserOptions);
                    }

                    // setIsLoading(false);
                } catch (error : any) {
                    console.log(error);
                }
            }

            if (!response) {
                console.log("Something Wrong !");
            } else {
                // setIsLoading(false);
            }
        } catch (error: any) {
            await router.replace({
                pathname: "/error",
                query: {
                    message: error.message,
                },
            });
            console.log("Failed to fetch users", error);
        }
    };

    const handleViewChange = (event: any, newView: any) => {
        if (newView !== null) {
            setView(newView);
        }
    };

    const fetchTask = async () => {
        try {
            const routeAPI: string = "/api/task/getTaskWithProjectUUID";

            let taskReq = {
                projectUUID: uuid,
            };

            const response = await axios.post(URLAPI + routeAPI, taskReq);

            let taskData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid,
                task_name: data.task_name,
                task_description: data.task_description,
                status: data.status.status_name ?? '-',
                project: data.project.project_name ?? '-',
                start_date: data.start_date ? moment(data.start_date).format("DD-MM-yyyy hh:mm:ss") : '-',
                end_date: data.end_date ? moment(data.end_date).format("DD-MM-yyyy hh:mm:ss") : '-',
                progress: data.progress,
                assigned_by : data.assigned_by?.full_name ?? '-',
            }));

            setRowsTask(taskData);
        } catch (error: any) {
            await router.replace({
                pathname: "/error",
                query: {
                    message: error.message,
                },
            });
        }
    };

    const fetchCase = async () => {
        try {
            const routeAPI: string = "/api/case/getCaseWithProjectUUID";

            let caseReq = {
                projectUUID: uuid,
            };

            const response = await axios.post(URLAPI + routeAPI, caseReq);

            let caseData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid,
                case_name: data.case_name,
                case_description: data.case_description,
                status: data.status.status_name ?? '-',
                project: data.project.project_name ?? '-',
                start_date: data.start_date ? moment(data.start_date).format("DD-MM-yyyy hh:mm:ss") : '-',
                end_date: data.end_date ? moment(data.end_date).format("DD-MM-yyyy hh:mm:ss") : '-',
                progress: data.progress,
                assigned_by : data.assigned_by?.full_name ?? '-',
            }));

            setRowsCase(caseData);
        } catch (error: any) {
            await router.replace({
                pathname: "/error",
                query: {
                    message: error.message,
                },
            });
        }
    };

    const saveCase = async () => {
        setIsLoading(true);
        setIsDialogOpenCase(false);

        try {
            let dataReq = {
                caseName: caseName,
                caseDescription: caseDescription,
                projectId: uuid,
                statusId: statusCase,
                startDate: new Date(startDateCase),
                endDate: new Date(endDateCase),
                progress: 0,
                createdBy: userUUID,
            };

            console.log(JSON.stringify(dataReq));

            await axios.post(URLAPI + "/api/case/createCase", dataReq);

            await fetchCase();

            setTaskName("");
            setTaskDescription("");
            setStartDate("");
            setEndDate("");
        } catch (error: any) {
            await router.replace({
                pathname: "/error",
                query: {
                    message: error.message,
                },
            });
        }

        setIsLoading(false);
    };

    const saveTask = async () => {
        setIsLoading(true);
        setIsDialogOpenTask(false);

        try {
            let dataReq = {
                taskName: taskName,
                taskDescription: taskDescription,
                projectId: uuid,
                statusId: status,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                progress: 0,
                createdBy: userUUID,
            };

            console.log(JSON.stringify(dataReq));

            await axios.post(URLAPI + "/api/task/createTask", dataReq);

            await fetchTask();

            setTaskName("");
            setTaskDescription("");
            setStartDate("");
            setEndDate("");
        } catch (error: any) {
            await router.replace({
                pathname: "/error",
                query: {
                    message: error.message,
                },
            });
        }

        setIsLoading(false);
    };

    const updateTask = async () => {
        setIsLoading(true);
        setIsDialogOpenEditTask(false);

        try {
            let dataReq = {
                uuid: uuidEditTask,
                taskName: taskName,
                taskDescription: taskDescription,
                statusId: status,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                progress: progressValueTask,
                createdBy: userUUID,
            };

            console.log(JSON.stringify(dataReq));

            await axios.post(URLAPI + "/api/task/updateTask", dataReq);

            await fetchTask();

            setTaskName("");
            setTaskDescription("");
            setStartDate("");
            setEndDate("");
            setProgressValueTask(0);
        } catch (error: any) {
            await router.replace({
                pathname: "/error",
                query: {
                    message: error.message,
                },
            });
        }

        setIsLoading(false);
    };

     const deleteTask = async () => {
        setIsLoading(true);
        setIsConfirmDialogOpenTask(false);

        try {
            let dataReq = {
                uuid: uuidEditTask,
            };

            console.log(JSON.stringify(dataReq));

            await axios.post(URLAPI + "/api/task/deleteTask", dataReq);

            await fetchTask();

            setIsLoading(false);

        } catch (error : any) {
            await router.replace({
                pathname: "/error",
                query: {
                    message: error.message,
                },
            });
        }
    }

    const updateCase = async () => {
        setIsLoading(true);
        setIsDialogOpenEditCase(false);

        try {
            let dataReq = {
                uuid: uuidEditCase,
                caseName: caseName,
                caseDescription: caseDescription,
                statusId: statusCase,
                startDate: new Date(startDateCase),
                endDate: new Date(endDateCase),
                progress: progressValueCase,
                createdBy: userUUID,
            };

            console.log(JSON.stringify(dataReq));

            await axios.post(URLAPI + "/api/case/updateCase", dataReq);

            await fetchCase();

            setCaseName("");
            setCaseDescription("");
            setStartDateCase("");
            setEndDateCase("");
            setProgressValueCase(0);
        } catch (error: any) {
            await router.replace({
                pathname: "/error",
                query: {
                    message: error.message,
                },
            });
        }

        setIsLoading(false);
    };

    const deleteCase = async () => {
        setIsLoading(true);
        setIsConfirmDialogOpenCase(false);

        try {
            let dataReq = {
                uuid: uuidEditCase,
            };

            console.log(JSON.stringify(dataReq));

            await axios.post(URLAPI + "/api/case/deleteCase", dataReq);

            await fetchCase();

            setIsLoading(false);

        } catch (error : any) {
            await router.replace({
                pathname: "/error",
                query: {
                    message: error.message,
                },
            });
        }
    }

    const [statusOptions, setStatusOptions] = useState<[]>([]);

    const [remarkTask, setRemarkTask] = useState<string>('');
    const [remarkCase, setRemarkCase] = useState<string>('');

    const fetchStatus = async () => {
        setIsLoading(true);
        try {
            const routeAPI: string = "/api/status/getAllStatus";
            console.log(URLAPI + routeAPI);

            const response = await axios.get(URLAPI + routeAPI);
            let statusData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid,
                status_name: data.status_name ?? "-",
                status_description: data.status_description ?? "-",
            }));

            console.log(JSON.stringify(statusData));

            let statusOptions = statusData.map((data: any) => ({
                key: data.uuid,
                value: data.status_name,
            }));

            setStatusOptions(statusOptions);

            setIsLoading(false);
        } catch (error: any) {
            await router.replace({
                pathname: "/error",
                query: {
                    message: error.message,
                },
            });
            console.log("Failed to fetch users", error);
        }
    };

    const handleAddDialogCloseTask = () => {
        setIsDialogOpenTask(false);
    };

    const handleAssignedTaskChange = (e: any) => {
        setAssignedTask(e.target.value);
    }

    const handleAssignedCaseChange = (e: any) => {
        setAssignedCase(e.target.value);
    }

    const handleNewRemarkTask = (e: any) => {
        setRemarkTask(e.target.value);
    }

    const handleNewRemarkCase = (e: any) => {
        setRemarkCase(e.target.value);
    }

    const [isDialogOpenAssignedTask, setIsDialogOpenAssignedTask] = useState<boolean>(false);

    const [isDialogOpenAssignedCase, setIsDialogOpenAssignedCase] = useState<boolean>(false);

    const handleDialogOpenAssignedTask = () => {
        setIsDialogOpenAssignedTask(false);
    }

    const handleDialogOpenAssignedCase = () => {
        setIsDialogOpenAssignedCase(false);
    }

    const [taskUUIDAssigned, setTaskUUIDAssigned] = useState<string>('');
    const [caseUUIDAssigned, setCaseUUIDAssigned] = useState<string>('');

    const saveAssignedTask = async () => {
        setIsDialogOpenAssignedTask(false);

        setIsLoading(true);
        console.log('Task UUID : ', taskUUIDAssigned);
        console.log('Team Id : ', userTeam);
        console.log('User Task Assigned Id : ', assignedTask);

        let dataReqFind = {
            userId : assignedTask,
            taskId: taskUUIDAssigned,
            caseId: null,
            teamId: userTeam,
            projectId: uuid,
        };

        console.log('Data Req Find : ', dataReqFind);

        // let responseFind = await axios.post(URLAPI+'/api/monitoring/findExistActivityAssign', dataReqFind);
        //
        // console.log('Response Find : ', responseFind.data);
        //
        // if(responseFind.data.success === false) {
        //     setIsOpenToast(true);
        //     setMessageError('Already Assigned');
        //
        //     setIsLoading(false);
        //     return false;
        // }

        let dataReq = {
            uuidTask: taskUUIDAssigned,
            teamId: userTeam,
            assignedBy: assignedTask,
            projectId : uuid,
            remark: remarkTask,
        };

        console.log(dataReq);

        let response = await axios.post(URLAPI+'/api/monitoring/updateActivityTaskSA', dataReq);

        if(response) {
            console.log('Successfully update Activity Task');
        } else {
            console.log('Something wrong');
        }

        setIsLoading(false);
        await fetchTask();
    }

    const saveAssignedCase = async () => {
        setIsDialogOpenAssignedCase(false);

        setIsLoading(true);

        console.log('Case UUID : ', caseUUIDAssigned);
        console.log('Team Id : ', userTeam);
        console.log('User Case Assigned Id : ', assignedCase);
        console.log('Project : ', uuid);

        let dataReq = {
            uuidCase: caseUUIDAssigned,
            teamId: userTeam,
            assignedBy: assignedCase,
            projectId : uuid,
            remark: remarkCase,
        };

        console.log(dataReq);

        let response = await axios.post(URLAPI+'/api/monitoring/updateActivityCaseSA', dataReq);

        if(response) {
            console.log('Successfully update Activity Case');
        } else {
            console.log('Something wrong');
        }

        setIsLoading(false);
        await fetchCase();
    }

    useEffect(() => {
        setIsLoading(true);
        fetchUser().then(() => {
            fetchStatus().then(() => {
                fetchTask().then(() => {
                    fetchCase().then(() => {
                        // fetchUserTeamDropdown(userTeam).then(() => {
                        //     setIsLoading(false);
                        // })
                        setIsLoading(false);
                    });
                });
            });
        });
    }, []);

    return (
        <>
            <MyAppBar></MyAppBar>
            <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
                <div style={{ height: "100%", overflow: "auto", padding: "20px" }}>
                    <CustomButton
                        leftIcon={<ArrowBack />}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            router.back();
                        }}
                        style={{ marginBottom: "20px" }}
                    >
                        Back
                    </CustomButton>

                    <CustomTypography bold size={'M'}>{project_name ?? ""} ({project_tcode ?? ""})</CustomTypography>

                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
                        <ToggleButtonGroup
                            value={view}
                            exclusive
                            onChange={handleViewChange}
                            aria-label="view switcher"
                            style={{ marginBottom: "20px" }}
                        >
                            <ToggleButton value="tasks" aria-label="tasks">
                                Tasks
                            </ToggleButton>
                            <ToggleButton value="cases" aria-label="cases">
                                Cases
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    {view === "tasks" ? (
                        <>
                            <CustomTypography size={"M"}>Task List</CustomTypography>
                            <CustomButton
                                leftIcon={<Add />}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    console.log("Task Pressed");
                                    setIsDialogOpenTask(true);
                                }}
                                style={{ marginBottom: "20px" }}
                            >
                                New Task
                            </CustomButton>

                            <DataGrid columns={columnsTask} rows={rowsTask} onRowClick={(params: any) => {
                                setTaskUUIDAssigned(params.row.uuid);
                                setIsDialogOpenAssignedTask(true);
                            }}></DataGrid>

                            <Dialog open={isDialogOpenTask} onClose={handleDialogCloseTask}>
                                <DialogTitle>Create Task</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Create task details and save.</DialogContentText>
                                    <CustomTextField
                                        margin="dense"
                                        name="task_name"
                                        label="Task Name"
                                        type="text"
                                        fullWidth
                                        value={taskName}
                                        onChange={handleNewTaskName}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="task_description"
                                        label="Task Description"
                                        type="text"
                                        fullWidth
                                        value={taskDescription}
                                        onChange={handleNewTaskDescription}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="status"
                                        label="Status"
                                        type="select"
                                        fullWidth
                                        value={status}
                                        options={statusOptions}
                                        onChange={handleNewStatus}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="start_date"
                                        label="Start Date"
                                        type="datetime-local"
                                        fullWidth
                                        value={startDate}
                                        onChange={handleNewStartDate}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="end_date"
                                        label="End Date"
                                        type="datetime-local"
                                        fullWidth
                                        value={endDate}
                                        onChange={handleNewEndDate}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <CustomButton variant={"contained"} onClick={handleAddDialogCloseTask}>Cancel</CustomButton>
                                    <CustomButton variant={"contained"} onClick={saveTask}>Save</CustomButton>
                                </DialogActions>
                            </Dialog>

                            <Dialog open={isDialogOpenEditTask} onClose={handleDialogCloseEditTask}>
                                <DialogTitle>Edit Task</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Edit task details and save.</DialogContentText>
                                    <CustomTextField
                                        margin="dense"
                                        name="task_name"
                                        label="Task Name"
                                        type="text"
                                        fullWidth
                                        value={taskName}
                                        onChange={handleNewTaskName}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="task_description"
                                        label="Task Description"
                                        type="text"
                                        fullWidth
                                        value={taskDescription}
                                        onChange={handleNewTaskDescription}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="status"
                                        label="Status"
                                        type="select"
                                        fullWidth
                                        value={status}
                                        options={statusOptions}
                                        onChange={handleNewStatus}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="start_date"
                                        label="Start Date"
                                        type="datetime-local"
                                        fullWidth
                                        value={startDate}
                                        onChange={handleNewStartDate}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="end_date"
                                        label="End Date"
                                        type="datetime-local"
                                        fullWidth
                                        value={endDate}
                                        onChange={handleNewEndDate}
                                    />

                                    <CustomSpacer height={Constants(2)}></CustomSpacer>
                                    <CustomTypography>Progress</CustomTypography>
                                    <Slider
                                        value={progressValueTask}
                                        onChange={handleNewProgressValue}
                                        aria-labelledby="priority-slider"
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={0}
                                        max={100}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <CustomButton variant={"contained"} onClick={handleDialogCloseEditTask}>Cancel</CustomButton>
                                    <CustomButton variant={"contained"} onClick={updateTask}>Save</CustomButton>
                                </DialogActions>
                            </Dialog>

                            <Dialog open={isDialogOpenAssignedTask} onClose={handleDialogOpenAssignedTask}>
                                <DialogTitle>Assigned By</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Choose user assigned task</DialogContentText>
                                    <CustomTextField
                                        margin="dense"
                                        name="assignedCase"
                                        label="User"
                                        type="select"
                                        fullWidth
                                        options={rowsUserOptions}
                                        value={assignedTask}
                                        onChange={handleAssignedTaskChange}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="remark"
                                        label="Remark"
                                        type="text"
                                        fullWidth
                                        value={remarkTask}
                                        onChange={handleNewRemarkTask}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <CustomButton variant={'contained'} onClick={ () => { setIsDialogOpenAssignedTask(false) }}>Cancel</CustomButton>
                                    <CustomButton variant={'contained'} onClick={saveAssignedTask}>Assign</CustomButton>
                                </DialogActions>
                            </Dialog>

                            <Dialog open={isConfirmDialogOpenTask} onClose={handleConfirmDialogCloseTask}>
                                <DialogTitle>Confirm Delete</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Are you sure you want to delete this task?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <CustomButton variant={'contained'} onClick={handleConfirmDialogCloseTask}>Cancel</CustomButton>
                                    <CustomButton variant={'contained'} onClick={deleteTask}>Delete</CustomButton>
                                </DialogActions>
                            </Dialog>
                        </>
                    ) : (
                        <>
                            <CustomTypography size={"M"}>Case List</CustomTypography>
                            <CustomButton
                                leftIcon={<Add />}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    console.log("Case Pressed");
                                    setIsDialogOpenCase(true);
                                }}
                                style={{ marginBottom: "20px" }}
                            >
                                New Case
                            </CustomButton>

                            <DataGrid columns={columnsCase} rows={rowsCase} onRowClick={(params: any) => {
                                setCaseUUIDAssigned(params.row.uuid);

                                setIsDialogOpenAssignedCase(true);
                            }}></DataGrid>

                            <Dialog open={isDialogOpenCase} onClose={handleDialogCloseCase}>
                                <DialogTitle>Create Case</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Create case details and save.</DialogContentText>
                                    <CustomTextField
                                        margin="dense"
                                        name="case_name"
                                        label="Case Name"
                                        type="text"
                                        fullWidth
                                        value={caseName}
                                        onChange={handleNewCaseName}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="case_description"
                                        label="Case Description"
                                        type="text"
                                        fullWidth
                                        value={caseDescription}
                                        onChange={handleNewCaseDescription}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="status"
                                        label="Status"
                                        type="select"
                                        fullWidth
                                        value={statusCase}
                                        options={statusOptions}
                                        onChange={handleNewStatusCase}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="start_date"
                                        label="Start Date"
                                        type="datetime-local"
                                        fullWidth
                                        value={startDateCase}
                                        onChange={handleNewStartDateCase}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="end_date"
                                        label="End Date"
                                        type="datetime-local"
                                        fullWidth
                                        value={endDateCase}
                                        onChange={handleNewEndDateCase}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <CustomButton variant={"contained"} onClick={handleDialogCloseCase}>Cancel</CustomButton>
                                    <CustomButton variant={"contained"} onClick={saveCase}>Save</CustomButton>
                                </DialogActions>
                            </Dialog>

                            <Dialog open={isDialogOpenEditCase} onClose={handleDialogCloseEditCase}>
                                <DialogTitle>Edit Case</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Edit case details and save.</DialogContentText>
                                    <CustomTextField
                                        margin="dense"
                                        name="task_name"
                                        label="Case Name"
                                        type="text"
                                        fullWidth
                                        value={caseName}
                                        onChange={handleNewCaseName}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="task_description"
                                        label="Case Description"
                                        type="text"
                                        fullWidth
                                        value={caseDescription}
                                        onChange={handleNewCaseDescription}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="status"
                                        label="Status"
                                        type="select"
                                        fullWidth
                                        value={statusCase}
                                        options={statusOptions}
                                        onChange={handleNewStatusCase}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="start_date"
                                        label="Start Date"
                                        type="datetime-local"
                                        fullWidth
                                        value={startDateCase}
                                        onChange={handleNewStartDateCase}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="end_date"
                                        label="End Date"
                                        type="datetime-local"
                                        fullWidth
                                        value={endDateCase}
                                        onChange={handleNewEndDateCase}
                                    />

                                    <CustomSpacer height={Constants(2)}></CustomSpacer>
                                    <CustomTypography>Progress</CustomTypography>
                                    <Slider
                                        value={progressValueCase}
                                        onChange={handleNewProgressValueCase}
                                        aria-labelledby="priority-slider"
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={0}
                                        max={100}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <CustomButton variant={"contained"} onClick={handleDialogCloseEditTask}>Cancel</CustomButton>
                                    <CustomButton variant={"contained"} onClick={updateCase}>Save</CustomButton>
                                </DialogActions>
                            </Dialog>

                            <Dialog open={isDialogOpenAssignedCase} onClose={handleDialogOpenAssignedCase}>
                                <DialogTitle>Assigned By</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Choose user assigned case</DialogContentText>
                                    <CustomTextField
                                        margin="dense"
                                        name="assignedCase"
                                        label="User"
                                        type="select"
                                        fullWidth
                                        value={assignedCase}
                                        options={rowsUserOptions}
                                        onChange={handleAssignedCaseChange}
                                    />
                                    <CustomTextField
                                        margin="dense"
                                        name="remark"
                                        label="Remark"
                                        type="text"
                                        fullWidth
                                        value={remarkCase}
                                        onChange={handleNewRemarkCase}
                                    />
                                        <DialogActions>
                                            <CustomButton variant={'contained'} onClick={() => {
                                                setIsDialogOpenAssignedCase(false);
                                            }}>Cancel</CustomButton>
                                            <CustomButton variant={'contained'} onClick={saveAssignedCase}>Assign</CustomButton>
                                        </DialogActions>
                                </DialogContent>
                            </Dialog>

                            {/*<Dialog open={isDialogOpenAssignedCase} onClose={handleDialogOpenAssignedCase}>*/}
                            {/*    <DialogTitle>Assigned By</DialogTitle>*/}
                            {/*    <DialogContentText>Choose user assigned case</DialogContentText>*/}
                            {/*    <CustomTextField*/}
                            {/*        margin="dense"*/}
                            {/*        name="assignedCase"*/}
                            {/*        label="User"*/}
                            {/*        type="select"*/}
                            {/*        fullWidth*/}
                            {/*        options={rowsUserOptions}*/}
                            {/*        value={assignedCase}*/}
                            {/*        onChange={handleAssignedCaseChange}*/}
                            {/*    />*/}
                            {/*    <DialogActions>*/}
                            {/*        <CustomButton variant={'contained'} onClick={() => {*/}
                            {/*            setIsDialogOpenAssignedCase(false);*/}
                            {/*        }}>Cancel</CustomButton>*/}
                            {/*        <CustomButton variant={'contained'} onClick={saveAssignedCase}>Assign</CustomButton>*/}
                            {/*    </DialogActions>*/}
                            {/*</Dialog>*/}

                            <Dialog open={isConfirmDialogOpenCase} onClose={handleConfirmDialogCloseTask}>
                                <DialogTitle>Confirm Delete</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Are you sure you want to delete this case?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <CustomButton variant={'contained'} onClick={handleConfirmDialogCloseCase}>Cancel</CustomButton>
                                    <CustomButton variant={'contained'} onClick={deleteCase}>Delete</CustomButton>
                                </DialogActions>
                            </Dialog>
                        </>
                    )}
                </div>
                <CustomToast open={isOpenToast} onClose={handleCloseToast} message={messageError} severity={'error'}></CustomToast>
            </div>
            {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (<></>)}
        </>
    );
};

export default TaskCase;
