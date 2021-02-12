import * as dotenv from "dotenv";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
dotenv.config();

// Environment
export const NODE_ENV: string = process.env.NODE_ENV || "development";

// Application
export const PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || "#87e8de";
export const DOMAIN: string = process.env.DOMAIN || "localhost";
export const PORT: number = +process.env.PORT || 4000;
export const END_POINT: string = process.env.END_POINT || "graphql";
export const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX || 10000;
export const GRAPHQL_DEPTH_LIMIT: number =
  +process.env.GRAPHQL_DEPTH_LIMIT || 3;

// Bcrypt
export const BCRYPT_SALT: number = +process.env.BCRYPT_SALT || 10;

// Database settings
export const DB_DATABASE: string = process.env.DB_DATABASE || "cms";
export const DB_HOST: string = process.env.DB_HOST || "localhost";
export const DB_PORT: number = +process.env.DB_PORT || 5432;
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
