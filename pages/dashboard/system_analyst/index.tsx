import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import * as React from "react";
import CustomSideBar from "@/pages/components/mui/CustomSideBar";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import {useState} from "react";
import {useRouter} from "next/router";
import DevDashboard from "@/pages/dashboard/developer/dashboard";
import DevProjectPage from "@/pages/dashboard/developer/project";
import AboutPage from "@/pages/about";
import SADashboard from "@/pages/dashboard/system_analyst/dashboard";
import SAMonitoringPage from "@/pages/dashboard/system_analyst/monitoring";
import SettingPage from "@/pages/setting";
import SAProjectPage from "@/pages/dashboard/system_analyst/project";
import SAActivityPage from "@/pages/dashboard/system_analyst/activity";

const sidebarItems = [
    // { name: 'Dashboard', route: '/dashboard' },
    { name: 'Project', route: '/project' },
    { name: 'Activity', route: '/activity' },
    { name: 'Monitoring', route: '/monitoring' },
    { name: 'About', route: '/about' },
];

export const SystemAnalystDashboard = () => {
    const [currentRoute, setCurrentRoute] = useState(sidebarItems[0].route); // Default to the first route

    const handleNavigation = (route : any) => {
        setCurrentRoute(route);
    };

    const router = useRouter();

    const renderContent = () => {
        switch (currentRoute) {
            case '/dashboard':
                return <SADashboard />;
            case '/project':
                return <SAProjectPage />;
            case '/monitoring':
                return <SAMonitoringPage />;
            case '/activity':
                return <SAActivityPage></SAActivityPage>;
            case '/about':
                return <AboutPage />;
            default:
                return <div>404 - Page Not Found</div>;
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100vw",
        }}>
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

export default SystemAnalystDashboard;
