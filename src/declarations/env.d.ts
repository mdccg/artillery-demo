declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DB_URL: string;
    DEFAULT_PER_PAGE: string;
    CACHE_LIFE_TIME: string;
  }
}
