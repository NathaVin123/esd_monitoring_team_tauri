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
import {router} from "next/client";
import {Refresh} from "@mui/icons-material";


export const DevProjectPage = () => {
    const [data, setData] = useState<[]>([]);

    const [rows, setRows] = useState<[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const [userUUID, setUserUUID] = useState<string>('');
    const [userTeam, setUserTeam] = useState<string>('');


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

    const fetchProject = async (userId: any) => {
        try {
            setIsLoading(true);
            const routeAPI: string = '/api/project/getUserProject';

            console.log(userId);

            console.log(URLAPI+routeAPI);

            let data = {
                userId: userId,
            };

            const response = await axios.post(URLAPI+routeAPI, data);

            let userProjectData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                project_tcode: data.project.project_tcode,
                project_name: data.project.project_name,
                project_description: data.project.project_description,
                status: data.project.status?.status_name ?? '-',
                team: data.project?.team.team_name ?? '-',
                start_date: data.start_date,
                end_date: data.end_date,
                sa_leader_name: data.project.sa_leader_id,
                task_list: data.project.task_master.map((task : any) => task.uuid),
                case_list: data.project.case_master.map((task : any) => task.uuid),
            }));

            userProjectData.forEach((project : any) => {
                console.log('Task List for project', project.project_name, ':', JSON.stringify(project.task_list));
            });

            setRows(userProjectData);

            setIsLoading(false);
        } catch (error : any) {
            console.log(error);
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
        }
    }

    const goToTask = (params : any) => {
        try {
            const { project_tcode, project_name, task_list, case_list, sa_leader_name} = params.row;
            router.push({
                pathname: '/dashboard/developer/project/task_case',
                query: { project_tcode, project_name, task_list : JSON.stringify(task_list), case_list: JSON.stringify(case_list) , sa_leader_name: sa_leader_name}
            }).then(() => {});
        } catch (error) {
            console.log(error);
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
        { field: 'team', headerName: 'Team', width: 200, editable: false },
        { field: 'status', headerName: 'Status', width: 200, editable: false },
        // { field: 'case_list', headerName: 'Case List', width: 200, editable: false },
        // { field: 'task_list', headerName: 'Task List', width: 200, editable: false },
    ];

    useEffect(() => {
        fetchUser().then(() => {
            fetchProject(userUUID).then(() => {
                setIsLoading(false);
            });
        });
    }, [userUUID]);

    return (
        <>
            <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
                <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                    <div style={{display : 'flex', alignItems: 'center'}}>
                        <CustomTypography bold size={'M'}>Project</CustomTypography>
                        <IconButton onClick={() => {
                            fetchProject(userUUID).then(() => {});
                        }}>
                            <Refresh></Refresh>
                        </IconButton>
                    </div>
                    <DataGrid rows={rows} columns={columns} onRowClick={goToTask}>
                    </DataGrid>
                </div>
            </div>
            {isLoading ? (
                <>
                    <CustomProgressBarEntireScreen />
                </>
            ) : (
                <>
                </>
            )}
        </>
    );
}

export default DevProjectPage;