import {LinearProgress, CircularProgress, Box} from "@mui/material";
import React from "react";

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

export const CustomProgressBarEntireScreen = ({ size = 80, thickness = 4 }) => {
    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="rgba(0, 0, 0, 0.5)"
            zIndex={1300}
        >
            <Box position="relative" display="inline-flex">
                <CircularProgress  color = 'primary'/>
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                </Box>
            </Box>
        </Box>
    );
}

export default CustomCircularProgressBar;
