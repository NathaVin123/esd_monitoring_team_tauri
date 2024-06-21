import React, {useEffect, useState} from "react";
import {URLAPI} from "@/pages/api/env";
import axios from "axios";
import moment from "moment";
import {router} from "next/client";
import {CustomProgressBarEntireScreen} from "@/pages/components/mui/CustomProgressBar";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {Box, IconButton} from "@mui/material";
import CustomButton from "@/pages/components/mui/CustomButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const AdminActiveUserMonitoring = () => {
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
        { field: 'user', headerName: 'User', width: 200, editable: false },
        { field: 'task_name', headerName: 'Task Name', width: 200, editable: false },
        { field: 'case_name', headerName: 'Case Name', width: 200, editable: false },
        { field: 'remark', headerName: 'Remark', width: 200, editable: false },
        { field: 'start_time', headerName: 'Start Time', width: 200, editable: false },
        { field: 'end_time', headerName: 'End Time', width: 200, editable: false },
        { field: 'active', headerName: 'Active', width: 200, editable: false },
        { field: 'duration', headerName: 'Duration', width: 200, editable: false },
        { field: 'created_at', headerName: 'Created At', width: 200, editable: false},
        { field: 'updated_at', headerName: 'Updated At', width: 200, editable: false},
        { field: 'created_by', headerName: 'Created By', width: 200, editable: false},
        { field: 'updated_by', headerName: 'Updated By', width: 200, editable: false},
    ];

    const fetchMonitoring = async () => {
        try {
            setIsLoading(true);
            const routeAPI: string = '/api/monitoring/getAllMonitoring';
            console.log(URLAPI+routeAPI);

            const response = await axios.get(URLAPI+routeAPI);
            let caseData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid,
                user: data.user?.full_name ?? '-',
                task_name: data.task?.task_name ?? '-',
                case_name: data.task?.case_name ?? '-',
                remark: data.remark ?? '-',
                start_time: data.start_time ? moment(data.start_time).format('hh:mm:ss') : '-',
                end_time: data.end_time ? moment(data.end_time).format('hh:mm:ss') : '-',
                active: data.active === 1 ? 'On' : 'Off',
                duration: data.duration + 'Seconds',
                created_at: data.created_at ? moment(data.created_at).format('DD/MM/YYYY hh:mm:ss') : '-',
                created_by: data.created_by ?? '-',
                updated_at: data.updated_at ? moment(data.updated_at).format('DD/MM/YYYY hh:mm:ss') : '-',
                updated_by: data.update_by ?? '-',
            }));

            if(!caseData) {
                setRows([]);
            } else {
                setRows(caseData);
            }

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

    useEffect(() => {
        fetchMonitoring().then(() => {
            console.log('Fetch Case Successfully');
            setIsLoading(false);
        })
    }, []);

    return (
        <>
            {isLoading ? (
                <CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>
            ) : (
                <div style={{height: '100vh', width: '85vw', overflow: 'hidden', padding: "20px"}}>
                    <CustomTypography bold size={"M"}>Active User Monitoring</CustomTypography>
                    <CustomSpacer height={Constants(2)}></CustomSpacer>
                    <Box sx={{ height: 'calc(100vh - 160px)', width: '100%' }}>
                        {/*<Box display="flex" flexDirection="row" alignItems="center" gap={2}>*/}
                        {/*    <CustomButton variant="contained" onClick={handleAddRow}>Add Case</CustomButton>*/}
                        {/*    <IconButton onClick={fetchMonitoring}>*/}
                        {/*        <RefreshIcon></RefreshIcon>*/}
                        {/*    </IconButton>*/}
                        {/*</Box>*/}
                        {/*<CustomSpacer height={Constants(2)}></CustomSpacer>*/}
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

export default AdminActiveUserMonitoring;