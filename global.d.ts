declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PGUSER: string;
      PGPASSWORD: string;
      PGHOST: string;
      PGDATABASE: string;
      PGPORT: string;
    }
  }
}

export {}
