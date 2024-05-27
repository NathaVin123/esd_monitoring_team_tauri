import * as React from 'react';
import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Grid, Switch, CssBaseline, Divider } from '@mui/material';
import { CustomButton } from "@/pages/components/mui/CustomButton";
import CustomTextField from "@/pages/components/mui/CustomTextField";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Contants from "@/pages/components/mui/value/contants";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomImage from "@/pages/components/mui/CustomImage";

import PolytronIcon from "../../public/assets/polytron-icon.png";
import CustomSideBar from "@/pages/components/mui/CustomSideBar";
import CustomPieChart from "@/pages/components/mui/CustomPieChart";
import {
    CustomCircularProgressBar,
    CustomLinearProgessBar
} from "@/pages/components/mui/CustomProgressBar";

const drawerWidth = 240;

export function Test() {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true); // Set initial state to true to open the sidebar by default

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const handleDrawerOpen = () => {
        setSidebarOpen(true);
    };

    const handleDrawerClose = () => {
        setSidebarOpen(false);
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string | undefined; value: unknown; }>) => {
        console.log('Selected value:', event.target.value);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
                    ml: sidebarOpen ? `${drawerWidth}px` : 0,
                    transition: theme => theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(sidebarOpen && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Header
                    </Typography>
                    <IconButton color="inherit" onClick={handleThemeChange} sx={{ ml: 'auto' }}>
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <Switch checked={darkMode} onChange={handleThemeChange} color="default" />
                </Toolbar>
            </AppBar>
            <CustomSideBar open={sidebarOpen} handleDrawerClose={handleDrawerClose} darkMode={darkMode} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: darkMode ? 'grey.900' : 'background.paper',
                    color: darkMode ? 'grey.300' : 'text.primary',
                    p: 3,
                    transition: theme => theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    ml: sidebarOpen ? `${drawerWidth}px` : 0,
                }}
            >
                <Toolbar />
                <Grid container spacing={2} sx={{ maxWidth: 'xs', width: '100%', overflow: 'auto', flexGrow: 1 }}>
                    <Grid item xs={12}>
                        <CustomTypography size={'S'}>Test S</CustomTypography>
                        <CustomTypography size={'M'}>Test M</CustomTypography>
                        <CustomTypography size={'L'}>Test L</CustomTypography>
                        <CustomTypography size={'XL'}>Test XL</CustomTypography>
                        <CustomTypography>Test Normal</CustomTypography>
                        <CustomTypography customSize="25">Test Ukuran Custom 25</CustomTypography>
                    </Grid>
                    <CustomSpacer height={Contants(1)}></CustomSpacer>
                    <Grid item xs={12}>
                        <form>
                            <CustomTextField label="Email" fullWidth required />
                            <CustomSpacer height={Contants(1)} />
                            <CustomTextField type="password" label="Password" fullWidth required />
                            <CustomSpacer height={Contants(1)} />
                            <CustomTextField
                                type="datetime-local"
                                label="Appointment Date and Time"
                                required
                                placeholder="Select date and time"
                            />
                            <CustomTextField
                                type="date"
                                label="Select Date"
                                required
                                placeholder="Select date"
                            />
                            <CustomTextField
                                type="time"
                                label="Select Time"
                                required
                                placeholder="Select time"
                            />
                            <CustomTextField
                                type="select"
                                label="Select Option"
                                required
                                options={[
                                    { value: 'option1', label: 'Option 1' },
                                    { value: 'option2', label: 'Option 2' },
                                    { value: 'option3', label: 'Option 3' }
                                ]}
                            />
                            <CustomSpacer height={Contants(1)} />
                            <CustomButton type="submit" variant="contained" fullWidth>
                                Tes Button
                            </CustomButton>

                            <CustomSpacer height={Contants(1)} />

                            <CustomButton disabled type="submit" variant="contained" fullWidth>
                                Tes Button
                            </CustomButton>

                            <CustomSpacer height={Contants(2)} />
                            <CustomButton variant="contained" color="primary" fullWidth leftIcon={<AddIcon />} rightIcon={<ArrowForwardIcon />}>
                                Add Item
                            </CustomButton>

                            <CustomSpacer height={Contants(3)} />

                            <CustomImage path={PolytronIcon} alt="Polytron Icon" size="XL" />

                            {/*<CustomPieChart data={data} dataKey="value" nameKey="name" showLegend={true} />*/}

                            <CustomPieChart data={data} dataKey="value" nameKey="name" showLegend={false} />

                            <CustomLinearProgessBar></CustomLinearProgessBar>

                            <CustomSpacer height={Contants(3)} />

                            <CustomCircularProgressBar></CustomCircularProgressBar>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Test;
