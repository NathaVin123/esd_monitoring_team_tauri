import CustomTypography from "@/pages/components/mui/CustomTypography";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import CustomButton from "@/pages/components/mui/CustomButton";
import { Add, ArrowBack } from '@mui/icons-material';
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useRouter} from "next/router";
import axios from "axios";
import {URLAPI} from "@/pages/api/env";

export const DevProjectTaskPage = () => {
    const router = useRouter();

    const { project_tcode, project_name, task_list, case_list } = router.query;

    const [rows, setRows] = useState<[]>([]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50, sortable: false },
        { field: 'task_name', headerName: 'Task Name', width: 200, editable: false },
        { field: 'task_description', headerName: 'Task Description', width: 200, editable: false },
    ];

    const fetchTask = async () => {
        try {
            const routeAPI: string = '/api/task/getTask';

            const data = {
                uuid : task_list,
            };

            const response = await axios.get(URLAPI + routeAPI, data);

            if(response) {
                setRows(response.data.data);
            } else {
                console.log('Something wrong');
            }

        } catch (error) {
            console.error(error);
        }
    }

    const goToCase = () => {
        router.push('/dashboard/project/task/case', {}).then(() => {});
    }

    useEffect(() => {
        console.log('Task List : ' + task_list);
        console.log('Case List : ' + case_list);

        fetchTask().then(() => {});
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
                    <CustomButton leftIcon={<Add/>} variant="contained" color="primary" onClick={() => {
                        router.back();
                    }} style={{ marginBottom: '20px' }}>
                        New Task
                    </CustomButton>
                    <CustomTypography size={'M'}>Task List</CustomTypography>

                    <DataGrid columns={columns} rows={rows} onRowClick={goToCase}></DataGrid>
                    <div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default DevProjectTaskPage;