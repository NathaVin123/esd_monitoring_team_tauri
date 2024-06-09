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
import CustomTypography from '@/pages/components/mui/CustomTypography';
import CustomButton from '@/pages/components/mui/CustomButton';
import CustomCircularProgressBar from '@/pages/components/mui/CustomProgressBar';
import {routes} from './routes';
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";

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
    { field: 'nik', headerName: 'NIK', width: 200, editable: true },
    { field: 'full_name', headerName: 'Full Name', width: 200, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true},
    { field: 'gender', headerName: 'Gender', width: 200, editable: true},
    { field: 'role', headerName: 'Role', width: 200, editable: true},
    { field: 'team', headerName: 'Team', width: 200, editable: true},
    { field: 'created_at', headerName: 'Created At', width: 200, editable: true},
    { field: 'updated_at', headerName: 'Updated At', width: 200, editable: true},
    { field: 'created_by', headerName: 'Created By', width: 200, editable: true},
    { field: 'updated_by', headerName: 'Updated By', width: 200, editable: true},
];

export const UserMaster = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rows, setRows] = useState<[]>(initialRows);
    const [selectedRow, setSelectedRow] = useState<null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [roleId, setRoleId] = useState<string>('');
    const [roleOptions, setRoleOptions] = useState<any>([]);
    const [teamId, setTeamId] = useState<string>('');
    const [teamOptions, setTeamOptions] = useState<any>([]);
    const [nik, setNik] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [genderOptions, setGenderOptions] = useState<any>([
        {
            key: 'L',
            value: 'Men',
        },
        {
            key: 'P',
            value: 'Women',
        }
    ]);
    const [activeUser, setActiveUser] = useState<boolean>(true);
    const [activeOptions, setActiveOptions] = useState<any>([
        {
            key: true,
            value: 'Active',
        },
        {
            key: false,
            value: 'Non-Active',
        }
    ]);
    const nikFromLocal : string | null = localStorage.getItem('nik');
    const [createdBy, setCreatedBy] = useState<string>('');

    useEffect(() => {
        setIsLoading(true);
         fetchUsers().then(() => {
             fetchDropdownTeam().then(() => {
                 fetchDropdownRole().then(() => {
                     const nikFromLocal : string | null = localStorage.getItem('nikUser');
                     setCreatedBy(nikFromLocal);
                     setIsLoading(false);
                 })
             })
         });
    }, []);

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
        // setNewUser({ id: 0, name: '', age: 0, email: '', address: '' });
    };

    const handleAddDialogSave = async () => {
        try {
            let dataNew = {
                nik: nik,
                email: email,
                fullName: fullName,
                password: password,
                gender: gender,
                activeUser: activeUser,
                roleId: roleId,
                teamId: teamId,
                createdBy: createdBy,
            };

            // @ts-ignore
            await createUser(dataNew);

        } catch (error) {
            console.error("Failed to add user", error);
        }
    };

    const handleNewNIK = (e: any) => {
        setNik(e.target.value);
    };

    const handleNewFullName= (e: any) => {
        setFullName(e.target.value);
    };

    const handleNewPassword= (e: any) => {
        setPassword(e.target.value);
    };

    const handleNewEmail= (e: any) => {
        setEmail(e.target.value);
    };

    const handleNewGender= (e: any) => {
        setGender(e.target.value);
    };

    const handleNewActive= (e: any) => {
        setActiveUser(e.target.value);
    };

    const handleNewRole= (e: any) => {
        setRoleId(e.target.value);
    };

    const handleNewTeam= (e: any) => {
        setTeamId(e.target.value);
    };
    const fetchUsers = async () => {
        try {
            const routeAPI: string = '/api/user/getAllUser';
            console.log(URLAPI+routeAPI);
            const response = await axios.get(URLAPI+routeAPI);

            let userData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid ?? '-',
                nik: data.nik ?? '-',
                full_name: data.full_name ?? '-',
                email: data.email ?? '-',
                gender: data.gender ?? '-',
                role: data.role.role_name ?? '-',
                team: data.team.team_name ?? '-',
                active_user: data.active_user ?? '-',
                created_at: data.created_at ?? '-',
                created_by: data.created_by ?? '-',
                updated_at: data.updated_at ?? '-',
                updated_by: data.update_by ?? '-',  // Make sure this key is correct; might need to be 'updated_by'
            }));

            setRows(userData);

            console.log(JSON.stringify(rows));
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const fetchDropdownRole = async () => {
        try {
            const routeAPI: string = '/api/role/getAllRole';
            console.log(URLAPI+routeAPI);

            const response = await axios.get(URLAPI+routeAPI);
            let teamData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid ?? '-',
                role_name: data.role_name ?? '-',
                // team_description: data.team_description ?? '-',
                // created_at: data.created_at ?? '-',
                // created_by: data.created_by ?? '-',
                // updated_at: data.updated_at ?? '-',
                // updated_by: data.update_by ?? '-',
            }));

            let roleData2 = teamData.map((data: any, index: number) => ({
                key: data.uuid,
                value: data.role_name,
            }));

            setRoleOptions(roleData2);

            console.log(JSON.stringify(rows));
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const fetchDropdownTeam = async () => {
        try {
            const routeAPI: string = '/api/team/getAllTeam';
            console.log(URLAPI+routeAPI);

            const response = await axios.get(URLAPI+routeAPI);
            let teamData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid,
                team_name: data.team_name ?? '-',
                // team_description: data.team_description ?? '-',
                // created_at: data.created_at ?? '-',
                // created_by: data.created_by ?? '-',
                // updated_at: data.updated_at ?? '-',
                // updated_by: data.update_by ?? '-',
            }));

            let teamdData2 = teamData.map((data: any, index: number) => ({
                key: data.uuid,
                value: data.team_name,
            }));

            setTeamOptions(teamdData2);

            console.log(JSON.stringify(rows));
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const createUser = async (dataNew: []) => {
        try {
            const routeAPI: string = '/api/user/createUser';
            console.log(URLAPI+routeAPI);

            const response = await axios.post(URLAPI+routeAPI, dataNew);

            console.log(JSON.stringify(response));

            setIsAddDialogOpen(false);

            await fetchUsers();

        } catch (error) {
            console.error("Failed to create users", error);
        }
    };

    return (
        <CustomContainer>
            <MyAppBar routes={routes}></MyAppBar>
            {isLoading ? (<CustomCircularProgressBar></CustomCircularProgressBar>) : (
                <>
                    <>
                        <CustomSpacer height={Constants(8)}></CustomSpacer>
                        <CustomTypography bold size={"M"}>User Master</CustomTypography>
                        <CustomSpacer height={Constants(2)}></CustomSpacer>
                        <Box sx={{ height: 'calc(100vh - 160px)', width: '100%' }}>
                            <CustomButton variant="contained" onClick={handleAddRow}>Add User</CustomButton>
                            {/*<Button variant="contained" color="primary" onClick={handleAddRow}>Add User</Button>*/}
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

                        {/*<Dialog open={isDialogOpen} onClose={handleDialogClose}>*/}
                        {/*    <DialogTitle>Edit User</DialogTitle>*/}
                        {/*    <DialogContent>*/}
                        {/*        <DialogContentText>Edit user details and save changes.</DialogContentText>*/}
                        {/*        <TextField*/}
                        {/*            margin="dense"*/}
                        {/*            name="name"*/}
                        {/*            label="Name"*/}
                        {/*            type="text"*/}
                        {/*            fullWidth*/}
                        {/*            value={selectedRow?.name || ''}*/}
                        {/*            onChange={handleInputChange}*/}
                        {/*        />*/}
                        {/*        <TextField*/}
                        {/*            margin="dense"*/}
                        {/*            name="age"*/}
                        {/*            label="Age"*/}
                        {/*            type="number"*/}
                        {/*            fullWidth*/}
                        {/*            value={selectedRow?.age || ''}*/}
                        {/*            onChange={handleInputChange}*/}
                        {/*        />*/}
                        {/*        <TextField*/}
                        {/*            margin="dense"*/}
                        {/*            name="email"*/}
                        {/*            label="Email"*/}
                        {/*            type="email"*/}
                        {/*            fullWidth*/}
                        {/*            value={selectedRow?.email || ''}*/}
                        {/*            onChange={handleInputChange}*/}
                        {/*        />*/}
                        {/*        <TextField*/}
                        {/*            margin="dense"*/}
                        {/*            name="address"*/}
                        {/*            label="Address"*/}
                        {/*            type="text"*/}
                        {/*            fullWidth*/}
                        {/*            value={selectedRow?.address || ''}*/}
                        {/*            onChange={handleInputChange}*/}
                        {/*        />*/}
                        {/*    </DialogContent>*/}
                        {/*    <DialogActions>*/}
                        {/*        <Button onClick={handleDialogClose} color="primary">Cancel</Button>*/}
                        {/*        <Button onClick={handleDialogSave} color="primary">Save</Button>*/}
                        {/*    </DialogActions>*/}
                        {/*</Dialog>*/}

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
                                    value={nik}
                                    onChange={(e) => {handleNewNIK(e)} }
                                />
                                <CustomTextField
                                    margin="dense"
                                    name="full_name"
                                    label="Full Name"
                                    type="text"
                                    fullWidth
                                    value={fullName}
                                    onChange={(e) => {handleNewFullName(e)} }
                                />
                                <CustomTextField
                                    margin="dense"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => {handleNewEmail(e)}}
                                />
                                <CustomTextField
                                    margin="dense"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    value={password}
                                    onChange={(e) => {handleNewPassword(e)}}
                                />
                                <CustomTextField
                                    margin="dense"
                                    name="gender"
                                    label="Gender"
                                    type="select"
                                    fullWidth
                                    value={gender}
                                    options={genderOptions}
                                    onChange={(e) => {
                                        handleNewGender(e);
                                    }}
                                />
                                <CustomTextField
                                    margin="dense"
                                    name="active"
                                    label="Active"
                                    type="select"
                                    fullWidth
                                    options={activeOptions}
                                    value={activeOptions}
                                    onChange={(e) => {
                                        handleNewActive(e);
                                    }}
                                />
                                <CustomTextField
                                    margin="dense"
                                    name="role"
                                    label="Role"
                                    type="select"
                                    fullWidth
                                    value={roleId}
                                    options={roleOptions}
                                    onChange={(e) => {handleNewRole(e)}}
                                />
                                <CustomTextField
                                    margin="dense"
                                    name="team"
                                    label="Team"
                                    type="select"
                                    fullWidth
                                    value={teamId}
                                    options={teamOptions}
                                    onChange={(e) => {
                                        handleNewTeam(e);
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleAddDialogClose} color="primary">Cancel</Button>
                                <Button onClick={handleAddDialogSave} color="primary">Save</Button>
                            </DialogActions>
                        </Dialog>
                    </>
                </>
            ) }
        </CustomContainer>
    );
};
export default UserMaster;
