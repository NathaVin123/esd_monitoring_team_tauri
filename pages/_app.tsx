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
import * as React from "react";
import MainLayout from "@/pages/components/mui/DashboardComponent/MainLayout";
import AnimatedLayout from "@/pages/components/mui/DashboardComponent/AnimatedLayout"; // Ensure the correct path to CustomToolbar

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MainLayout>
            <AnimatedLayout>
                <Component {...pageProps} />
            </AnimatedLayout>
        </MainLayout>
    );
}
