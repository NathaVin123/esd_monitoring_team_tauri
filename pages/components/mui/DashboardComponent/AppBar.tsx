import React, {useEffect, useState} from 'react';
import { AppBar, Toolbar, Typography, IconButton, useTheme, Box, Popover } from '@mui/material';
import { useRouter } from "next/router";
import CustomImage from "@/pages/components/mui/CustomImage";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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

function isLocalStorageAvailable() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

const MyAppBar: React.FC<MyAppBarProps> = ({ hideHeaderTitle, routes }) => {

    const [mobileOpen, setMobileOpen] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);

    const [name, setName] = useState<string>('');


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

    const [routesList, setRoutesList] = useState<routesInterface[] | undefined>([]);

    useEffect(() => {
        console.log('App Bar NIK : '+localStorage.getItem('nikUser'));

        doFetchUser().then(() => {
            console.log('Successfully fetching user');
        })

    },[routes])

    const doFetchUser = async () => {
        const routeAPI: string = '/api/user/getUserWithRole';

        const nik = localStorage.getItem('nikUser');

        console.log('This is a nik 2', nik);

        let data = {
            nik: nik,
        }

        console.log(URLAPI + routeAPI , data);

        const response = await axios.post(URLAPI + routeAPI, data);

        let userData = response.data.data;

        if(userData) {
            console.log('Successfully Get User Profile');

            setName(userData.full_name);
        } else {
            console.log('Something went wrong getting user');

        }
    }

    const signOut = async () => {
        localStorage.removeItem('token');

        await router.replace('/splash').then(() => {
            console.log('Back to Login');
        });
    }

    return (
        <AppBar position={'static'}>
            <Toolbar sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}>
                {!hideHeaderTitle ? (
                <Box display="flex" flexDirection="row" width="100%" alignItems="center">
                    <CustomImage size={"XS"} path={PolytronLogo}></CustomImage>
                    <CustomTypography size={'M'} bold>
                        ESD Team Monitoring
                    </CustomTypography>
                </Box>
                ) : <></>}
                <CustomSpacer width={Constants(4)}></CustomSpacer>
                <CustomSpacer width={Constants(2)}></CustomSpacer>
                <IconButton
                    color="inherit"
                    onClick={handleProfileClick}
                >
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <AccountCircleIcon />
                        <CustomTypography>
                            {name ?? '-'}
                        </CustomTypography>
                    </Box>
                </IconButton>
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
                    <Box p={2} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Typography variant="body1"></Typography>
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                router.push('/profile');
                            }}
                        >
                            <Box display="flex" flexDirection="row">
                                <AccountCircleIcon />
                                <CustomSpacer width={Constants(1)}></CustomSpacer>
                                <CustomTypography>Profile</CustomTypography>
                            </Box>
                        </IconButton>
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
