import * as React from 'react';
import {useRouter} from "next/router";
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import CustomSideBar from "@/pages/components/mui/CustomSideBar";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import CustomTypography from "@/pages/components/mui/CustomTypography";
import DeveloperDashaboard, {DeveloperDashboard} from "@/pages/dashboard/developer";
import DevProjectPage from "@/pages/dashboard/developer/project";
import {DevMonitoringPage} from "@/pages/dashboard/developer/monitoring";
import {SettingPage} from "@/pages/setting";
import AboutPage from "@/pages/about";
import {useState} from "react";
import {DevProjectTaskPage} from "@/pages/dashboard/developer/project/task";

const drawerWidth = 240;

const sidebarItems = [
    { name: 'Dashboard', route: '/dashboard/developer' },
    { name: 'Project', route: '/dashboard/developer/project' },
    { name: 'Monitoring', route: '/dashboard/developer/monitoring' },
    { name: 'Settings', route: '/settings' },
    { name: 'About', route: '/about' },
];

export function Test() {
    const [currentRoute, setCurrentRoute] = useState(sidebarItems[0].route); // Default to the first route

    const handleNavigation = (route : any) => {
        setCurrentRoute(route);
    };

    const router = useRouter();

    const renderContent = () => {
        switch (currentRoute) {
            case '/dashboard/developer':
                return <DeveloperDashboard />;
            case '/dashboard/developer/project':
                return <DevProjectPage />;
            case '/dashboard/developer/monitoring':
                return <DevMonitoringPage />;
            case '/settings':
                return <SettingPage />;
            case '/about':
                return <AboutPage />;
            default:
                return <div>404 - Page Not Found</div>;
        }
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
        }}
      >
        <MyAppBar routes={[]} />
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <CustomSideBar items={sidebarItems} onNavigate={handleNavigation} />
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: "0px",
            }}
          >
            {renderContent()}
            <CustomSpacer height={Constants(5)} />
          </div>
        </div>
      </div>
    );

    // const [darkMode, setDarkMode] = useState(false);
    // const [sidebarOpen, setSidebarOpen] = useState(true); // Set initial state to true to open the sidebar by default
    //
    // const data = [
    //     { name: 'Group A', value: 400 },
    //     { name: 'Group B', value: 300 },
    //     { name: 'Group C', value: 300 },
    //     { name: 'Group D', value: 200 },
    // ];
    //
    // const handleThemeChange = () => {
    //     setDarkMode(!darkMode);
    // };
    //
    // const handleDrawerOpen = () => {
    //     setSidebarOpen(true);
    // };
    //
    // const handleDrawerClose = () => {
    //     setSidebarOpen(false);
    // };
    //
    //
    // const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string | undefined; value: unknown; }>) => {
    //     console.log('Selected value:', event.target.value);
    // };
    //
    // return (
    //     <Box sx={{ display: 'flex' }}>
    //         <CssBaseline />
    //         <AppBar
    //             position="fixed"
    //             sx={{
    //                 width: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
    //                 ml: sidebarOpen ? `${drawerWidth}px` : 0,
    //                 transition: theme => theme.transitions.create(['width', 'margin'], {
    //                     easing: theme.transitions.easing.sharp,
    //                     duration: theme.transitions.duration.leavingScreen,
    //                 }),
    //             }}
    //         >
    //             <Toolbar>
    //                 <IconButton
    //                     color="inherit"
    //                     aria-label="open drawer"
    //                     onClick={handleDrawerOpen}
    //                     edge="start"
    //                     sx={{ mr: 2, ...(sidebarOpen && { display: 'none' }) }}
    //                 >
    //                     <MenuIcon />
    //                 </IconButton>
    //                 <Typography variant="h6" noWrap component="div">
    //                     Header
    //                 </Typography>
    //                 <IconButton color="inherit" onClick={handleThemeChange} sx={{ ml: 'auto' }}>
    //                     {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    //                 </IconButton>
    //                 <Switch checked={darkMode} onChange={handleThemeChange} color="default" />
    //             </Toolbar>
    //         </AppBar>
    //         {/*<CustomSideBar open={sidebarOpen} handleDrawerClose={handleDrawerClose} darkMode={darkMode} />*/}
    //         <Box
    //             component="main"
    //             sx={{
    //                 flexGrow: 1,
    //                 bgcolor: darkMode ? 'grey.900' : 'background.paper',
    //                 color: darkMode ? 'grey.300' : 'text.primary',
    //                 p: 3,
    //                 transition: theme => theme.transitions.create(['margin', 'width'], {
    //                     easing: theme.transitions.easing.sharp,
    //                     duration: theme.transitions.duration.leavingScreen,
    //                 }),
    //                 ml: sidebarOpen ? `${drawerWidth}px` : 0,
    //             }}
    //         >
    //             <Toolbar />
    //             <Grid container spacing={2} sx={{ maxWidth: 'xs', width: '100%', overflow: 'auto', flexGrow: 1 }}>
    //                 <Grid item xs={12}>
    //                     <CustomTypography size={'S'}>Test S</CustomTypography>
    //                     <CustomTypography size={'M'}>Test M</CustomTypography>
    //                     <CustomTypography size={'L'}>Test L</CustomTypography>
    //                     <CustomTypography size={'XL'}>Test XL</CustomTypography>
    //                     <CustomTypography>Test Normal</CustomTypography>
    //                     <CustomTypography customSize="25">Test Ukuran Custom 25</CustomTypography>
    //                 </Grid>
    //                 <CustomSpacer height={Contants(1)}></CustomSpacer>
    //                 <Grid item xs={12}>
    //                     <form>
    //                         <CustomTextField label="Email" fullWidth required />
    //                         <CustomSpacer height={Contants(1)} />
    //                         <CustomTextField type="password" label="Password" fullWidth required />
    //                         <CustomSpacer height={Contants(1)} />
    //                         <CustomTextField
    //                             type="datetime-local"
    //                             label="Appointment Date and Time"
    //                             required
    //                             placeholder="Select date and time"
    //                         />
    //                         <CustomTextField
    //                             type="date"
    //                             label="Select Date"
    //                             required
    //                             placeholder="Select date"
    //                         />
    //                         <CustomTextField
    //                             type="time"
    //                             label="Select Time"
    //                             required
    //                             placeholder="Select time"
    //                         />
    //                         {/*<CustomTextField*/}
    //                         {/*    type="select"*/}
    //                         {/*    label="Select Option"*/}
    //                         {/*    required*/}
    //                         {/*    options={[*/}
    //                         {/*        { value: 'option1', label: 'Option 1' },*/}
    //                         {/*        { value: 'option2', label: 'Option 2' },*/}
    //                         {/*        { value: 'option3', label: 'Option 3' }*/}
    //                         {/*    ]}*/}
    //                         {/*/>*/}
    //                         <CustomSpacer height={Contants(1)} />
    //                         <CustomButton type="submit" variant="contained" fullWidth>
    //                             Tes Button
    //                         </CustomButton>
    //
    //                         <CustomSpacer height={Contants(1)} />
    //
    //                         <CustomButton disabled type="submit" variant="contained" fullWidth>
    //                             Tes Button
    //                         </CustomButton>
    //
    //                         <CustomSpacer height={Contants(2)} />
    //                         <CustomButton variant="contained" color="primary" fullWidth leftIcon={<AddIcon />} rightIcon={<ArrowForwardIcon />}>
    //                             Add Item
    //                         </CustomButton>
    //
    //                         <CustomSpacer height={Contants(3)} />
    //
    //                         <CustomImage path={PolytronIcon} alt="Polytron Icon" size="XL" />
    //
    //                         <CustomPieChart data={data} dataKey="value" nameKey="name" showLegend={true} />
    //
    //                         <CustomPieChart data={data} dataKey="value" nameKey="name" showLegend={false} />
    //
    //                         <CustomLinearProgessBar></CustomLinearProgessBar>
    //
    //                         <CustomSpacer height={Contants(3)} />
    //
    //                         <CustomCircularProgressBar></CustomCircularProgressBar>
    //                     </form>
    //                 </Grid>
    //             </Grid>
    //         </Box>
    //     </Box>
    // );


    // const changeLanguage = (locale: string) => {
    //     router.push(router.pathname, router.asPath, { locale });
    // };

    // return (
      // // <CustomContainerCenter>
      //   {/*<button onClick={() => changeLanguage("en")}>English</button>*/}
      //   {/*<button onClick={() => changeLanguage("idn")}>Bahasa Indonesia</button>*/}
      //
      //   {/*<h1>{t('welcomeMessage')}</h1>*/}
      //   {/*<p>{t('about')}</p>*/}
      //   {/*<p>{t('contact')}</p>*/}
      // // </CustomContainerCenter>
    // );


    // return (
    //     <CustomContainer>
    //         <CustomLanguageSwitcher></CustomLanguageSwitcher>

    //     </CustomContainer>
    // );
}


export default Test;
