import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomButton from "@/pages/components/mui/CustomButton";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";

export const ErrorPage = () => {
    const router = useRouter();

    const {message} = router.query;

    return(
        <CustomContainerCenter>
            <CustomTypography size={'M'}>{message ?? ''}</CustomTypography>
            <CustomSpacer height={Constants(2)}></CustomSpacer>
            <CustomButton variant={'contained'} onClick={() => {
                router.replace('/splash').then(r => {});
            }}>Try Again</CustomButton>
        </CustomContainerCenter>
    );
}

export default ErrorPage;