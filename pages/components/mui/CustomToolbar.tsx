import {AppBar, IconButton, Switch, Toolbar, useTheme} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import CustomTypography from "@/pages/components/mui/CustomTypography"; // Update the import path as necessary
import * as React from "react";
import CustomImage from "@/pages/components/mui/CustomImage";

import PolytronLogo from '../../../public/assets/polytron-icon.png';
import {styled} from "@mui/material/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useRouter} from "next/router";

const CustomToolbarContainer = styled(AppBar)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1300, // Ensure it is above other content
});

interface CustomToolbarProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ darkMode, onThemeChange }) => {
    const theme = useTheme();

    const router = useRouter();

    return (
        <CustomToolbarContainer>
            <Toolbar
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                }}
            >
                {router.pathname !== '/login' && <IconButton onClick={() => router.back()} sx={{ mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>}
                {/*{router.pathname !== '/login' && ()}*/}
                {/*<IconButton onClick={() => router.back()} sx={{ mr: 1 }}>*/}
                {/*    <ArrowBackIcon />*/}
                {/*</IconButton>*/}
                <CustomImage size={"XS"} path={PolytronLogo}></CustomImage>
                <CustomTypography size={'M'} bold>
                    ESD Monitoring Team
                </CustomTypography>
                <IconButton color="inherit" onClick={onThemeChange} sx={{ ml: 'auto' }}>
                    {!darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <Switch checked={darkMode} onChange={onThemeChange} color="default" />
            </Toolbar>
        </CustomToolbarContainer>

    );
}

export default CustomToolbar;
