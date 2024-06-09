// components/MainLayout.tsx
import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { grey, red } from "@mui/material/colors";
import { useRouter } from "next/router";
import MyAppBar from './AppBar';

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: red[500],
            },
            secondary: {
                main: red[700],
            },
            background: {
                default: grey[100],
                paper: grey[200],
            },
        },
        typography: {
            fontFamily: 'Poppins, Arial, sans-serif',
            fontSize: 14,
            h1: {
                fontSize: '2rem',
            },
            h2: {
                fontSize: '1.5rem',
            },
            h3: {
                fontSize: '1.25rem',
            },
            body1: {
                fontSize: '1rem',
            },
            body2: {
                fontSize: '0.875rem',
            },
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: red[500],
            },
            secondary: {
                main: red[700],
            },
            background: {
                default: grey[900],
                paper: grey[800],
            },
        },
        typography: {
            fontFamily: 'Poppins, Arial, sans-serif',
            fontSize: 14,
            h1: {
                fontSize: '2rem',
            },
            h2: {
                fontSize: '1.5rem',
            },
            h3: {
                fontSize: '1.25rem',
            },
            body1: {
                fontSize: '1rem',
            },
            body2: {
                fontSize: '0.875rem',
            },
        },
    });

    const router = useRouter();

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box component="main">
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default MainLayout;
