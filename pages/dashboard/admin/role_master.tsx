import React, { useState, useEffect } from 'react';
import { CustomContainer } from '@/pages/components/mui/CustomContainer';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import axios from 'axios';
import { URLAPI } from "@/pages/api/env";
import CustomTextField from '@/pages/components/mui/CustomTextField';
import CustomTypography from '@/pages/components/mui/CustomTypography';
import CustomButton from '@/pages/components/mui/CustomButton';
import CustomCircularProgressBar, {CustomProgressBarEntireScreen} from '@/pages/components/mui/CustomProgressBar';
import { routes } from '@/routes/routes';
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import moment from 'moment';
import RefreshIcon from '@mui/icons-material/Refresh';
import {router} from "next/client"; // Import Refresh icon

const initialRows: [] = [];

const RoleMaster = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rows, setRows] = useState<[]>(initialRows);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const [roleUuid, setRoleUuid] = useState<string>('');
    const [roleName, setRoleName] = useState<string>('');
    const [roleDescription, setRoleDescription] = useState<string>('');

    const columns: GridColDef[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <IconButton onClick={() => handleEditRow(params.row)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => openConfirmDialog(params.row)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                );
            }
        },
        { field: 'id', headerName: 'ID', width: 50, sortable: true },
        { field: 'uuid', headerName: 'UUID', width: 200, editable: false },
        { field: 'role_name', headerName: 'Role Name', width: 200, editable: false },
        { field: 'role_description', headerName: 'Team Description', width: 200, editable: false },
        { field: 'created_at', headerName: 'Created At', width: 200, editable: false},
        { field: 'updated_at', headerName: 'Updated At', width: 200, editable: false},
        { field: 'created_by', headerName: 'Created By', width: 200, editable: false},
        { field: 'updated_by', headerName: 'Updated By', width: 200, editable: false},
    ];

    useEffect(() => {
        setIsLoading(true);

        fetchRole().then(() => {
            console.log('Get All Role Completed')
            setIsLoading(false);
        });
    }, []);

    const handleAddRow = () => {
        setRoleName('');
        setRoleDescription('');

        setIsAddDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedRow(null);
    };

    const handleAddDialogClose = () => {
        setIsAddDialogOpen(false);
    };

    const handleAddDialogSave = async () => {
        try {
            let dataNew = {
                roleName: roleName,
                roleDescription: roleDescription,
            };

            await createRole(dataNew);
        } catch (error) {
            console.error("Failed to add user", error);
        }
    };

    const handleNewRoleName = (e: any) => {
        setRoleName(e.target.value);
    };

    const handleNewRoleDescription = (e: any) => {
        setRoleDescription(e.target.value);
    };

    const fetchRole = async () => {
        try {
            const routeAPI: string = '/api/role/getAllRole';
            console.log(URLAPI+routeAPI);

            const response = await axios.get(URLAPI+routeAPI);
            let roleData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid,
                role_name: data.role_name ?? '-',
                role_description: data.role_description ?? '-',
                created_at: data.created_at ? moment(data.created_at).format('DD/MM/YYYY hh:mm:ss') : '-',
                created_by: data.created_by ?? '-',
                updated_at: data.updated_at ? moment(data.updated_at).format('DD/MM/YYYY hh:mm:ss') : '-',
                updated_by: data.update_by ?? '-',
            }));

            setRows(roleData);

        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.error("Failed to fetch users", error);
        }
    };

    const createRole = async (dataNew: any) => {
        try {
            const routeAPI: string = '/api/role/createRole';
            await axios.post(URLAPI + routeAPI, dataNew);
            setIsAddDialogOpen(false);
            await fetchRole();
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.error("Failed to create role", error);
        }
    };

    const handleEditRow = (row: any) => {
        setSelectedRow([]);

        setRoleUuid('')
        setRoleName('');
        setRoleDescription('');

        setSelectedRow(row);
        setRoleUuid(row.uuid);
        setRoleName(row.role_name);
        setRoleDescription(row.role_description);

        setIsDialogOpen(true);
    };

    const openConfirmDialog = (row: any) => {
        setSelectedRow(row);
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmDialogClose = () => {
        setIsConfirmDialogOpen(false);
        setSelectedRow(null);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteRole(selectedRow);
            setIsConfirmDialogOpen(false);
            setSelectedRow(null);
            await fetchRole();
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    };

    const handleDeleteRow = async (row: any) => {
        setSelectedRow(row);

        const deletedRow = {
            uuid: row.uuid,
        };

        await deleteRole(deletedRow);
    }

    const handleEditDialogSave = async () => {
        try {
            const updatedRow = {
                uuid: roleUuid,
                roleName: roleName,
                roleDescription: roleDescription,
            };

            await updateRole(updatedRow);

            setIsDialogOpen(false);
            setSelectedRow(null);

            await fetchRole();
        } catch (error) {
            console.error("Failed to update user", error);
        }
    };

    const deleteRole = async (deleteRow: any) => {
        try {
            const routeAPI: string = `/api/role/deleteRole`;
            console.log(URLAPI+routeAPI);
            await axios.post(URLAPI + routeAPI, deleteRow);
            await fetchRole();
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.error("Failed to delete user", error);
        }
    };

    const updateRole = async (updatedRow: any) => {
        try {
            const routeAPI: string = `/api/role/updateRole`;
            console.log(URLAPI+routeAPI);
            await axios.post(URLAPI + routeAPI, updatedRow);
            await fetchRole();
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.error("Failed to update role", error);
        }
    };

    return (
        <>
            {isLoading ? (
                <CustomProgressBarEntireScreen></CustomProgressBarEntireScreen>
            ) : (
                <div style={{height: '100vh', width: '85vw', overflow: 'hidden', padding: "20px"}}>
                    <CustomTypography bold size={"M"}>Role Master</CustomTypography>
                    <CustomSpacer height={Constants(2)}></CustomSpacer>
                    <Box sx={{ height: 'calc(100vh - 160px)', width: '100%' }}>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <CustomButton variant="contained" onClick={handleAddRow}>Add Role</CustomButton>
                            <IconButton onClick={fetchRole}>
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

                    <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
                        <DialogTitle>Add Team</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Enter role details and save.</DialogContentText>
                            <CustomTextField
                                margin="dense"
                                name="role_name"
                                label="Role Name"
                                type="text"
                                fullWidth
                                value={roleName}
                                onChange={handleNewRoleName}
                            />
                            <CustomTextField
                                margin="dense"
                                name="role_description"
                                label="Team Description"
                                type="text"
                                fullWidth
                                value={roleDescription}
                                onChange={handleNewRoleDescription}
                            />
                        </DialogContent>
                        <DialogActions>
                            <CustomButton variant={'contained'} onClick={handleAddDialogClose}>Cancel</CustomButton>
                            <CustomButton variant={'contained'} onClick={handleAddDialogSave}>Save</CustomButton>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                        <DialogTitle>Edit Role</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Update role details and save.</DialogContentText>
                            <CustomTextField
                                margin="dense"
                                name="role_name"
                                label="Role Name"
                                type="text"
                                fullWidth
                                value={roleName}
                                onChange={handleNewRoleName}
                            />
                            <CustomTextField
                                margin="dense"
                                name="role_description"
                                label="Team Description"
                                type="text"
                                fullWidth
                                value={roleDescription}
                                onChange={handleNewRoleDescription}
                            />
                        </DialogContent>
                        <DialogActions>
                            <CustomButton variant={'contained'} onClick={handleDialogClose}>Cancel</CustomButton>
                            <CustomButton variant={'contained'} onClick={handleEditDialogSave}>Save</CustomButton>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={isConfirmDialogOpen} onClose={handleConfirmDialogClose}>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this role?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <CustomButton variant={'contained'} onClick={handleConfirmDialogClose}>Cancel</CustomButton>
                            <CustomButton variant={'contained'} onClick={handleConfirmDelete}>Delete</CustomButton>
                        </DialogActions>
                    </Dialog>
                </div>
            )}
        </>
    );
}

export default RoleMaster;
