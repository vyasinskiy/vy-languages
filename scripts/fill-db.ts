import { Client, escapeLiteral } from 'pg';
import dotenv from 'dotenv'; 
import { ensureNumber } from '../src/types';
import translations from '../src/assets/translations.json';

dotenv.config();
start();

async function start() {
  const { USER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT } = process.env;
  const client = new Client({
    user: USER,
    password: PGPASSWORD,
    host: PGHOST,
    database: PGDATABASE,
    port: ensureNumber(PGPORT) ? PGPORT : null,
  });

  try {
    await client.connect();

    const values = translations.map(t => `(${escapeLiteral(t['Search text'])}, ${escapeLiteral(t['Translation text'])})`).join(",");
    const query = `INSERT INTO languages.en(name, example) VALUES ${values} ON CONFLICT DO NOTHING;`;
    
    await client.query(query);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end()
  }
}
