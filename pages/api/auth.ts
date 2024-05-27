import type { NextApiRequest, NextApiResponse } from "next";

import axios from 'axios';

import {PORT ,URL_DEV_LOCAL, URL_DEV_SERVER, URL_PROD_SERVER} from '../../env';

type LoginRequest = {
    nik: string;
    password: string;
};

export async function handler(req : NextApiRequest, res : NextApiResponse) {
    try {
        const routeAPI = '/api/auth/loginUser';

        try {
            const response = await axios.get(`https://${URL_DEV_LOCAL}:${PORT}${routeAPI}`);
            const data = response.data;
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({error: 'Failed to fetch data from the API'});
        }
    }
}

export default handler;
