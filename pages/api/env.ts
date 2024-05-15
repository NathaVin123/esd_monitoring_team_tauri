import dotenv from 'dotenv';

dotenv.config({path:'.env'})

export const PORT = process.env.PORT

export const URL_DEV_LOCAL = process.env.URL_DEV_LOCAL
export const URL_DEV_SERVER = process.env.URL_DEV_SERVER
export const URL_PROD_SERVER = process.env.URL_PROD_SERVER
