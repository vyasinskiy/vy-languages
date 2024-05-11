import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();
const { ADMIN_LOGIN, ADMIN_PASSWORD } = process.env;

export enum Tables {
    Translations = 'translations',
    Languages = 'languages',
    Users = 'users',
    Progress = 'progress',
}

export const createLanguagesTableQuery =
  `CREATE TABLE ${Tables.Languages} (
    short_name VARCHAR(2) PRIMARY KEY,
    name VARCHAR(20) UNIQUE
)`;

export const insertLanguagesTableQuery = `INSERT INTO ${Tables.Languages} (short_name, name) VALUES ('en', 'english'), ('es', 'spanish'), ('ru', 'russian');`;

export const createTranslationsTableQuery =
  `CREATE TABLE ${Tables.Translations} (
    name VARCHAR(50) PRIMARY KEY,
    example VARCHAR(300),
    lang VARCHAR(2),
    en_name VARCHAR(50),
    ru_name VARCHAR(50),
    es_name VARCHAR(50),
	  FOREIGN KEY (lang) REFERENCES languages(short_name),
    FOREIGN KEY (en_name) REFERENCES translations(name),
    FOREIGN KEY (ru_name) REFERENCES translations(name),
    FOREIGN KEY (es_name) REFERENCES translations(name)
)`;

export const createUsersTable = `
  CREATE TABLE ${Tables.Users} (
    user_id SERIAL PRIMARY KEY,
    login VARCHAR(30) UNIQUE,
  	password VARCHAR(60),
    name VARCHAR(30)
)`;

const saltRounds = 10;
const passwordHash = bcrypt.hashSync(ADMIN_PASSWORD, saltRounds);
export const insertUsersQuery = `INSERT INTO ${Tables.Users}(login, password, name) VALUES ('${ADMIN_LOGIN}', '${passwordHash}', 'Vitaly') ON CONFLICT DO NOTHING;`;

export const createProgressTableQuery = `
  CREATE TABLE ${Tables.Progress} (
    user_id INTEGER,
    translation_name VARCHAR(50),
    is_answered BOOLEAN,
    is_favorite BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (translation_name) REFERENCES translations(name)
)`;