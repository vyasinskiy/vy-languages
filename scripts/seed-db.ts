import { Client, escapeLiteral } from 'pg';
import translations from '../src/assets/translations.json';
import { getClient } from './init-connection';
import { Tables, createLanguagesTableQuery, createProgressTableQuery, createTranslationsTableQuery, createUsersTable, insertLanguagesTableQuery, insertUsersQuery } from './queries';
import { clearDb } from './clear-db';

seedDb();

async function seedDb() {
  const client = await getClient();
  try {
    console.log('start');
    await clearDb(client);
    await seedLanguagesTable(client);
    await seedTranslationsTable(client);
    await seedUsersTable(client);
    await seedProgressTable(client);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end()
  }
}

async function seedLanguagesTable(client: Client) {
  await client.query(createLanguagesTableQuery);
  await client.query(insertLanguagesTableQuery);
  console.log(`${Tables.Languages} has been seeded`);
}

async function seedTranslationsTable(client: Client){
  await client.query(createTranslationsTableQuery);

  const enValues = translations.map(t => `(
    ${escapeLiteral(t['Search text'])},
    ${escapeLiteral(t['Search example'])},
    'en',
    NULL,
    NULL,
    NULL
  )`).join(",");

  const ruValues = translations.map(t => `(
    ${escapeLiteral(t['Translation text'])},
    ${escapeLiteral(t['Translation example'])},
    'ru',
    ${escapeLiteral(t['Search text'])},
    NULL,
    NULL
  )`).join(",");

  const insertTranslationsTableQuery = `INSERT INTO translations(
    name,
    example,
    lang,
    en_name,
    ru_name,
    es_name
  ) VALUES ${enValues}, ${ruValues} ON CONFLICT DO NOTHING;`;

  await client.query(insertTranslationsTableQuery);
  console.log(`${Tables.Translations} has been seeded`);
}

async function seedUsersTable(client: Client){
  await client.query(createUsersTable);
  await client.query(insertUsersQuery);
  console.log(`${Tables.Users} has been seeded`);
}

async function seedProgressTable(client: Client){
  await client.query(createProgressTableQuery);
  console.log(`${Tables.Progress} has been seeded`);
}

