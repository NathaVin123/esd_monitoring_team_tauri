// components/AppBar.tsx
import React, {useEffect, useState} from 'react';
import { AppBar, Toolbar, Typography, IconButton, useTheme, Switch, Box } from '@mui/material';
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomImage from "@/pages/components/mui/CustomImage";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import PolytronLogo from '../../../../public/assets/polytron-icon.png';
import CustomSpacer from '../CustomSpacer';
import Constants from '../value/contants';

interface MyAppBarProps {
    handleDrawerToggle: () => void;
    darkMode: boolean;
    onThemeChange: () => void;
    hideHeaderTitle?: boolean;
}

const MyAppBar: React.FC<MyAppBarProps> = ({ handleDrawerToggle, darkMode, onThemeChange, hideHeaderTitle }) => {
    const theme = useTheme();
    const router = useRouter();

    useEffect(() => {

    },[])

    const signOut = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nikUser');

        await router.replace('/login').then(() => {
            console.log('Back to Login');
        });
    }

    const routesAdmin = [
        {
            title: 'Dashboard',
            route: '/dashboard/admin'
        },
        {
            title: 'User Master',
            route: '/dashboard/admin/user_master'
        },
        {
            title: 'Role Master',
            route: '/dashboard/admin/role_master'
        },
        {
            title: 'Team Master',
            route: '/dashboard/admin/team_master'
        },
    ];

    return (
        <AppBar>
            <Toolbar sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}>
                {/*{(router.pathname !== '/login' && router.pathname !== '/dashboard' && router.pathname !== '/dashboard/admin') && (*/}
                {/*    <IconButton onClick={() => router.back()} sx={{ mr: 1 }}>*/}
                {/*        <ArrowBackIcon />*/}
                {/*    </IconButton>*/}
                {/*)}*/}
                {!hideHeaderTitle ? (
                <Box display="flex" flexDirection="row" width="100%" alignItems="center">
                    <CustomImage size={"XS"} path={PolytronLogo}></CustomImage>
                    <CustomTypography size={'M'} bold>
                        ESD Monitoring Team
                    </CustomTypography>
                </Box>
                ) : <></>}
                <Box    display="flex"
                        flexDirection="row"
                        overflow="auto"  // Enables horizontal scrolling
                        width="100%"      // Ensures the Box takes full width of its container
                        justifyContent="flex-end"
                    >
                    {routesAdmin.map((item, index) => (
                        <React.Fragment key={index}>
                            <CustomSpacer width={theme.spacing(2)}></CustomSpacer>
                            <CustomTypography size={'S'} hoverable={true} onClick={() => {
                                router.replace(item.route);
                            }}>
                                {item.title}
                            </CustomTypography>
                        </React.Fragment>
                    ))}
                </Box>
                <CustomSpacer width={Constants(2)}></CustomSpacer>
                <IconButton color="inherit" onClick={onThemeChange} sx={{ ml: 'auto' }}>
                    {!darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <IconButton
                    color="inherit"
                    onClick={() => {
                        signOut()
                    }}
                    sx={{ ml: 2 }}
                >
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
