import "@/styles/globals.css";
import type { AppProps } from "next/app";

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

import * as React from "react";

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import MainLayout from "@/pages/components/mui/DashboardComponent/MainLayout";
import AnimatedLayout from "@/pages/components/mui/DashboardComponent/AnimatedLayout";

// import {NextIntlClientProvider} from 'next-intl';
import {useRouter} from "next/router";
import {NextIntlClientProvider} from "next-intl";

export function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    // const defaultTimeZone = "Europe/Vienna";

    return (
        // <React.StrictMode>
        //     {/*<NextIntlClientProvider locale={router.locale || 'en'} messages={pageProps.messages} timeZone={defaultTimeZone}>*/}
        //     <BrowserRouter>
        //         <MainLayout>
        //             <AnimatedLayout>
        //                 <Component {...pageProps} />
        //             </AnimatedLayout>
        //         </MainLayout>
        //     </BrowserRouter>
        //
        //     {/*// </NextIntlClientProvider>*/}
        // </React.StrictMode>

        <MainLayout>
            <AnimatedLayout>
                <Component {...pageProps} />
            </AnimatedLayout>
        </MainLayout>
    );
}

export default App;
