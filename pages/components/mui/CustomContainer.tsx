import * as React from 'react';
import { Box } from '@mui/material';
import { useEffect, useState, ReactNode } from 'react';

// Define the prop types for CustomContainer
interface CustomContainerProps {
    darkMode: boolean;
    children: ReactNode;
}

export function CustomContainer({ darkMode, children }: CustomContainerProps) {
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

// Define the prop types for CustomContainerCenter
interface CustomContainerCenterProps {
    children: ReactNode;
}

export function CustomContainerCenter({ children }: CustomContainerCenterProps) {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        // You can add any side effects here if necessary to manage dark mode state
    }, [darkMode]);

    return (
        <CustomContainer darkMode={darkMode}>
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
        </CustomContainer>
    );
}

export default CustomContainer;
