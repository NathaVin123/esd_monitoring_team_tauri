import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import {useEffect} from "react";
import {ro} from "date-fns/locale";

export function adminDashboard() {

    const routes = [
        { text: 'User Master', path: '/dashboard/admin/user_master' },
        { text: 'Team Master', path: '/dashboard/admin/team_master'},
        { text: 'Role Master', path: '/dashboard/admin/role_master'},
    ];

    useEffect(() => {
        localStorage.setItem('customTitle', 'Admin Center')
        localStorage.setItem('routeSidebar', JSON.stringify(routes))
    },[routes]);

    return (
        <CustomContainerCenter>Welcome to Admin</CustomContainerCenter>
    );
}

export default adminDashboard;
