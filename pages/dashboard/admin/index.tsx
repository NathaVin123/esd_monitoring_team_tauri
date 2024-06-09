import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import {useEffect, useState} from "react";
import {CustomTypography} from "@/pages/components/mui/CustomTypography";
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import {routes} from './routes';

export function adminDashboard() {

    const [mobileOpen, setMobileOpen] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    return (
        <CustomContainerCenter>
            <MyAppBar routes={routes}></MyAppBar>
            Welcome to Admin
        </CustomContainerCenter>
    );
}

export default adminDashboard;
