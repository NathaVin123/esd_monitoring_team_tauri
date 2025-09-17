import CustomTypography from "@/pages/components/mui/CustomTypography";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import CustomButton from "@/pages/components/mui/CustomButton";
import { Add, ArrowBack } from '@mui/icons-material';
import {IconButton, ToggleButton, ToggleButtonGroup} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useRouter} from "next/router";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";
import {ca} from "date-fns/locale";

export const DevProjectTaskPage = () => {
    const router = useRouter();

    const { project_tcode, project_name, task_list, case_list, sa_leader_name } = router.query;

    const task_list2: string = String(task_list);
    const case_list2: string = String(case_list);
    const sa_leader_name2: string = String(sa_leader_name);

    const [saLeaderName, setSaLeaderName] = useState<string | undefined>("");

    const [rowsTask, setRowsTask] = useState<[]>([]);
    const [rowsCase, setRowsCase] = useState<[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);


    const columnsTask: GridColDef[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        {/*<IconButton onClick={() => handleEditRow(params.row)}>*/}
                        {/*    <EditIcon />*/}
                        {/*</IconButton>*/}
                        {/*<IconButton onClick={() => openConfirmDialog(params.row)}>*/}
                        {/*    <DeleteIcon />*/}
                        {/*</IconButton>*/}
                        {/*<IconButton onClick={() => {}}>*/}
                        {/*    <EditIcon />*/}
                        {/*</IconButton>*/}
                        {/*<IconButton onClick={() => {}}>*/}
                        {/*    <DeleteIcon />*/}
                        {/*</IconButton>*/}
                    </div>
                );
            }
        },
        { field: 'id', headerName: 'ID', width: 50, sortable: false },
        { field: 'task_name', headerName: 'Task Name', width: 200, editable: false },
        { field: 'task_description', headerName: 'Task Description', width: 200, editable: false },
    ];

    const columnsCase: GridColDef[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        {/*<IconButton onClick={() => handleEditRow(params.row)}>*/}
                        {/*    <EditIcon />*/}
                        {/*</IconButton>*/}
                        {/*<IconButton onClick={() => openConfirmDialog(params.row)}>*/}
                        {/*    <DeleteIcon />*/}
                        {/*</IconButton>*/}
                        {/*<IconButton onClick={() => {}}>*/}
                        {/*    <EditIcon />*/}
                        {/*</IconButton>*/}
                        {/*<IconButton onClick={() => {}}>*/}
                        {/*    <DeleteIcon />*/}
                        {/*</IconButton>*/}
                    </div>
                );
            }
        },
        { field: 'id', headerName: 'ID', width: 50, sortable: false },
        { field: 'case_name', headerName: 'Case Name', width: 200, editable: false },
        { field: 'case_description', headerName: 'Case Description', width: 200, editable: false },
    ];

    const fetchTask = async () => {
        try {
            const routeAPI: string = '/api/task/getMoreTask';

            const parseTaskList = JSON.parse(task_list2);

            const data = {
                uuid : parseTaskList,
            };

            const response = await axios.post(URLAPI + routeAPI, data);

            let taskData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                task_name: data.task_name,
                task_description: data.task_description,
            }));

            console.log('Task Data : '+JSON.stringify(taskData));

            if(response) {
                setRowsTask(taskData);
            } else {
                console.log('Something wrong');
            }

        } catch (error) {
            console.log(error);
        }
    }

    const fetchCase = async () => {
        try {
            const routeAPI: string = '/api/case/getMoreCase';

            let parseCaseList = JSON.parse(case_list2);

            const data = {
                uuid: parseCaseList,
            }

            const response = await axios.post(URLAPI + routeAPI, data);

            let caseData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                case_name: data.case_name,
                case_description: data.case_description,
            }));

            console.log('Case Data : '+JSON.stringify(caseData));

            if(response) {
                setRowsCase(caseData);
            } else {
                console.log('Something wrong');
            }

        } catch (error) {
            console.log(error);
        }
    }

    const [view, setView] = useState('tasks'); // 'tasks' or 'cases'

    const handleViewChange = (event : any, newView : any) => {
        if (newView !== null) {
            setView(newView);
        }
    };

    const fetchUser = async () => {
        try {
            let dataReq = {
                uuid : sa_leader_name2,
            };

            let response = await axios.post(URLAPI+'/api/user/GetFirstUser', dataReq);

            if(response) {
                setSaLeaderName(response.data.data.full_name);
            } else {
                console.log('Something wrong');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchUser().then(() => {
            fetchTask().then(() => {
                console.log('Fetching Task...');
                fetchCase().then(() => {
                    console.log('Fetching Case...');
                    setIsLoading(false);
                })
            });
        })

        console.log('Done Fetching Task and Case');
    }, []);

    return (
        <>
            <MyAppBar></MyAppBar>
            <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
                <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                    <CustomButton leftIcon={<ArrowBack/>} variant="contained" color="primary" onClick={() => {
                        router.back();
                    }} style={{ marginBottom: '20px' }}>
                        Back
                    </CustomButton>
                    <CustomTypography>{project_name ?? ''} ( {project_tcode ?? ''} )</CustomTypography>
                    <CustomTypography>Leader : {saLeaderName?? '-'}</CustomTypography>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <ToggleButtonGroup
                            value={view}
                            exclusive
                            onChange={handleViewChange}
                            aria-label="view switcher"
                            style={{ marginBottom: '20px' }}
                        >
                            <ToggleButton value="tasks" aria-label="tasks">
                                Tasks
                            </ToggleButton>
                            <ToggleButton value="cases" aria-label="cases">
                                Cases
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    {view === 'tasks' ? (
                        <>
                            <CustomTypography size={'M'}>Task List</CustomTypography>
                            {/*<CustomButton leftIcon={<Add/>} variant="contained" color="primary" onClick={() => {*/}
                            {/*}} style={{ marginBottom: '20px' }}>*/}
                            {/*    New Task*/}
                            {/*</CustomButton>*/}

                            <DataGrid columns={columnsTask} rows={rowsTask}></DataGrid>
                        </>
                    ) : (
                        <>
                            <CustomTypography size={'M'}>Case List</CustomTypography>
                            {/*<CustomButton leftIcon={<Add/>} variant="contained" color="primary" onClick={() => {*/}
                            {/*}} style={{ marginBottom: '20px' }}>*/}
                            {/*    New Case*/}
                            {/*</CustomButton>*/}

                            <DataGrid columns={columnsCase} rows={rowsCase}></DataGrid>
                        </>
                        )
                    }
                    <div>
                    </div>
                </div>
            </div>
            {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (<></>)}
        </>

    );
}

export default DevProjectTaskPage;