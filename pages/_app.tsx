import "@/styles/globals.css";
import type { AppProps } from "next/app";

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { red, grey } from '@mui/material/colors';
import { useEffect, useState } from "react";
import CustomToolbar from "@/pages/components/mui/CustomToolbar";
import {useRouter} from "next/router";
import CustomSideBar from "@/pages/components/mui/CustomSideBar";
import * as React from "react"; // Ensure the correct path to CustomToolbar

export const lightTheme = createTheme({
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

export const darkTheme = createTheme({
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

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme === 'true') {
            setDarkMode(true);
        }
    }, [darkMode]);

    const handleThemeChange = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode.toString());
            return newMode;
        });
    };

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleDrawerOpen = () => {
        setSidebarOpen(true);
    };

    const handleDrawerClose = () => {
        setSidebarOpen(false);
    };

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            {router.pathname !== '/' && <CustomToolbar darkMode={darkMode} onThemeChange={handleThemeChange} />}
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
