import CustomTypography from "@/pages/components/mui/CustomTypography";
import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import React from "react";

export const DevMonitoringPage = () => {
    return (
        <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
            <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                <CustomTypography size={'M'}>Monitoring</CustomTypography>
            </div>
        </div>
    );
}