import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import * as React from "react";
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import {routes} from '@/routes/routes';
import CustomSideBar from "@/pages/components/mui/CustomSideBar";
import {useState} from "react";
import {useRouter} from "next/router";
import DevDashboard from "@/pages/dashboard/developer/dashboard";
import DevProjectPage from "@/pages/dashboard/developer/project";
import AboutPage from "@/pages/about";
import AdminDashboard from "@/pages/dashboard/admin/dashboard";
import CustomSpacer from "@/pages/components/mui/CustomSpacer";
import Constants from "@/pages/components/mui/value/contants";
import UserMaster from "@/pages/dashboard/admin/userMaster";
import TeamMaster from "@/pages/dashboard/admin/teamMaster";
import RoleMaster from "@/pages/dashboard/admin/roleMaster";
import StatusMaster from "@/pages/dashboard/admin/statusMaster";
import ProjectMaster from "@/pages/dashboard/admin/projectMaster";
import TaskMaster from "@/pages/dashboard/admin/taskMaster";
import CaseMaster from "@/pages/dashboard/admin/caseMaster";
import AdminActiveUserMonitoring from "@/pages/dashboard/admin/activeUserMonitoring";

const sidebarItems = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'User Master', route: '/user_master' },
    { name: 'Team Master', route: '/team_master' },
    { name: 'Role Master', route: '/role_master' },
    { name: 'Status Master', route: '/status_master' },
    { name: 'Project Master', route: '/project_master' },
    { name: 'Task Master', route: '/task_master' },
    { name: 'Case Master', route: '/case_master' },
    { name: 'Active User Monitoring', route: '/active_user_monitoring' },
];

export const AdminDashboardRoot = () => {
    const [currentRoute, setCurrentRoute] = useState(sidebarItems[0].route); // Default to the first route

    const handleNavigation = (route : any) => {
        setCurrentRoute(route);
    };

    const router = useRouter();

    const renderContent = () => {
        switch (currentRoute) {
            case '/dashboard':
                return <AdminDashboard></AdminDashboard>;
            case '/user_master':
                return <UserMaster />;
            case '/team_master':
                return <TeamMaster />;
            case '/role_master':
                return <RoleMaster />;
            case '/status_master':
                return <StatusMaster />;
            case '/project_master':
                return <ProjectMaster />;
            case '/task_master':
                return <TaskMaster />;
            case '/case_master':
                return <CaseMaster />;
            case '/active_user_monitoring':
                return <AdminActiveUserMonitoring />;
            default:
                return <div style={{padding: "20px"}}>404 - Page Not Found</div>;
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100vw",
        }}>
            <MyAppBar routes={[]}></MyAppBar>
            <div style={{display: "flex", flex: 1, overflow: "hidden"}}>
                <CustomSideBar items={sidebarItems} onNavigate={handleNavigation}></CustomSideBar>
                <div style={{
                    flex: 1,
                    overflow: "auto",
                    padding: "0px",
                }}>
                    {renderContent()}
                    <CustomSpacer height={Constants(5)}/>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardRoot;
