import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import CustomButton from "@/pages/components/mui/CustomButton";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import {router} from "next/client";
import {useEffect} from "react";

export const NoConnection = () => {
    useEffect(() => {

    }, []);

    return (
        <CustomContainerCenter>
            <CustomTypography>Something wrong, please try again.</CustomTypography>
            <CustomButton variant={'contained'} onClick={() => {
                router.replace('/').then(() => {});
            }}>Reload</CustomButton>
        </CustomContainerCenter>
    );
}

export default NoConnection;

