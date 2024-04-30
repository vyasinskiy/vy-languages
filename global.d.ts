declare global {
  namespace NodeJS {
    interface ProcessEnv {
      USER: string;
      PGPASSWORD: string;
      PGHOST: string;
      PGDATABASE: string;
      PGPORT: string;
    }
  }
}

export {}
