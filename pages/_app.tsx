import "@/styles/globals.css";
import type { AppProps } from "next/app";

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

import * as React from "react";

import MainLayout from "@/pages/components/mui/DashboardComponent/MainLayout";
import AnimatedLayout from "@/pages/components/mui/DashboardComponent/AnimatedLayout";

// import {NextIntlClientProvider} from 'next-intl';
import {useRouter} from "next/router";

export function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    // const defaultTimeZone = "Europe/Vienna";

    return (
        // <NextIntlClientProvider locale={router.locale || 'en'} messages={pageProps.messages} timeZone={defaultTimeZone}>
            <MainLayout>
                <AnimatedLayout>
                    <Component {...pageProps} />
                </AnimatedLayout>
            </MainLayout>
        // </NextIntlClientProvider>

    );
}

export default App;
