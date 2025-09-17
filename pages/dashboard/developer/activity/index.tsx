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
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import CustomButton from "@/pages/components/mui/CustomButton";
import {Refresh} from "@mui/icons-material";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {TiTick} from "react-icons/ti";
import {ca} from "date-fns/locale";

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

export const DevActivityPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [rowsMonitoring, setRowsMonitoring] = useState<MonitoringData[]>([]);

    const handleStart = async (id: number) => {
        const updatedRows = rowsMonitoring.map(row => row.id === id ? { ...row, isRunning: true } : row);
        setRowsMonitoring(updatedRows);

        const selectedRow = updatedRows.find(row => row.id === id);
        if (selectedRow) {
            await doUpdateMonitoringStart(selectedRow);
        }

        fetchMonitoring(userUUID).then(() => {
            setIsLoading(false);
        });

        setIsRunning(true);
    };

    const handleStop = async (id: number) => {
        const updatedRows = rowsMonitoring.map(row => row.id === id ? { ...row, isRunning: false } : row);
        setRowsMonitoring(updatedRows);

        const selectedRow = updatedRows.find(row => row.id === id);
        if (selectedRow) {
            await doUpdateMonitoringEnd(selectedRow);
        }

        fetchMonitoring(userUUID).then(() => {
            setIsLoading(false);
        });

        setIsRunning(false);
    };

    const doUpdateMonitoringStart = async (params : any) => {
        try {
            setIsLoading(true);
            console.log('Tes Monitoring start : ',params);
            const routeAPI: string = '/api/monitoring/updateMonitoringStart';

            const data = {
                uuid: params.uuid,
            };

            console.log('Data : ', data);

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
            console.log(error);
        }
    }

    const columnsMonitoring: GridColDef[] = [
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            sortable: false,
            renderCell: (params: GridRenderCellParams<MonitoringData>) => {
                return (
                    <div>
                        {!params.row.active ? (
                            <>
                                <IconButton onClick={() => handleStart(params.row.id)}>
                                    <PlayArrowIcon />
                                    <CustomTypography>Start</CustomTypography>
                                </IconButton>
                                {/*<IconButton onClick={() => {*/}
                                {/*    console.log(params.row);*/}
                                {/*}}>*/}
                                {/*    <TiTick>*/}
                                {/*    </TiTick>*/}
                                {/*    <CustomTypography>Done</CustomTypography>*/}
                                {/*</IconButton>*/}
                            </>

                        ) : (
                            <IconButton onClick={() => handleStop(params.row.id)}>
                                <StopIcon />
                                <CustomTypography>Stop</CustomTypography>
                            </IconButton>
                        )}
                    </div>
                );
            }
        },
        { field: 'id', headerName: 'ID', width: 50, sortable: false },
        { field: 'project_name', headerName: 'Project Name', width: 200, editable: false },
        { field: 'task_name', headerName: 'Activity Name', width: 200, editable: false },
        // { field: 'case_name', headerName: 'Case Name', width: 200, editable: false },
        { field: 'team_name', headerName: 'Team Name', width: 200, editable: false },
        { field: 'start_time', headerName: 'Start Time', width: 200, editable: false },
        { field: 'end_time', headerName: 'End Time', width: 200, editable: false },
        { field: 'duration', headerName: 'Duration', width: 200, editable: false },
    ];

    const fetchMonitoring = async (userId: any) => {
        try {
            console.log('Fetch Monitoring...');
            const routeAPI: string = '/api/monitoring/getMonitoring';

            console.log(URLAPI + routeAPI);

            const data = {
                userId: userId,
            };

            const response = await axios.post(URLAPI + routeAPI, data);

            const activeUserMonitoringData = response.data.data.map((data: any, index: number) => {
                const duration = moment.duration(data.duration, 'seconds');

                const days = duration.days();
                const hours = duration.hours();
                const minutes = duration.minutes();
                const seconds = duration.seconds();

                let durationString = '';
                if (days > 0) durationString += `${days} Days `;
                if (hours > 0) durationString += `${hours} Hours `;
                if (minutes > 0) durationString += `${minutes} Minutes `;
                if (seconds > 0 || durationString === '') durationString += `${seconds} Seconds`;

                return {
                    id: index + 1,
                    uuid: data.uuid,
                    project_name: data.project?.project_name ?? '-',
                    taskId: data.task?.task_name ?? "",
                    caseId: data.case?.case_name ?? "",
                    task_name: data.task?.task_name ? data.task?.task_name ?? '-' : data.case?.case_name ?? '-',
                    team_name: data.team?.team_name ?? '-',
                    start_time: data.start_time ? moment(data.start_time).format('hh:mm:ss') : '-',
                    end_time: data.end_time ? moment(data.end_time).format('hh:mm:ss') : '-',
                    remark: data.remark ?? '-',
                    duration: durationString.trim(),
                    active: data.active
                };
            });

            console.log(activeUserMonitoringData);

            setRowsMonitoring(activeUserMonitoringData);
        } catch (error) {
            console.log(error);
        }
    };

    const [userUUID, setUserUUID] = useState<string>('');

    const [userTeam, setUserTeam] = useState<string>('');

    const router = useRouter();

    const fetchUser = async () => {
        try {
            const routeAPI: string = '/api/user/getFirstUser';

            const nik = localStorage.getItem('nikUser');

            let dataReq = {
                nik: nik,
            }

            let response = await axios.post(URLAPI+routeAPI, dataReq);

            if(response) {
                let dataUser = response.data.data;

                setUserUUID(dataUser.uuid);
                setUserTeam(dataUser.team_master_id);
            }
        await fetchMonitoring(userUUID);
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
            console.log("Failed to fetch users", error);
        }
    }

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef: any = useRef(null);

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isRunning]);

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    const formatTime = (time : any) => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes : any = `${Math.floor(time / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    };

    const monitoringDone = async () => {
        try {

            let dataReq = {
                uuid: '',
                taskId : '',
                caseId : '',
            };

            let response = await axios.post(URLAPI+'/api/monitoring/monitoringDone', dataReq);

            if(response) {

            } else {

            }
        } catch (error : any) {
            await router.replace({
                pathname: '/error',
                query : {
                    message: error.message,
                }});
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchUser().then(() => {
            // fetchMonitoring(userUUID).then(() => {
                setIsLoading(false);
            // });
        });

    }, [userUUID]);

    return (
      <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        <div style={{ height: "100%", overflow: "auto", padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CustomTypography bold size={"M"}>
              Activity
            </CustomTypography>
            <IconButton
              onClick={() => {
                fetchMonitoring(userUUID).then(() => {});
              }}
            >
              <Refresh></Refresh>
            </IconButton>
          </div>

          <h1>{formatTime(time)}</h1>

          <CustomSpacer height={Constants(2)}></CustomSpacer>
          <StyledDataGrid
            rows={rowsMonitoring}
            columns={columnsMonitoring}
            getRowClassName={(params: GridRowClassNameParams) => {
              if (params.row.active) {
                return "greenRow";
              }
              return "";
            }}
          />
        </div>
        {isLoading ? (
          <>
            <CustomProgressBarEntireScreen />
          </>
        ) : (
          <></>
        )}
      </div>
    );
};

export default DevActivityPage;
