import {NextPage} from "next";
import CustomTypography from "@/pages/components/mui/CustomTypography";

export const SettingPage = () => {
    return (
        <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
                <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                        <CustomTypography size={'M'}>Setting</CustomTypography>
                </div>
        </div>
    );
}