import { Client } from 'pg';
import dotenv from 'dotenv'; 
import { ensureNumber } from '../src/types';

dotenv.config();
const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT, ADMIN_LOGIN, ADMIN_PASSWORD } = process.env;

let isConnected = false;

const client = new Client({
    user: PGUSER,
    password: PGPASSWORD,
    host: PGHOST,
    database: PGDATABASE,
    port: ensureNumber(PGPORT) ? PGPORT : null,
});

export const getClient = async () => {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
    }
    return client;
}