import * as React from 'react';
import CustomTypography from "@/pages/components/mui/CustomTypography";


export const SADashboard = () => {
    return (
        <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
            <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                <CustomTypography bold size={'M'}>Dashboard</CustomTypography>
            </div>
        </div>
    );
}

export default SADashboard;