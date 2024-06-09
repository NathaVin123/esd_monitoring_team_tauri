import React, { useState, useEffect } from 'react';
import { CustomContainer, CustomContainerCenter } from '@/pages/components/mui/CustomContainer';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { URLAPI } from '@/pages/api/env';
import axios from 'axios';
import CustomTypography from '@/pages/components/mui/CustomTypography';
import CustomSpacer from '@/pages/components/mui/CustomSpacer';
import Constants from '@/pages/components/mui/value/contants';

import {routes} from './routes';
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import CustomButton from "@/pages/components/mui/CustomButton";

const columns: GridColDef[] = [
    {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        sortable: false,
        renderCell: (params) => {
            return (
                <div>
                    <IconButton onClick={() => handleDeleteRow(params.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteRow(params.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>

            );
        }
    },
    { field: 'id', headerName: 'ID', width: 50, sortable: true },
    { field: 'uuid', headerName: 'UUID', width: 200, editable: true },
    { field: 'team_name', headerName: 'Team Name', width: 110, editable: true },
    { field: 'team_description', headerName: 'Team Description', width: 110, editable: true },
    // { field: 'full_name', headerName: 'Full Name', width: 250, editable: true },
    // { field: 'email', headerName: 'Email', width: 200, editable: true},
    // { field: 'gender', headerName: 'Gender', width: 200, editable: true},
    { field: 'created_at', headerName: 'Created At', width: 200, editable: true},
    { field: 'updated_at', headerName: 'Updated At', width: 200, editable: true},
    { field: 'created_by', headerName: 'Created By', width: 200, editable: true},
    { field: 'updated_by', headerName: 'Updated By', width: 200, editable: true},
];

export const teamMaster = () => {
    const [rows, setRows] = useState<User[]>([]);
    const [selectedRow, setSelectedRow] = useState<User | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newUser, setNewUser] = useState<User>({ id: 0, name: '', age: 0, email: '', address: '' });

    useEffect(() => {
        // localStorage.removeItem('customTitle');
        // localStorage.setItem('customTitle', 'Admin Center - User Master')
        fetchTeam().then(() => {console.log('Get All Team Completed')});
    }, []);

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
                created_at: data.created_at ?? '-',
                created_by: data.created_by ?? '-',
                updated_at: data.updated_at ?? '-',
                updated_by: data.update_by ?? '-',
            }));

            setRows(teamData);

            console.log(JSON.stringify(rows));
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const handleRowEditCommit = async (params: any) => {
        const updatedRow = { ...rows.find(row => row.id === params.id), [params.field]: params.value };
        try {
            await axios.put(`/api/users/${params.id}`, updatedRow);
            setRows(rows.map(row => (row.id === params.id ? updatedRow : row)));
        } catch (error) {
            console.error("Failed to update user", error);
        }
    };

    const handleAddRow = () => {
        setIsAddDialogOpen(true);
    };

    const handleDeleteRow = async (id: GridRowId) => {
        try {
            await axios.delete(`/api/users/${id}`);
            setRows(rows.filter(row => row.id !== id));
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    };

    const handleDialogOpen = (row: User) => {
        setSelectedRow(row);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedRow(null);
    };

    const handleDialogSave = async () => {
        if (selectedRow) {
            try {
                await axios.put(`/api/users/${selectedRow.id}`, selectedRow);
                setRows(rows.map(row => (row.id === selectedRow.id ? selectedRow : row)));
            } catch (error) {
                console.error("Failed to update user", error);
            }
        }
        handleDialogClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedRow) {
            setSelectedRow({ ...selectedRow, [e.target.name]: e.target.value });
        }
    };

    const handleAddDialogClose = () => {
        setIsAddDialogOpen(false);
        setNewUser({ id: 0, name: '', age: 0, email: '', address: '' });
    };

    const handleAddDialogSave = async () => {
        try {
            const response = await axios.post('/api/users', newUser);
            setRows([...rows, response.data]);
            handleAddDialogClose();
        } catch (error) {
            console.error("Failed to add user", error);
        }
    };

    const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };
    // @ts-ignore
    return (
        <CustomContainer>
            <MyAppBar routes={routes}></MyAppBar>
            <CustomSpacer height={Constants(8)}></CustomSpacer>
            <CustomTypography bold size={"M"}>Team Master</CustomTypography>
            <CustomSpacer height={Constants(2)}></CustomSpacer>
            <Box sx={{ height: 'calc(100vh - 160px)', width: '100%' }}>
                <CustomButton variant="contained" onClick={handleAddRow}>Add Team</CustomButton>
                <CustomSpacer height={Constants(2)}></CustomSpacer>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    // checkboxSelection
                    onCellEditCommit={handleRowEditCommit}
                    onRowClick={(params) => handleDialogOpen(params.row as User)}
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
        </CustomContainer>
    );
}

export default teamMaster;
