import * as dotenv from 'dotenv';

// Enable the dotenv config 
dotenv.config();

const { DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DIALECT } = process.env;

export const appConfig: any = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DATABASE,
        host: DB_HOST,
        port: parseInt(DB_PORT, 10),
        dialect: DIALECT,
    }
}
