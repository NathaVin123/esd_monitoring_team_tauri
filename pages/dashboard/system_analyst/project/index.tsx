import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomButton from "@/pages/components/mui/CustomButton";
import React, {useEffect, useState} from "react";
import {
    AlertColor,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from "@mui/material";
import CustomTextField from "@/pages/components/mui/CustomTextField";
import axios from "axios";
import CustomToast from "@/pages/components/mui/CustomToast";
import {router} from "next/client";
import {URLAPI} from "@/pages/api/env";
import moment from "moment/moment";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";
import {end} from "@popperjs/core";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {Add} from "@mui/icons-material";
import {DatePicker} from "@mui/x-date-pickers";
import {ca} from "date-fns/locale";
import {useRouter} from "next/router";

export const SAProjectPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter(); // Initialize useRouter

    const [isAddDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isAEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

    const [selectedRow, setSelectedRow] = useState<any>(null);

    const [selectedEditRow, setSelectedEditRow] = useState<any>(null);

    const [projectTcode, setProjectTcode] = useState<string>('');

    const [projectName, setProjectName] = useState<string>('');
    const [projectDescription, setProjectDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const [message, setMessage] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [statusOptions, setStatusOptions] = useState<[]>([]);

    const [severity, setSeverity] = useState<AlertColor>('info');

    const [userUUID, setUserUUID] = useState<string>('');
    const [userTeam, setUserTeam] = useState<string>('');

    const [rows, setRows] = useState<[]>([]);

    const [projectUUID, setProjectUUID] = useState<string>('');

    const [isConfirmDialog, setIsConfirmDialog] = useState<boolean>(false);

    const handleCloseConfirmDialog = () => {
        setIsConfirmDialog(false);
    }

    const handleCloseToast = () => {
        setIsOpen(false);
    };

    const handleAddProject = () => {
        setIsDialogOpen(true);
    }

    const handleAddDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedRow(null);
    };

    const handleEditDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedEditRow(null);
    };

    const handleNewProjectTcode = (e : any) => {
        setProjectTcode(e.target.value);
    }

    const handleNewProject = (e: any) => {
        setProjectName(e.target.value);
    }

    const handleNewProjectDescription = (e: any) => {
        setProjectDescription(e.target.value);
    }

    const handleNewStartDate = (e: any) => {
        setStartDate(e.target.value);
    }

    const handleNewEndDate = (e: any) => {
        setEndDate(e.target.value);
    }

    const handleNewStatus = (e: any) => {
        setStatus(e.target.value);
    }

    const handleEditRow = (row : any) => {
        setProjectUUID('');
        setProjectTcode('');
        setProjectName('');
        setProjectDescription('');
        setStartDate('');
        setEndDate('');
        setIsEditDialogOpen(true);

        setProjectUUID(row.uuid);
        setProjectTcode(row.project_tcode);
        setProjectName(row.project_name);
        setProjectDescription(row.project_description);
        setStartDate(row.start_date);
        setEndDate(row.end_date);
    }

    const openConfirmDialog = (row : any) => {
        setProjectUUID(row.uuid);
        setIsConfirmDialog(true);
    }

    const columns: GridColDef[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div style={{position: 'relative'}}>
                        <IconButton onClick={(event) =>{
                            event.stopPropagation();
                            handleEditRow(params.row)
                        } }>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={(event) => {
                            event.stopPropagation();
                            openConfirmDialog(params.row)
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                );
            }
        },
        { field: 'id', headerName: 'No', width: 50, sortable: true },
        { field: 'uuid', headerName: 'UUID', width: 200, editable: false },
        { field: 'project_tcode', headerName: 'Project Tcode', width: 200, editable: false },
        { field: 'project_name', headerName: 'Project Name', width: 200, editable: false },
        { field: 'sa_leader_name', headerName: 'SA Leader', width: 200, editable: false },
        { field: 'start_date', headerName: 'Start Date', width: 200, editable: false },
        { field: 'end_date', headerName: 'End Date', width: 200, editable: false },
        { field: 'status', headerName: 'Status', width: 200, editable: false },
        { field: 'created_at', headerName: 'Created At', width: 200, editable: false},
        { field: 'updated_at', headerName: 'Updated At', width: 200, editable: false},
        // { field: 'created_by', headerName: 'Created By', width: 200, editable: false},
        // { field: 'updated_by', headerName: 'Updated By', width: 200, editable: false},
    ];

    const saveProject = async () => {
        try {
            console.log(projectName);
            console.log(projectDescription);
            console.log(startDate);
            console.log(endDate);
            console.log(status);
            console.log(userUUID);
            console.log(userTeam);

            // let saveProject = '';

            let dataProject = {
                projectTcode: projectTcode,
                projectName : projectName,
                projectDescription: projectDescription,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                statusId : status,
                saLeaderId : userUUID,
                teamId : userTeam,
                userId: userUUID,
            }

            let saveProject = await axios.post(URLAPI+'/api/project/createProject', dataProject);

            if(!saveProject) {
                setMessage('Something wrong');
                setSeverity('error');
                setIsOpen(true);
                return false;
            }

            setMessage('Successfully Add Project');
            setSeverity('success');
            setIsOpen(true);

            setIsDialogOpen(false);

            fetchProject(userUUID).then(() => {});
            return false;
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.log("Failed to save project", error);
        }
    }

    const goToTaskCase = async (params: any) => {
        const { project_tcode, project_name, uuid } = params.row;

        router.push({pathname : '/dashboard/system_analyst/project/task_case', query: {
                project_tcode, project_name, uuid
            }}).then(() => {

            })
    }

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
                setUserTeam(dataUser.team_master_id);
            }

            if(!response) {
                console.log('Something Wrong !');
            } else {
                // setIsLoading(false);
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

    const fetchStatus = async () => {
        // setIsLoading(true);
        try {
            const routeAPI: string = '/api/status/getAllStatus';
            console.log(URLAPI+routeAPI);

            const response = await axios.get(URLAPI+routeAPI);
            let statusData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid,
                status_name: data.status_name ?? '-',
                status_description: data.status_description ?? '-',
            }));

            console.log(JSON.stringify(statusData));

            let statusOptions = statusData.map((data: any) => ({
                key: data.uuid,
                value: data.status_name,
            }));

            setStatusOptions(statusOptions);

            // setStatus(statusOptions);
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

    const fetchProject = async (userUUID: string) => {
        try {
            // setIsLoading(true);

            let dataReq = {
                saLeaderId: userUUID,
            };

            const routeAPI: string = '/api/project/getAllProjectUserId';
            console.log(URLAPI+routeAPI);

            const response = await axios.post(URLAPI+routeAPI, dataReq);
            let projectData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid,
                project_tcode: data.project_tcode ?? '-',
                project_name: data.project_name ?? '-',
                project_description: data.project_description ?? '-',
                sa_leader_name: data.sa_leader.full_name ?? '-',
                start_date: data.start_date ? moment(data.start_date).format('DD/MM/YYYY hh:mm:ss') : '-',
                end_date: data.start_date ? moment(data.start_date).format('DD/MM/YYYY hh:mm:ss') : '-',
                status: data.status.status_name ?? '-',
                created_at: data.created_at ? moment(data.created_at).format('DD/MM/YYYY hh:mm:ss') : '-',
                created_by: data.created_by ?? '-',
                updated_at: data.updated_at ? moment(data.updated_at).format('DD/MM/YYYY hh:mm:ss') : '-',
                updated_by: data.update_by ?? '-',
            }));

            setRows(projectData);

            // setIsLoading(false);
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.log("Failed to fetch users", error);
        }
    };

    const updateProject = async () => {
        setIsEditDialogOpen(false);

        setIsLoading(true);

        try {

            let dataReq = {
                uuid: projectUUID,
                projectTcode: projectTcode,
                projectName : projectName,
                projectDescription: projectDescription,
                statusId: status,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                userId : userUUID,
            };

            let response = await axios.post(URLAPI+'/api/project/updateProjectNew', dataReq);

            if(response) {
                setMessage('Successfully Update Project');
                setSeverity('success');
                setIsOpen(true);
            } else {
                setMessage('Something wrong when Update Project');
                setSeverity('error');
                setIsOpen(true);
            }

            setIsLoading(false);

            await fetchProject(userUUID);

        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
        }

    }

    const deleteProject = async () => {
        setIsConfirmDialog(false);
        setIsLoading(true);
        try {
            let dataReq = {
                uuid: projectUUID,
            };

            let deleteProject = await axios.post(URLAPI+'/api/project/deleteProject', dataReq);

            if(deleteProject) {
                setMessage('Successfully delete Project');
                setSeverity('success');
                setIsOpen(true);
            } else {
                setMessage('Something wrong delete project');
                setSeverity('error');
                setIsOpen(true);
            }

            setIsLoading(false);

            await fetchProject(userUUID).then(() => {});
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});

            console.log("Failed to fetch users", error);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchStatus().then(() => {
            fetchUser().then(() => {
                fetchProject(userUUID).then(() => {
                    // fetchUserTeamDropdown().then(() => {
                        setMessage('Successfully Fetch Project');
                        setSeverity('success');
                        setIsOpen(true);

                        setIsLoading(false);
                    // });
                });
            })
        });
    }, [userUUID]);

    return (
        <>
            {isLoading ? (<CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>) : (<></>)}
            <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
                <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                    <CustomTypography bold size={'M'}>Project</CustomTypography>
                    <CustomSpacer height={Constants(2)}></CustomSpacer>
                    <CustomButton leftIcon={<Add/>} variant="contained" onClick={handleAddProject}>Add Project</CustomButton>
                    <CustomSpacer height={Constants(2)}></CustomSpacer>
                    <DataGrid columns={columns} rows={rows} onRowClick={goToTaskCase}></DataGrid>
                </div>

                <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
                    <DialogTitle>Add Project</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Enter project details and save.</DialogContentText>
                        <CustomTextField
                            margin="dense"
                            name="project_tcode"
                            label="Project Tcode"
                            type="text"
                            fullWidth
                            value={projectTcode}
                            onChange={handleNewProjectTcode}
                        />
                        <CustomTextField
                            margin="dense"
                            name="project_name"
                            label="Project Name"
                            type="text"
                            fullWidth
                            value={projectName}
                            onChange={handleNewProject}
                        />
                        <CustomTextField
                            margin="dense"
                            name="project_description"
                            label="Project Description"
                            type="text"
                            fullWidth
                            value={projectDescription}
                            onChange={handleNewProjectDescription}
                        />
                        <CustomTextField
                            margin="dense"
                            name="start_date"
                            label="Start Date"
                            type="date"
                            fullWidth
                            value={startDate}
                            onChange={handleNewStartDate}
                        />
                        <CustomTextField
                            margin="dense"
                            name="end_date"
                            label="End Date"
                            type="date"
                            fullWidth
                            value={endDate}
                            onChange={handleNewEndDate}
                        />
                        <CustomTextField
                            margin="dense"
                            name="status"
                            label="Status"
                            type="select"
                            options={statusOptions}
                            fullWidth
                            value={status}
                            onChange={handleNewStatus}
                        />
                    </DialogContent>
                    <DialogActions>
                        <CustomButton variant={'contained'} onClick={handleAddDialogClose}>Cancel</CustomButton>
                        <CustomButton variant={'contained'} onClick={saveProject}>Save</CustomButton>
                    </DialogActions>
                </Dialog>

                <Dialog open={isAEditDialogOpen} onClose={handleEditDialogClose}>
                    <DialogTitle>Edit Project</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Enter project details and save.</DialogContentText>
                        <CustomTextField
                            margin="dense"
                            name="project_tcode"
                            label="Project Tcode"
                            type="text"
                            fullWidth
                            value={projectTcode}
                            onChange={handleNewProjectTcode}
                        />
                        <CustomTextField
                            margin="dense"
                            name="project_name"
                            label="Project Name"
                            type="text"
                            fullWidth
                            value={projectName}
                            onChange={handleNewProject}
                        />
                        <CustomTextField
                            margin="dense"
                            name="project_description"
                            label="Project Description"
                            type="text"
                            fullWidth
                            value={projectDescription}
                            onChange={handleNewProjectDescription}
                        />
                        <CustomTextField
                            margin="dense"
                            name="start_date"
                            label="Start Date"
                            type="date"
                            fullWidth
                            value={startDate}
                            onChange={handleNewStartDate}
                        />
                        <CustomTextField
                            margin="dense"
                            name="end_date"
                            label="End Date"
                            type="date"
                            fullWidth
                            value={endDate}
                            onChange={handleNewEndDate}
                        />
                        <CustomTextField
                            margin="dense"
                            name="status"
                            label="Status"
                            type="select"
                            options={statusOptions}
                            fullWidth
                            value={status}
                            onChange={handleNewStatus}
                        />
                    </DialogContent>
                    <DialogActions>
                        <CustomButton variant={'contained'} onClick={handleEditDialogClose}>Cancel</CustomButton>
                        <CustomButton variant={'contained'} onClick={updateProject}>Save</CustomButton>
                    </DialogActions>
                </Dialog>

                <Dialog open={isConfirmDialog} onClose={handleCloseConfirmDialog}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this project?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <CustomButton variant={'contained'} onClick={handleCloseConfirmDialog}>Cancel</CustomButton>
                        <CustomButton variant={'contained'} onClick={() => {
                            deleteProject().then(r => {});
                        }}>Delete</CustomButton>
                    </DialogActions>
                </Dialog>

                <CustomToast open={isOpen} onClose={handleCloseToast} message={message} severity={severity}></CustomToast>
            </div>
        </>

    );
}

export default SAProjectPage;