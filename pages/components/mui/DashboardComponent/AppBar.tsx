import React, {useEffect, useState} from 'react';
import { AppBar, Toolbar, Typography, IconButton, useTheme, Box, Popover } from '@mui/material';
import { useRouter } from "next/router";
import CustomImage from "@/pages/components/mui/CustomImage";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PolytronLogo from '../../../../public/assets/polytron-icon.png';
import CustomSpacer from '../CustomSpacer';
import Constants from '../value/contants';
import axios from "axios";
import {URLAPI} from "@/pages/api/env";

interface routesInterface {
    title: string;
    route: string;
}

interface MyAppBarProps {
    hideHeaderTitle?: boolean;
    routes? : routesInterface[];
}

const MyAppBar: React.FC<MyAppBarProps> = ({ hideHeaderTitle, routes }) => {

    const [mobileOpen, setMobileOpen] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorElMenu(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const openMenu = Boolean(anchorElMenu);
    const idMenu = open ? 'simple-popover' : undefined;

    const theme = useTheme();
    const router = useRouter();

    const [routesList, setRoutesList] = useState<routesInterface[]>([]);

    let nikFromStorage: string | null = localStorage.getItem('nikUser');

    const [nik, setNik] = useState<string | null>(nikFromStorage);

    useEffect(() => {
        // @ts-ignore
        setRoutesList(routes);
        setNik(nikFromStorage ?? '');
    },[routes])

    const doFetchUser = () => {
        const addressAPI = '/api/user/getUserWithRole';

        const data = [
            {

            }
        ]

        const fetchUser = axios.post(URLAPI+addressAPI, nik);
    }

    const signOut = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nikUser');

        await router.replace('/login').then(() => {
            console.log('Back to Login');
        });
    }

    // @ts-ignore
    return (
        <AppBar>
            <Toolbar sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}>
                {!hideHeaderTitle ? (
                <Box display="flex" flexDirection="row" width="100%" alignItems="center">
                    <CustomImage size={"XS"} path={PolytronLogo}></CustomImage>
                    <CustomTypography size={'M'} bold>
                        ESD Monitoring Team
                    </CustomTypography>
                </Box>
                ) : <></>}
                <CustomSpacer width={Constants(4)}></CustomSpacer>
                {/*<IconButton color="inherit" onClick={handleThemeChange} sx={{ ml: 'auto' }}>*/}
                {/*    {!darkMode ? <Brightness7Icon /> : <Brightness4Icon />}*/}
                {/*</IconButton>*/}
                <IconButton
                    color="inherit"
                    onClick={handleMenuClick}
                >
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <ExpandMoreIcon />
                        <CustomTypography>
                            Menu
                        </CustomTypography>
                    </Box>
                </IconButton>
                <CustomSpacer width={Constants(2)}></CustomSpacer>
                <IconButton
                    color="inherit"
                    onClick={handleProfileClick}
                >
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <AccountCircleIcon />
                        <CustomTypography>
                            {nik}
                        </CustomTypography>
                    </Box>
                </IconButton>
                <Popover
                    id={idMenu}
                    open={openMenu}
                    anchorEl={anchorElMenu}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box
                        p={2}
                        display="flex"
                        flexDirection="column"
                        overflow="auto"  // Enables horizontal scrolling
                        width="100%"      // Ensures the Box takes full width of its container
                        justifyContent="flex-end"
                    >
                        {routesList.map((item, index) => (
                            <React.Fragment key={index}>
                                <CustomSpacer height={Constants(1)}></CustomSpacer>
                                <CustomSpacer height={Constants(2)}></CustomSpacer>
                                <CustomTypography size={'S'} hoverable={true} onClick={() => {
                                    router.replace(item.route);
                                }}>
                                    {item.title}
                                </CustomTypography>
                                <CustomSpacer height={Constants(1)}></CustomSpacer>
                            </React.Fragment>
                        ))}
                    </Box>
                </Popover>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleProfileClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box p={2}>
                        <Typography variant="h6">Welcome, fefjesifjsijfiesjfijsifjsif</Typography>
                        <CustomSpacer height={Constants(4)}></CustomSpacer>
                        <Typography variant="body1"></Typography>
                        {/* Add more profile information here */}
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                signOut().then(r => {});
                            }}
                        >
                            <Box display="flex" flexDirection="row">
                                <ExitToAppIcon style={{ color: 'red' }} />
                                <CustomSpacer width={Constants(1)}></CustomSpacer>
                                <CustomTypography>
                                    Sign Out
                                </CustomTypography>
                            </Box>
                        </IconButton>
                    </Box>
                </Popover>
                <CustomSpacer width={Constants(1)}></CustomSpacer>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
