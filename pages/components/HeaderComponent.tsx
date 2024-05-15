import {Inter} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// @ts-ignore
export const HeaderComponent = ({children}) => {
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            {children}
        </main>
    );
}
