import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import CustomImage from "@/pages/components/mui/CustomImage";

import PolytronLogo from '../../public/assets/polytron-icon.png';
import CustomTypography from "@/pages/components/mui/CustomTypography";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {Box} from "@mui/material";

export const AboutPage = () => {
    return (
        <Box sx={{flex: 1, height: '100vh', width: '100vw', overflow:'hidden', justifyContent: 'space-between'}}>
            <CustomImage size={'XL'} path={PolytronLogo}></CustomImage>
            <CustomTypography size={'L'}>ESD Monitoring Team</CustomTypography>
            <CustomSpacer height={Constants(3)}></CustomSpacer>
            <CustomTypography size={'S'}>Developed By : Nathaniel Vincent Wibowo - 01017533</CustomTypography>
        </Box>
    );
}

export default AboutPage;