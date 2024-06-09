import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import CustomButton from "@/pages/components/mui/CustomButton";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import {router} from "next/client";

export const NoConnection = () => {
    return (
        <CustomContainerCenter>
            <CustomTypography>Something wrong, please try again.</CustomTypography>
            <CustomButton variant={'contained'} onClick={() => {
                router.replace('/').then(r => {});
            }}>Reload</CustomButton>
        </CustomContainerCenter>
    );
}

export default NoConnection;

