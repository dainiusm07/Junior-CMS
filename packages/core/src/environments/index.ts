import * as dotenv from "dotenv";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
dotenv.config();

// Environment
export const NODE_ENV: string = process.env.NODE_ENV || "development";

// Application
export const PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || "#87e8de";
export const RATE_LIMIT_MAX: number =
  +(<string>process.env.RATE_LIMIT_MAX) || 10000;
export const GRAPHQL_DEPTH_LIMIT: number =
  +(<string>process.env.GRAPHQL_DEPTH_LIMIT) || 3;

// Session
export const SESSION_SECRET = process.env.SESSION_SECRET || "mySuperSecret";
export const SESSION_TTL = 1000 * 60 * 60 * 24 * 30;

// Bcrypt
export const BCRYPT_SALT: number = +(<string>process.env.BCRYPT_SALT) || 10;

// Database settings
export const DB_DATABASE: string = process.env.DB_DATABASE || "cms";
export const DB_HOST: string = process.env.DB_HOST || "localhost";
export const DB_PORT: number = +(<string>process.env.DB_PORT) || 5432;
export const DB_USER: string = process.env.DB_USER || "";
export const DB_PASS: string = process.env.DB_PASS || "";

// TypeORM
interface Environment {
  [key: string]: Partial<PostgresConnectionOptions>;
}
const environment: Environment = {
  development: {
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    logging: true,
    synchronize: true,
  },
  production: {
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
  },
};

export const TYPEORM = environment[NODE_ENV];
