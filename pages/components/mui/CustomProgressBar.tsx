import {LinearProgress, CircularProgress, Box} from "@mui/material";

export const CustomLinearProgessBar = () => {
    return (
        <Box sx={{ width: '10%' }}>
            <LinearProgress color="primary"></LinearProgress>
        </Box>
    );
}

interface CustomCircularProgressBarProps {
    color?: 'primary' | 'secondary' | 'inherit' | 'error' | 'info' | 'success' | 'warning';
}

export const CustomCircularProgressBar: React.FC<CustomCircularProgressBarProps> = ({color = 'primary',}) => {
    return (
        <CircularProgress color={color} />
    );
};

// export default CustomCircularProgressBar;
