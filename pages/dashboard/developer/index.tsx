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
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Project', route: '/project' },
    { name: 'Monitoring', route: '/monitoring' },
    { name: 'Settings', route: '/settings' },
    { name: 'About', route: '/about' },
];

export const DeveloperDashboard = () => {

    const [currentRoute, setCurrentRoute] = useState(sidebarItems[0].route); // Default to the first route

    const handleNavigation = (route : any) => {
        setCurrentRoute(route);
    };

    const router = useRouter();

    const renderContent = () => {
        switch (currentRoute) {
            case '/dashboard':
                return <DevDashboard />;
            case '/project':
                return <DevProjectPage />;
            case '/monitoring':
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
        // <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        //   <div style={{ height: "100%", overflow: "auto", padding: "20px" }}>
        //     <CustomTypography size={"M"}>Welcome Dev !</CustomTypography>
        //   </div>
        // </div>
        // <Router>
        //     <div style={{ display: 'flex' }}>
        //         <CustomSideBar items={sidebarItems} />
        //         <div style={{ flex: 1, padding: '20px' }}>
        //             <Routes>
        //                 <Route path="/dashboard" element={<Dashboard />} />
        //                 <Route path="/profile" element={<Profile />} />
        //                 <Route path="/settings" element={<Settings />} />
        //                 <Route path="/" element={<CustomContainerCenter>Welcome to Developer Dashboard</CustomContainerCenter>} />
        //             </Routes>
        //         </div>
        //     </div>
        // </Router>
    );
}

export default DeveloperDashboard;
