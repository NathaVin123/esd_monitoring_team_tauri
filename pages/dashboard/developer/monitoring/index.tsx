import { DataGrid, GridColDef, GridRowClassNameParams, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { styled } from '@mui/system';
import axios from 'axios';
import moment from 'moment';
import CustomTypography from "@/pages/components/mui/CustomTypography";
import { CustomProgressBarEntireScreen } from "@/pages/components/mui/CustomProgressBar";
import { URLAPI } from "@/pages/api/env";
import {useEffect, useState} from "react";

const StyledDataGrid = styled(DataGrid)({
    '& .greenRow': {
        backgroundColor: 'green !important',
        color: 'white !important',
        '& .MuiSvgIcon-root': {
            color: 'white !important',
        },
        '& .MuiTypography-root': {
            color: 'white !important',
        },
        '&:hover': {
            backgroundColor: 'darkgreen !important',
        },
    },
});

interface MonitoringData {
    id: number;
    task_name: string;
    case_name: string;
    start_time: string;
    end_time: string;
    remark: string;
    active: boolean;
    isRunning: boolean;
}

export const DevMonitoringPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [rowsMonitoring, setRowsMonitoring] = useState<MonitoringData[]>([]);

    const handleStart = async (id: number) => {
        const updatedRows = rowsMonitoring.map(row => row.id === id ? { ...row, isRunning: true } : row);
        setRowsMonitoring(updatedRows);

        const selectedRow = updatedRows.find(row => row.id === id);
        if (selectedRow) {
            await doUpdateMonitoringStart(selectedRow);
        }

        const data = {
            userId: 'f6ab8c06-2bff-45f1-a857-630b98bee836daf',
        };

        fetchMonitoring(data).then(() => {
            setIsLoading(false);
        });
    };

    const handleStop = async (id: number) => {
        const updatedRows = rowsMonitoring.map(row => row.id === id ? { ...row, isRunning: false } : row);
        setRowsMonitoring(updatedRows);

        const selectedRow = updatedRows.find(row => row.id === id);
        if (selectedRow) {
            await doUpdateMonitoringEnd(selectedRow);
        }

        const data = {
            userId: 'f6ab8c06-2bff-45f1-a857-630b98bee836daf',
        };

        fetchMonitoring(data).then(() => {
            setIsLoading(false);
        });
    };

    const doUpdateMonitoringStart = async (params : any) => {
        try {
            setIsLoading(true);
            console.log('Tes Monitoring start : ',params);
            const routeAPI: string = '/api/monitoring/updateMonitoringStart';

            const data = {
                uuid: params.uuid,
            };

            const response = await axios.post(URLAPI + routeAPI, data);

            if(response) {
                console.log('API Monitoring Start Success');
            } else {
                console.log('Something wrong');
            }

            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    const doUpdateMonitoringEnd = async (params: any) => {
        try {
            setIsLoading(true);
            console.log('Tes Monitoring end : ',params);

            const routeAPI: string = '/api/monitoring/updateMonitoringEnd';


            const data = {
                uuid: params.uuid,
            };

            const response = await axios.post(URLAPI + routeAPI, data);

            if(response) {
                console.log('API Monitoring End Success');
            } else {
                console.log('Something wrong');
            }

            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const columnsMonitoring: GridColDef[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            sortable: false,
            renderCell: (params: GridRenderCellParams<MonitoringData>) => {
                return (
                    <div>
                        {!params.row.active ? (
                            <IconButton onClick={() => handleStart(params.row.id)}>
                                <PlayArrowIcon />
                                <CustomTypography>Start</CustomTypography>
                            </IconButton>
                        ) : (
                            <IconButton onClick={() => handleStop(params.row.id)}>
                                <StopIcon />
                                <CustomTypography>Stop</CustomTypography>
                            </IconButton>
                        )}
                        <IconButton onClick={() => {}}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => {}}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                );
            }
        },
        { field: 'id', headerName: 'ID', width: 50, sortable: false },
        { field: 'task_name', headerName: 'Task Name', width: 200, editable: false },
        { field: 'case_name', headerName: 'Case Name', width: 200, editable: false },
        { field: 'task_description', headerName: 'Task Description', width: 200, editable: false },
        { field: 'start_time', headerName: 'Start Time', width: 200, editable: false },
        { field: 'end_time', headerName: 'End Time', width: 200, editable: false },
    ];

    const fetchMonitoring = async (userId: any) => {
        try {
            console.log('Fetch Monitoring...');
            setIsLoading(true);
            const routeAPI: string = '/api/monitoring/getMonitoring';

            console.log(URLAPI + routeAPI);

            const data = {
                uuid: userId,
            };

            const response = await axios.post(URLAPI + routeAPI, userId);

            const activeUserMonitoringData = response.data.data.map((data: any, index: number) => ({
                id: index + 1,
                uuid : data.uuid,
                task_name: data.task?.task_name ?? '-',
                case_name: data.case?.case_name ?? '-',
                start_time: data.start_time ? moment(data.start_time).format('hh:mm:ss') : '-',
                end_time: data.end_time ? moment(data.end_time).format('hh:mm:ss') : '-',
                remark: data.remark ?? '-',
                active: data.active
                // isRunning: false,
            }));

            console.log(activeUserMonitoringData);

            setRowsMonitoring(activeUserMonitoringData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const data = {
            userId: 'f6ab8c06-2bff-45f1-a857-630b98bee836daf',
        };

        fetchMonitoring(data).then(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <div style={{ height: '100%', overflow: 'auto', padding: '20px' }}>
                <CustomTypography size={'M'}>Monitoring</CustomTypography>

                <StyledDataGrid
                    rows={rowsMonitoring}
                    columns={columnsMonitoring}
                    getRowClassName={(params: GridRowClassNameParams) => {
                        if (params.row.active) {
                            return 'greenRow';
                        }
                        return '';
                    }}
                />

            </div>
            {isLoading ? (
                <>
                    <CustomProgressBarEntireScreen />
                </>
            ) : (
                <>
                </>
            )}
        </div>
    );
};

export default DevMonitoringPage;
