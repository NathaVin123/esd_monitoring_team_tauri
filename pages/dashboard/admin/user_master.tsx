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

const UserMaster = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rows, setRows] = useState<[]>(initialRows);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // Confirmation dialog state
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
    const [activeUser, setActiveUser] = useState<boolean | null>(null);
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
    const nikFromLocal: string | null = localStorage.getItem('nik');
    const [createdBy, setCreatedBy] = useState<string>('');

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
        { field: 'id', headerName: 'ID', width: 50, sortable: false },
        { field: 'nik', headerName: 'NIK', width: 200, editable: false },
        { field: 'full_name', headerName: 'Full Name', width: 200, editable: false },
        { field: 'email', headerName: 'Email', width: 200, editable: false },
        { field: 'gender', headerName: 'Gender', width: 200, editable: false },
        { field: 'active_user', headerName: 'Active', width: 200, editable: false },
        { field: 'role', headerName: 'Role', width: 200, editable: false },
        { field: 'team', headerName: 'Team', width: 200, editable: false },
        { field: 'created_at', headerName: 'Created At', width: 200, editable: false },
        { field: 'updated_at', headerName: 'Updated At', width: 200, editable: false },
        { field: 'created_by', headerName: 'Created By', width: 200, editable: false },
        { field: 'updated_by', headerName: 'Updated By', width: 200, editable: false },
    ];

    useEffect(() => {
        setIsLoading(true);
        fetchUsers().then(() => {
            fetchDropdownTeam().then(() => {
                fetchDropdownRole().then(() => {
                    const nikFromLocal: string | null = localStorage.getItem('nikUser');
                    console.log('Get All User Completed')
                    setCreatedBy(nikFromLocal ?? '');
                    setIsLoading(false);
                });
            });
        });
    }, []);

    const handleAddRow = () => {
        setNik('');
        setEmail('');
        setFullName('');
        setGender('');
        setRoleId('');
        setTeamId('');

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

            await createUser(dataNew);
        } catch (error) {
            console.error("Failed to add user", error);
        }
    };

    const handleNewNIK = (e: any) => {
        setNik(e.target.value);
    };

    const handleNewFullName = (e: any) => {
        setFullName(e.target.value);
    };

    const handleNewPassword = (e: any) => {
        setPassword(e.target.value);
    };

    const handleNewEmail = (e: any) => {
        setEmail(e.target.value);
    };

    const handleNewGender = (e: any) => {
        setGender(e.target.value);
    };

    const handleNewActive = (e: any) => {
        setActiveUser(e.target.value === 'true');
    };

    const handleNewRole = (e: any) => {
        setRoleId(e.target.value);
    };

    const handleNewTeam = (e: any) => {
        setTeamId(e.target.value);
    };

    const fetchUsers = async () => {
        try {
            const routeAPI: string = '/api/user/getAllUser';
            const response = await axios.get(URLAPI + routeAPI);

            let userData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid ?? '-',
                nik: data.nik ?? '-',
                full_name: data.full_name ?? '-',
                email: data.email ?? '-',
                gender: data.gender ?? '-',
                role: data.role.role_name ?? '-',
                team: data.team.team_name ?? '-',
                active_user: data.active_user ? 'Active' : 'Non - Active',
                created_at: data.created_at ? moment(data.created_at).format('DD/MM/YYYY hh:mm:ss') : '-',
                created_by: data.created_by ?? '-',
                updated_at: data.updated_at ? moment(data.updated_at).format('DD/MM/YYYY hh:mm:ss') : '-',
                updated_by: data.updated_by ?? '-',
            }));

            setRows(userData);
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const fetchDropdownRole = async () => {
        try {
            const routeAPI: string = '/api/role/getAllRole';
            const response = await axios.get(URLAPI + routeAPI);
            let roleData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid ?? '-',
                role_name: data.role_name ?? '-',
            }));

            let roleOptions = roleData.map((data: any) => ({
                key: data.uuid,
                value: data.role_name,
            }));

            setRoleOptions(roleOptions);
        } catch (error) {
            console.error("Failed to fetch roles", error);
        }
    };

    const fetchDropdownTeam = async () => {
        try {
            const routeAPI: string = '/api/team/getAllTeam';
            const response = await axios.get(URLAPI + routeAPI);
            let teamData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid: data.uuid,
                team_name: data.team_name ?? '-',
            }));

            let teamOptions = teamData.map((data: any) => ({
                key: data.uuid,
                value: data.team_name,
            }));

            setTeamOptions(teamOptions);
        } catch (error) {
            console.error("Failed to fetch teams", error);
        }
    };

    const createUser = async (dataNew: any) => {
        try {
            const routeAPI: string = '/api/user/createUser';
            await axios.post(URLAPI + routeAPI, dataNew);
            setIsAddDialogOpen(false);
            await fetchUsers();
        } catch (error) {
            console.error("Failed to create user", error);
        }
    };

    const handleEditRow = (row: any) => {
        setSelectedRow([]);
        setNik('');
        setEmail('');
        setFullName('');
        setGender('');
        setRoleId('');
        setTeamId('');

        setSelectedRow(row);
        setNik(row.nik);
        setEmail(row.email);
        setFullName(row.full_name);
        setGender(row.gender);
        setRoleId(row.role);
        setTeamId(row.team);
        setActiveUser(row.active_user === 'Active');
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
            await deleteUser(selectedRow);
            setIsConfirmDialogOpen(false);
            setSelectedRow(null);
            await fetchUsers();
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    };

    const handleDeleteRow = async (row: any) => {
        setSelectedRow(row);

        const deletedRow = {
            nik: row.nik,
        };

        await deleteUser(deletedRow);
    }

    const handleEditDialogSave = async () => {
        try {
            const updatedRow = {
                nik: nik,
                roleId: roleId,
                teamId: teamId,
                email: email,
                fullName: fullName,
                gender: gender,
                activeUser: activeUser,
            };

            await updateUser(updatedRow);

            setIsDialogOpen(false);
            setSelectedRow(null);

            await fetchUsers();
        } catch (error) {
            console.error("Failed to update user", error);
        }
    };

    const deleteUser = async (deleteRow: any) => {
        try {
            const routeAPI: string = `/api/user/deleteUser`;
            await axios.post(URLAPI + routeAPI, deleteRow);
            await fetchUsers();
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    };

    const updateUser = async (updatedRow: any) => {
        try {
            const routeAPI: string = `/api/user/updateUser`;
            await axios.post(URLAPI + routeAPI, updatedRow);
            await fetchUsers();
        } catch (error) {
            console.error("Failed to update user", error);
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
                    <CustomTypography bold size={"M"}>User Master</CustomTypography>
                    <CustomSpacer height={Constants(2)}></CustomSpacer>
                    <Box sx={{ height: 'calc(100vh - 160px)', width: '100%' }}>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <CustomButton variant="contained" onClick={handleAddRow}>Add User</CustomButton>
                            <IconButton onClick={fetchUsers}>
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
                                onChange={handleNewNIK}
                            />
                            <CustomTextField
                                margin="dense"
                                name="full_name"
                                label="Full Name"
                                type="text"
                                fullWidth
                                value={fullName}
                                onChange={handleNewFullName}
                            />
                            <CustomTextField
                                margin="dense"
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={handleNewEmail}
                            />
                            <CustomTextField
                                margin="dense"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={handleNewPassword}
                            />
                            <CustomTextField
                                margin="dense"
                                name="gender"
                                label="Gender"
                                type="select"
                                fullWidth
                                value={gender}
                                options={genderOptions}
                                onChange={handleNewGender}
                            />
                            <CustomTextField
                                margin="dense"
                                name="active"
                                label="Active"
                                type="select"
                                fullWidth
                                options={activeOptions}
                                value={activeUser?.toString() ?? ''}
                                onChange={handleNewActive}
                            />
                            <CustomTextField
                                margin="dense"
                                name="role"
                                label="Role"
                                type="select"
                                fullWidth
                                value={roleId}
                                options={roleOptions}
                                onChange={handleNewRole}
                            />
                            <CustomTextField
                                margin="dense"
                                name="team"
                                label="Team"
                                type="select"
                                fullWidth
                                value={teamId}
                                options={teamOptions}
                                onChange={handleNewTeam}
                            />
                        </DialogContent>
                        <DialogActions>
                            <CustomButton variant={'contained'} onClick={handleAddDialogClose}>Cancel</CustomButton>
                            <CustomButton variant={'contained'} onClick={handleAddDialogSave}>Save</CustomButton>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Update user details and save.</DialogContentText>
                            <CustomTextField
                                margin="dense"
                                name="full_name"
                                label="Full Name"
                                type="text"
                                fullWidth
                                value={fullName}
                                onChange={handleNewFullName}
                            />
                            <CustomTextField
                                margin="dense"
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={handleNewEmail}
                            />
                            <CustomTextField
                                margin="dense"
                                name="gender"
                                label="Gender"
                                type="select"
                                fullWidth
                                value={gender}
                                options={genderOptions}
                                onChange={handleNewGender}
                            />
                            <CustomTextField
                                margin="dense"
                                name="active"
                                label="Active"
                                type="select"
                                fullWidth
                                options={activeOptions}
                                value={activeUser?.toString() ?? ''}
                                onChange={handleNewActive}
                            />
                            <CustomTextField
                                margin="dense"
                                name="role"
                                label="Role"
                                type="select"
                                fullWidth
                                value={roleId}
                                options={roleOptions}
                                onChange={handleNewRole}
                            />
                            <CustomTextField
                                margin="dense"
                                name="team"
                                label="Team"
                                type="select"
                                fullWidth
                                value={teamId}
                                options={teamOptions}
                                onChange={handleNewTeam}
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
                                Are you sure you want to delete this user?
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
};

export default UserMaster;
