import { Client } from 'pg';
import { Tables } from './queries';

export async function clearDb(client: Client){
    try {
        const query = `DROP TABLE IF EXISTS ${Tables.Translations}, ${Tables.Languages}, ${Tables.Users}, ${Tables.Progress}`;
        await client.query(query);
        console.log('Database is clear');
    } catch (err) {
        console.error(err);
    }
}