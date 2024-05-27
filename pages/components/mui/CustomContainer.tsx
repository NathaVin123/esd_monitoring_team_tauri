import * as React from 'react';
import { Box } from '@mui/material';
import {useEffect, useState} from "react";

export function CustomContainer({ darkMode, children }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100vw',
                height: '100vh',
                bgcolor: darkMode ? 'grey.900' : 'background.paper',
                color: darkMode ? 'grey.300' : 'text.primary',
                overflow: 'auto',
            }}
        >
            {children}
        </Box>
    );
}


export function CustomContainerCenter({ children }) {
    // const isDarkMode = localStorage.getItem('darkMode');

    const [darkMode, setDarkMode] = useState<boolean>(false);

    // useEffect(() => {
    // }, []);
    //
    //
    // console.log(isDarkMode);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                bgcolor: darkMode ? 'grey.900' : 'background.paper',
                color: darkMode ? 'grey.300' : 'text.primary',
                overflow: 'auto',
            }}
        >
            {children}
        </Box>
    );
}

export default CustomContainer;
