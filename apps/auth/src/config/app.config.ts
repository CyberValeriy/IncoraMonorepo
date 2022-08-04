require('dotenv').config();

const env = process.env;

export const JWT = {
  ACCESS_SECRET: env.JWT_ACCESS_SECRET,
  REFRESH_SECRET: env.REFRESH_SECRET,
  TTL_ACCESS: env.JWT_TTL_ACCESS,
  TTL_REFRESH: env.JWT_TTL_REFRESH,
};

export const DB_CONFIG = {
  PORT: env.DB_PORT,
  TYPE: env.DB_TYPE,
  HOST: env.DB_HOST,
  NAME: env.DB_NAME,
  USERNAME: env.DB_USERNAME,
  PASSWORD: env.DB_PASSWORD,
};

export const PORT = env.PORT;
