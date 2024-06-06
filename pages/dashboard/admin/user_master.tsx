// const initialRows: User[] = [
//     { id: 1, name: 'John Doe', age: 35, email: 'john.doe@example.com', address: '123 Main St' },
//     { id: 2, name: 'Jane Smith', age: 42, email: 'jane.smith@example.com', address: '456 Elm St' },
//     { id: 3, name: 'Sam Johnson', age: 28, email: 'sam.johnson@example.com', address: '789 Oak St' },
//     { id: 4, name: 'John Doe', age: 35, email: 'john.doe@example.com', address: '123 Main St' },
//     { id: 5, name: 'Jane Smith', age: 42, email: 'jane.smith@example.com', address: '456 Elm St' },
//     { id: 6, name: 'Sam Johnson', age: 28, email: 'sam.johnson@example.com', address: '789 Oak St' },
//     { id: 7, name: 'John Doe', age: 35, email: 'john.doe@example.com', address: '123 Main St' },
//     { id: 8, name: 'Jane Smith', age: 42, email: 'jane.smith@example.com', address: '456 Elm St' },
//     { id: 9, name: 'Sam Johnson', age: 28, email: 'sam.johnson@example.com', address: '789 Oak St' },
//     { id: 10, name: 'John Doe', age: 35, email: 'john.doe@example.com', address: '123 Main St' },
//     { id: 11, name: 'Jane Smith', age: 42, email: 'jane.smith@example.com', address: '456 Elm St' },
//     { id: 12, name: 'Sam Johnson', age: 28, email: 'sam.johnson@example.com', address: '789 Oak St' },
//     { id: 13, name: 'John Doe', age: 35, email: 'john.doe@example.com', address: '123 Main St' },
//     { id: 14, name: 'Jane Smith', age: 42, email: 'jane.smith@example.com', address: '456 Elm St' },
//     { id: 15, name: 'Sam Johnson', age: 28, email: 'sam.johnson@example.com', address: '789 Oak St' },
// ];


import React, { useState, useEffect } from 'react';
import { CustomContainer, CustomContainerCenter } from '@/pages/components/mui/CustomContainer';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import axios from 'axios';
import {URLAPI} from "@/pages/api/env";
import CustomTextField from '@/pages/components/mui/CustomTextField';

// interface User {
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//     address: string;
// }

const initialRows: [] = [];

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
    { field: 'nik', headerName: 'NIK', width: 110, editable: true },
    { field: 'full_name', headerName: 'Full Name', width: 250, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true},
    { field: 'gender', headerName: 'Gender', width: 200, editable: true},
    { field: 'created_at', headerName: 'Created At', width: 200, editable: true},
    { field: 'updated_at', headerName: 'Updated At', width: 200, editable: true},
    { field: 'created_by', headerName: 'Created By', width: 200, editable: true},
    { field: 'updated_by', headerName: 'Updated By', width: 200, editable: true},
];

export const UserMaster = () => {
    const [rows, setRows] = useState<User[]>(initialRows);
    const [selectedRow, setSelectedRow] = useState<User | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newUser, setNewUser] = useState<User>({ id: 0, name: '', age: 0, email: '', address: '' });

    useEffect(() => {
        // localStorage.removeItem('customTitle');
        // localStorage.setItem('customTitle', 'Admin Center - User Master')
         fetchUsers().then(() => {console.log('Get All User Completed')});
    }, []);

    const fetchUsers = async () => {
        try {
            const routeAPI: string = '/api/user/getAllUser';
            console.log(URLAPI+routeAPI);
            const response = await axios.get(URLAPI+routeAPI);
            let responseData = response.data.data.map((data : any, index: number) => {
                setRows(
                    [{
                        id: index,
                        uuid: data.uuid,
                        nik: data.nik,
                        full_name: data.full_name,
                        email: data.email,
                        gender: data.gender,
                        active_user: data.active_user,
                        created_at: data.created_at,
                        created_by: data.created_by,
                        updated_at: data.updated_at,
                        updated_by: data.update_by,
                    }]
                );
            })
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

    return (
        <CustomContainer>
            <CustomSpacer height={Constants(8)}></CustomSpacer>
            <Box sx={{ height: 'calc(100vh - 160px)', width: '100%' }}>
                <Button variant="contained" color="primary" onClick={handleAddRow}>Add User</Button>
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

            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit user details and save changes.</DialogContentText>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={selectedRow?.name || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="age"
                        label="Age"
                        type="number"
                        fullWidth
                        value={selectedRow?.age || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={selectedRow?.email || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Address"
                        type="text"
                        fullWidth
                        value={selectedRow?.address || ''}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">Cancel</Button>
                    <Button onClick={handleDialogSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter user details and save.</DialogContentText>
                    <CustomTextField
                        margin="dense"
                        name="nik"
                        label="NIK"
                        type="text"
                        fullWidth
                        // value={newUser.name}
                        onChange={handleNewUserChange}
                    />
                    <CustomTextField
                        margin="dense"
                        name="full_name"
                        label="Full Name"
                        type="text"
                        fullWidth
                        // value={newUser.age}
                        onChange={handleNewUserChange}
                    />
                    <CustomTextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        // value={newUser.email}
                        onChange={handleNewUserChange}
                    />
                    <CustomTextField
                        margin="dense"
                        name="gender"
                        label="Gender"
                        type="select"
                        fullWidth
                        // value={newUser.address}
                        onChange={handleNewUserChange}
                    />
                    <CustomTextField
                        margin="dense"
                        name="active"
                        label="Active"
                        type="select"
                        fullWidth
                        // value={newUser.address}
                        onChange={handleNewUserChange}
                    />
                    <CustomTextField
                        margin="dense"
                        name="role"
                        label="Role"
                        type="select"
                        fullWidth
                        // value={newUser.address}
                        onChange={handleNewUserChange}
                    />
                    <CustomTextField
                        margin="dense"
                        name="team"
                        label="Team"
                        type="select"
                        fullWidth
                        // value={newUser.address}
                        onChange={handleNewUserChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddDialogClose} color="primary">Cancel</Button>
                    <Button onClick={handleAddDialogSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </CustomContainer>
    );
};
export default UserMaster;
