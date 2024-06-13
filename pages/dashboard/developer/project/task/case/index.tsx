import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import React from "react";
import CustomButton from "@/pages/components/mui/CustomButton";
import {ArrowBack} from "@mui/icons-material";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useRouter} from "next/router";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const DevCasePage = () => {
    const router = useRouter();

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
        { field: 'case_name', headerName: 'Case Name', width: 200, editable: false },
        { field: 'case_description', headerName: 'Case Description', width: 200, editable: false },
        // { field: 'email', headerName: 'Email', width: 200, editable: false },
        // { field: 'gender', headerName: 'Gender', width: 200, editable: false },
        // { field: 'active_user', headerName: 'Active', width: 200, editable: false },
        // { field: 'role', headerName: 'Role', width: 200, editable: false },
        // { field: 'team', headerName: 'Team', width: 200, editable: false },
        // { field: 'created_at', headerName: 'Created At', width: 200, editable: false },
        // { field: 'updated_at', headerName: 'Updated At', width: 200, editable: false },
        // { field: 'created_by', headerName: 'Created By', width: 200, editable: false },
        // { field: 'updated_by', headerName: 'Updated By', width: 200, editable: false },
    ];

    return (
        <>
            <MyAppBar></MyAppBar>
            <div>
                <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
                    <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                        <CustomButton leftIcon={<ArrowBack/>} variant="contained" color="primary" onClick={() => {
                            router.back();
                        }} style={{marginBottom: '20px'}}>
                            Back
                        </CustomButton>
                        <CustomTypography size={'M'}>Task</CustomTypography>

                        <DataGrid columns={columns}></DataGrid>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}