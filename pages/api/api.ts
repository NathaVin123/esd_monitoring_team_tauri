import axios from 'axios';
import type { NextRequest, NextResponse } from "next/server";
import {PORT, URL_DEV_LOCAL} from "@/pages/api/env";

export const fetchLoginData = async (nik: string, password: string) => {
    const routeAPI = '/api/auth/loginUser';

    // console.log(res.body);

    // const { nik, password } = req.body;

    try {
        const response = await axios.post(`https://${URL_DEV_LOCAL}:${PORT}${routeAPI}`, {'nik' : nik, 'password' : password});
        const data = response.data;
        console.log('Data : ' + data);
        // res.status(200).json(data);
    } catch (error) {
        // res.json();
        console.log(error);
    }
};

export default fetchLoginData;
