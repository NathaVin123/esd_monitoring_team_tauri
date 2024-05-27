import Image from "next/image";
import { Inter } from "next/font/google";
import {useEffect} from 'react';
import { useRouter } from 'next/router'
import Splash from "@/pages/splash";
import Test from "@/pages/test";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Splash></Splash>
    //   <Test></Test>
  );
}
