import React, {useEffect, useState} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {URLAPI} from "@/pages/api/env";
import axios from "axios";
import moment from "moment";
import {router} from "next/client";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import CustomButton from "@/pages/components/mui/CustomButton";
import RefreshIcon from "@mui/icons-material/Refresh";

export const TaskMaster = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [rows, setRows] = useState<[]>([]);

    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const handleEditRow = (id: string) => {

    }

    const openConfirmDialog = (id: string) => {

    }

    const handleAddRow = () => {

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
        { field: 'id', headerName: 'ID', width: 50, sortable: true },
        { field: 'uuid', headerName: 'UUID', width: 200, editable: false },
        { field: 'task_name', headerName: 'Task Name', width: 200, editable: false },
        { field: 'task_description', headerName: 'Task Description', width: 200, editable: false },
        { field: 'start_date', headerName: 'Start Date', width: 200, editable: false },
        { field: 'end_date', headerName: 'End Date', width: 200, editable: false },
        { field: 'status', headerName: 'Status', width: 200, editable: false },
        { field: 'created_at', headerName: 'Created At', width: 200, editable: false},
        { field: 'updated_at', headerName: 'Updated At', width: 200, editable: false},
        { field: 'created_by', headerName: 'Created By', width: 200, editable: false},
        { field: 'updated_by', headerName: 'Updated By', width: 200, editable: false},
    ];

    useEffect(() => {
        fetchTask().then(() => {
            console.log('Get All Task Completed');
            setIsLoading(false);
        })
    }, []);

    const fetchTask = async () => {
        try {
            setIsLoading(true);
            const routeAPI: string = '/api/task/getAllTask';
            console.log(URLAPI+routeAPI);

            const response = await axios.get(URLAPI+routeAPI);
            let taskData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid,
                task_name: data.task_name ?? '-',
                task_description: data.task_description ?? '-',
                status: data.status.status_name ?? '-',
                start_date: data.start_date ? moment(data.start_date).format('DD/MM/YYYY hh:mm:ss') : '-',
                end_date: data.end_date ? moment(data.end_date).format('DD/MM/YYYY hh:mm:ss') : '-',
                created_at: data.created_at ? moment(data.created_at).format('DD/MM/YYYY hh:mm:ss') : '-',
                created_by: data.created_by ?? '-',
                updated_at: data.updated_at ? moment(data.updated_at).format('DD/MM/YYYY hh:mm:ss') : '-',
                updated_by: data.update_by ?? '-',
            }));

            setRows(taskData);

            setIsLoading(false);
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.log("Failed to fetch users", error);
        }
    };

    return (
        <>
            {isLoading ? (
                <CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>
            ) : (
                <div style={{height: '100vh', width: '85vw', overflow: 'hidden', padding: "20px"}}>
                    <CustomTypography bold size={"M"}>Task Master</CustomTypography>
                    <CustomSpacer height={Constants(2)}></CustomSpacer>
                    <Box sx={{ height: 'calc(100vh - 160px)', width: '100%' }}>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            {/*<CustomButton variant="contained" onClick={handleAddRow}>Add Task</CustomButton>*/}
                            <IconButton onClick={fetchTask}>
                                <RefreshIcon></RefreshIcon>
                            </IconButton>
                        </Box>
                        <CustomSpacer height={Constants(2)}></CustomSpacer>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            sx={{
                                '& .MuiDataGrid-root': {
                                    border: 'none',
                                },
                                '& .MuiDataGrid-cell': {
                                    borderBottom: 'none',
                                },
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#f5f5f5',
                                    borderBottom: 'none',
                                },
                                '& .MuiDataGrid-virtualScroller': {
                                    '&::-webkit-scrollbar': {
                                        width: '0.4em',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                        borderRadius: 2,
                                    },
                                },
                            }}
                        />
                    </Box>

                    {/*<Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>*/}
                    {/*    <DialogTitle>Add Team</DialogTitle>*/}
                    {/*    <DialogContent>*/}
                    {/*        <DialogContentText>Enter role details and save.</DialogContentText>*/}
                    {/*        <CustomTextField*/}
                    {/*            margin="dense"*/}
                    {/*            name="role_name"*/}
                    {/*            label="Role Name"*/}
                    {/*            type="text"*/}
                    {/*            fullWidth*/}
                    {/*            value={roleName}*/}
                    {/*            onChange={handleNewRoleName}*/}
                    {/*        />*/}
                    {/*        <CustomTextField*/}
                    {/*            margin="dense"*/}
                    {/*            name="role_description"*/}
                    {/*            label="Team Description"*/}
                    {/*            type="text"*/}
                    {/*            fullWidth*/}
                    {/*            value={roleDescription}*/}
                    {/*            onChange={handleNewRoleDescription}*/}
                    {/*        />*/}
                    {/*    </DialogContent>*/}
                    {/*    <DialogActions>*/}
                    {/*        <CustomButton variant={'contained'} onClick={handleAddDialogClose}>Cancel</CustomButton>*/}
                    {/*        <CustomButton variant={'contained'} onClick={handleAddDialogSave}>Save</CustomButton>*/}
                    {/*    </DialogActions>*/}
                    {/*</Dialog>*/}

                    {/*<Dialog open={isDialogOpen} onClose={handleDialogClose}>*/}
                    {/*    <DialogTitle>Edit Role</DialogTitle>*/}
                    {/*    <DialogContent>*/}
                    {/*        <DialogContentText>Update role details and save.</DialogContentText>*/}
                    {/*        <CustomTextField*/}
                    {/*            margin="dense"*/}
                    {/*            name="role_name"*/}
                    {/*            label="Role Name"*/}
                    {/*            type="text"*/}
                    {/*            fullWidth*/}
                    {/*            value={roleName}*/}
                    {/*            onChange={handleNewRoleName}*/}
                    {/*        />*/}
                    {/*        <CustomTextField*/}
                    {/*            margin="dense"*/}
                    {/*            name="role_description"*/}
                    {/*            label="Team Description"*/}
                    {/*            type="text"*/}
                    {/*            fullWidth*/}
                    {/*            value={roleDescription}*/}
                    {/*            onChange={handleNewRoleDescription}*/}
                    {/*        />*/}
                    {/*    </DialogContent>*/}
                    {/*    <DialogActions>*/}
                    {/*        <CustomButton variant={'contained'} onClick={handleDialogClose}>Cancel</CustomButton>*/}
                    {/*        <CustomButton variant={'contained'} onClick={handleEditDialogSave}>Save</CustomButton>*/}
                    {/*    </DialogActions>*/}
                    {/*</Dialog>*/}

                    {/*<Dialog open={isConfirmDialogOpen} onClose={handleConfirmDialogClose}>*/}
                    {/*    <DialogTitle>Confirm Delete</DialogTitle>*/}
                    {/*    <DialogContent>*/}
                    {/*        <DialogContentText>*/}
                    {/*            Are you sure you want to delete this Project?*/}
                    {/*        </DialogContentText>*/}
                    {/*    </DialogContent>*/}
                    {/*    <DialogActions>*/}
                    {/*        <CustomButton variant={'contained'} onClick={handleConfirmDialogClose}>Cancel</CustomButton>*/}
                    {/*        <CustomButton variant={'contained'} onClick={handleConfirmDelete}>Delete</CustomButton>*/}
                    {/*    </DialogActions>*/}
                    {/*</Dialog>*/}
                </div>
            )}
        </>
    );
}

export default TaskMaster;