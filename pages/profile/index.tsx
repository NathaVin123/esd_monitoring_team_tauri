import {NextPage} from "next";
import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import CustomTypography from "@/pages/components/mui/CustomTypography";

export const ProfilePage = () => {
    return (
        <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
            <div style={{height: '100%', overflow: 'auto', padding: '20px'}}>
                <CustomTypography size={'M'}>Profile</CustomTypography>
            </div>
        </div>
    );
}

export default ProfilePage;