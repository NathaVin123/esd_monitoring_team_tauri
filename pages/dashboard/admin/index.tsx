import {CustomContainerCenter} from "@/pages/components/mui/CustomContainer";
import MyAppBar from "@/pages/components/mui/DashboardComponent/AppBar";
import {routes} from './routes';

export const adminDashboard = () => {
    return (
        <CustomContainerCenter>
            <MyAppBar routes={routes}></MyAppBar>
            Welcome to Admin
        </CustomContainerCenter>
    );
}

export default adminDashboard;
