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
import CustomCircularProgressBar from '@/pages/components/mui/CustomProgressBar';
import { routes } from './routes';
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import moment from 'moment';
import RefreshIcon from '@mui/icons-material/Refresh'; // Import Refresh icon

const initialRows: [] = [];

const StatusMaster = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rows, setRows] = useState<[]>(initialRows);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const [statusUuid, setStatusUuid] = useState<string>('');
    const [statusName, setStatusName] = useState<string>('');
    const [teamDescription, setTeamDescription] = useState<string>('');

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
        { field: 'team_name', headerName: 'Team Name', width: 200, editable: false },
        { field: 'team_description', headerName: 'Team Description', width: 200, editable: false },
        { field: 'created_at', headerName: 'Created At', width: 200, editable: false},
        { field: 'updated_at', headerName: 'Updated At', width: 200, editable: false},
        { field: 'created_by', headerName: 'Created By', width: 200, editable: false},
        { field: 'updated_by', headerName: 'Updated By', width: 200, editable: false},
    ];

    useEffect(() => {
        setIsLoading(true);

        fetchTeam().then(() => {
            console.log('Get All Team Completed')
            setIsLoading(false);
        });
    }, []);

    const handleAddRow = () => {
        setStatusName('');
        setTeamDescription('');

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
                statusName: statusName,
                teamDescription: teamDescription,
                // createdBy: createdBy,
            };

            await createTeam(dataNew);
        } catch (error) {
            console.error("Failed to add user", error);
        }
    };

    const handleNewTeamName = (e: any) => {
        setStatusName(e.target.value);
    };

    const handleNewTeamDescription = (e: any) => {
        setTeamDescription(e.target.value);
    };

    const fetchTeam = async () => {
        try {
            const routeAPI: string = '/api/team/getAllTeam';
            console.log(URLAPI+routeAPI);

            const response = await axios.get(URLAPI+routeAPI);
            let teamData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid,
                team_name: data.team_name ?? '-',
                team_description: data.team_description ?? '-',
                created_at: data.created_at ? moment(data.created_at).format('DD/MM/YYYY hh:mm:ss') : '-',
                created_by: data.created_by ?? '-',
                updated_at: data.updated_at ? moment(data.updated_at).format('DD/MM/YYYY hh:mm:ss') : '-',
                updated_by: data.update_by ?? '-',
            }));

            setRows(teamData);

        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const createTeam = async (dataNew: any) => {
        try {
            const routeAPI: string = '/api/team/createTeam';
            await axios.post(URLAPI + routeAPI, dataNew);
            setIsAddDialogOpen(false);
            await fetchTeam();
        } catch (error) {
            console.error("Failed to create team", error);
        }
    };

    const handleEditRow = (row: any) => {
        setSelectedRow([]);

        setStatusUuid('')
        setStatusName('');
        setTeamDescription('');

        setSelectedRow(row);
        setStatusUuid(row.uuid);
        setStatusName(row.team_name);
        setTeamDescription(row.team_description);

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
            await deleteTeam(selectedRow);
            setIsConfirmDialogOpen(false);
            setSelectedRow(null);
            await fetchTeam();
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    };

    const handleDeleteRow = async (row: any) => {
        setSelectedRow(row);

        const deletedRow = {
            uuid: row.uuid,
        };

        await deleteTeam(deletedRow);
    }

    const handleEditDialogSave = async () => {
        try {
            const updatedRow = {
                uuid: statusUuid,
                statusName: statusName,
                teamDescription: teamDescription,
            };

            await updateTeam(updatedRow);

            setIsDialogOpen(false);
            setSelectedRow(null);

            await fetchTeam();
        } catch (error) {
            console.error("Failed to update user", error);
        }
    };

    const deleteTeam = async (deleteRow: any) => {
        try {
            const routeAPI: string = `/api/team/deleteTeam`;
            console.log(URLAPI+routeAPI);
            await axios.post(URLAPI + routeAPI, deleteRow);
            await fetchTeam();
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    };

    const updateTeam = async (updatedRow: any) => {
        try {
            const routeAPI: string = `/api/team/updateTeam`;
            console.log(URLAPI+routeAPI);
            await axios.post(URLAPI + routeAPI, updatedRow);
            await fetchTeam();
        } catch (error) {
            console.error("Failed to update team", error);
        }
    };

    return (
        <CustomContainer>
            <MyAppBar routes={routes}></MyAppBar>
            {isLoading ? (
                <CustomCircularProgressBar></CustomCircularProgressBar>
            ) : (
                <>
                    <CustomSpacer height={Constants(8)}></CustomSpacer>
                    <CustomTypography bold size={"M"}>Team Master</CustomTypography>
                    <CustomSpacer height={Constants(2)}></CustomSpacer>
                    <Box sx={{ height: 'calc(100vh - 160px)', width: '100%' }}>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <CustomButton variant="contained" onClick={handleAddRow}>Add Team</CustomButton>
                            <IconButton onClick={fetchTeam}>
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
                            <DialogContentText>Enter team details and save.</DialogContentText>
                            <CustomTextField
                                margin="dense"
                                name="team_name"
                                label="Team Name"
                                type="text"
                                fullWidth
                                value={statusName}
                                onChange={handleNewTeamName}
                            />
                            <CustomTextField
                                margin="dense"
                                name="team_description"
                                label="Team Description"
                                type="text"
                                fullWidth
                                value={teamDescription}
                                onChange={handleNewTeamDescription}
                            />
                        </DialogContent>
                        <DialogActions>
                            <CustomButton variant={'contained'} onClick={handleAddDialogClose}>Cancel</CustomButton>
                            <CustomButton variant={'contained'} onClick={handleAddDialogSave}>Save</CustomButton>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                        <DialogTitle>Edit Team</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Update team details and save.</DialogContentText>
                            <CustomTextField
                                margin="dense"
                                name="team_name"
                                label="Team Name"
                                type="text"
                                fullWidth
                                value={statusName}
                                onChange={handleNewTeamName}
                            />
                            <CustomTextField
                                margin="dense"
                                name="team_description"
                                label="Team Description"
                                type="text"
                                fullWidth
                                value={teamDescription}
                                onChange={handleNewTeamDescription}
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
                                Are you sure you want to delete this status?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <CustomButton variant={'contained'} onClick={handleConfirmDialogClose}>Cancel</CustomButton>
                            <CustomButton variant={'contained'} onClick={handleConfirmDelete}>Delete</CustomButton>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </CustomContainer>
    );
}

export default StatusMaster;
