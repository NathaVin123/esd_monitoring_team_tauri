import CustomTypography from "@/pages/components/mui/CustomTypography";
import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import React, {useEffect, useState} from "react";
import {URLAPI} from "@/pages/api/env";
import axios from "axios";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";
import {useRouter} from "next/router";


export const DevProjectPage = () => {
    const [data, setData] = useState<[]>([]);

    const [rows, setRows] = useState<[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const fetchProject = async (userId: any) => {
        try {
            setIsLoading(true);
            const routeAPI: string = '/api/project/getUserProject';

            console.log(URLAPI+routeAPI);

            const response = await axios.post(URLAPI+routeAPI, userId);

            let userProjectData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                project_tcode: data.project.project_tcode,
                project_name: data.project.project_name,
                sa_leader_name: data.project.sa_leader.full_name,
                task_list: data.project.task_master.map((task : any) => task.uuid),
                case_list: data.project.case_master.map((task : any) => task.uuid),
            }));

            userProjectData.forEach((project : any) => {
                console.log('Task List for project', project.project_name, ':', JSON.stringify(project.task_list));
            });

            setRows(userProjectData);
        } catch (error) {
            console.error(error);
        }
    }

    const goToTask = (params : any) => {
        try {
            const { project_tcode, project_name, task_list, case_list, sa_leader_name} = params.row;
            router.push({
                pathname: '/dashboard/developer/project/task',
                query: { project_tcode, project_name, task_list : JSON.stringify(task_list), case_list: JSON.stringify(case_list) , sa_leader_name: sa_leader_name}
            }).then(() => {});
        } catch (error) {
            console.error(error);
        }
    }

    const columns: GridColDef[] = [
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     width: 100,
        //     sortable: false,
        //     renderCell: (params) => {
        //         return (
        //             <div>
        //                 <IconButton onClick={() => handleEditRow(params.row)}>
        //                     <EditIcon />
        //                 </IconButton>
        //                 <IconButton onClick={() => openConfirmDialog(params.row)}>
        //                     <DeleteIcon />
        //                 </IconButton>
        //             </div>
        //         );
        //     }
        // },
        { field: 'id', headerName: 'ID', width: 50, sortable: false },
        { field: 'project_tcode', headerName: 'Tcode', width: 200, editable: false },
        { field: 'project_name', headerName: 'Project Name', width: 200, editable: false },
        // { field: 'case_list', headerName: 'Case List', width: 200, editable: false },
        // { field: 'task_list', headerName: 'Task List', width: 200, editable: false },
    ];

    useEffect(() => {
        const data  = {
            userId : 'f6ab8c06-2bff-45f1-a857-630b98bee836daf',
        };
       fetchProject(data).then(() => {
           setIsLoading(false);
       });
    }, []);

    return (
        <>
            <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
                <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                    <CustomTypography size={'M'}>Project</CustomTypography>
                    <div>
                        {isLoading ? (
                            <CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>
                        ) : (
                            <>
                                <DataGrid rows={rows} columns={columns} onRowClick={goToTask}>
                                </DataGrid>

                            </>

                        )}
                    </div>
                </div>
            </div>
        </>

    );
}

export default DevProjectPage;