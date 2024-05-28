import PolytronLogo from "../../public/assets/polytron-icon.png";
import {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomContainer, { CustomContainerCenter } from "@/pages/components/mui/CustomContainer";
import CustomImage from "@/pages/components/mui/CustomImage";
import { CustomLinearProgessBar, CustomCircularProgressBar } from "@/pages/components/mui/CustomProgressBar";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import CustomButton from "@/pages/components/mui/CustomButton";
import CustomToast from "@/pages/components/mui/CustomToast";
import useAuthRedirect from "@/pages/components/other/useAuthRedirect";
import {AlertColor} from "@mui/material"; // Import the custom hook

export default function Splash() {

    const [toastOpen, setToastOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const useAuthRedirect1= useAuthRedirect();

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    const [message, setMessage] = useState<string>('');

    const [severity, setSeverity] = useState<AlertColor>('info');

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token in Splash : '+ token);
        console.log('useAuthRedirect1 : '+useAuthRedirect1);

        if(useAuthRedirect1) {
            setMessage('Login Successfully!')
            setSeverity('success');
        } else {
            setMessage('Session over!')
            setSeverity('warning');
        }
    }, []);

    return (
        <CustomContainerCenter>
            <CustomImage path={PolytronLogo} />
            <CustomTypography size={"L"} bold>ESD Monitoring Team</CustomTypography>
            <CustomSpacer height={Constants(2)} />
            <CustomLinearProgessBar />
            <CustomSpacer height={Constants(2)} />
            <CustomToast open={toastOpen} onClose={handleCloseToast} message={message}></CustomToast>
        </CustomContainerCenter>

    );
}
