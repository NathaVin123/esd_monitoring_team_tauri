// components/AppBar.tsx
import React, {useEffect, useState} from 'react';
import { AppBar, Toolbar, Typography, IconButton, useTheme, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomImage from "@/pages/components/mui/CustomImage";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import PolytronLogo from '../../../../public/assets/polytron-icon.png';
import Sidebar from "@/pages/components/mui/DashboardComponent/SideBar";

interface MyAppBarProps {
    handleDrawerToggle: () => void;
    darkMode: boolean;
    onThemeChange: () => void;
    hideHeaderTitle?: boolean;
}

const MyAppBar: React.FC<MyAppBarProps> = ({ handleDrawerToggle, darkMode, onThemeChange, hideHeaderTitle }) => {
    const theme = useTheme();
    const router = useRouter();

    const [customTitle, setCustomTitle] = useState<string | null>('ESD Monitoring Team');

    useEffect(() => {
        const titleFromOtherComponent = localStorage.getItem('customTitle');

        setCustomTitle(titleFromOtherComponent ?? 'ESD Monitoring Team');
    },[])

    return (
        <AppBar position="absolute">
            <Toolbar sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}>
                {(router.pathname === '/dashboard/admin') && (
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    </>
                )}

                {(router.pathname !== '/login' && router.pathname !== '/dashboard' && router.pathname !== '/dashboard/admin') && (
                    <IconButton onClick={() => router.back()} sx={{ mr: 1 }}>
                        <ArrowBackIcon />
                    </IconButton>
                )}
                {!hideHeaderTitle ? (
                <>
                    <CustomImage size={"XS"} path={PolytronLogo}></CustomImage>
                    <CustomTypography size={'M'} bold>
                        {customTitle}
                    </CustomTypography>
                </>
                ) : <></>}
                <IconButton color="inherit" onClick={onThemeChange} sx={{ ml: 'auto' }}>
                    {!darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <Switch checked={darkMode} onChange={onThemeChange} color="default" />
                {/*<Typography variant="h6" noWrap>*/}
                {/*    Dashboard*/}
                {/*</Typography>*/}
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
