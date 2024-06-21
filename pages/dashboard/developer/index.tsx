import * as React from 'react';
import {useRouter} from "next/router";
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import CustomSideBar from "@/pages/components/mui/CustomSideBar";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import DevProjectPage from "@/pages/dashboard/developer/project";
import {DevMonitoringPage} from "@/pages/dashboard/developer/monitoring";
import {SettingPage} from "@/pages/setting";
import AboutPage from "@/pages/about";
import {useState} from "react";
import DevDashboard from "@/pages/dashboard/developer/dashboard";

const sidebarItems = [
    // { name: 'Dashboard', route: '/dashboard' },
    { name: 'Project', route: '/project' },
    { name: 'Activity', route: '/activity' },
    { name: 'About', route: '/about' },
];

export const DeveloperDashboard = () => {

    const [currentRoute, setCurrentRoute] = useState(sidebarItems[0].route); // Default to the first route

    const handleNavigation = (route : any) => {
        setCurrentRoute(route);
    };

    const renderContent = () => {
        switch (currentRoute) {
            case '/dashboard':
                return <DevDashboard />;
            case '/project':
                return <DevProjectPage />;
            case '/activity':
                return <DevMonitoringPage />;
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
            <MyAppBar routes={[]}/>
            <div style={{display: "flex", flex: 1, overflow: "hidden"}}>
                <CustomSideBar items={sidebarItems} onNavigate={handleNavigation}/>
                <div
                    style={{
                        flex: 1,
                        overflow: "auto",
                        padding: "0px",
                    }}
                >
                    {renderContent()}
                    <CustomSpacer height={Constants(5)}/>
                </div>
            </div>
        </div>
    );
}

export default DeveloperDashboard;
