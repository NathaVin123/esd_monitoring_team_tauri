import "@/styles/globals.css";
import type { AppProps } from "next/app";

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

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
