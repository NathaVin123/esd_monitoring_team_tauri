import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomSideBar from "@/pages/components/mui/CustomSideBar";
import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import CustomTypography from "@/pages/components/mui/CustomTypography";

// const Dashboard: React.FC = () => <div>Dashboard Content</div>;
// const Profile: React.FC = () => <div>Profile Content</div>;
// const Settings: React.FC = () => <div>Settings Content</div>;

export const DeveloperDashboard = () => {
    // const sidebarItems = [
    //     { name: 'Dashboard', route: '/dashboard' },
    //     { name: 'Profile', route: '/profile' },
    //     { name: 'Settings', route: '/settings' },
    //     { name: 'About', route: '/settings' },
    // ];

    return (
      <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        <div style={{ height: "100%", overflow: "auto", padding: "20px" }}>
          <CustomTypography size={"M"}>Welcome Dev !</CustomTypography>
        </div>
      </div>
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
