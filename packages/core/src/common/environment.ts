/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotenv from 'dotenv';
import { LanguageCode } from '../config/i18n/LanguageCode';
dotenv.config();

// Environment
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_PROD = process.env.NODE_END === 'production';

// Application
// export const PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || "#87e8de";
export const DEFAULT_LANGUAGE_CODE = LanguageCode.EN;
export const API_DOMAIN = process.env.API_DOMAIN || 'localhost';
export const API_PORT = +process.env.API_PORT! || 4000;
export const RATE_LIMIT_MAX = +process.env.RATE_LIMIT_MAX! || 10000;
export const GRAPHQL_DEPTH_LIMIT: number =
  +process.env.GRAPHQL_DEPTH_LIMIT! || 3;

// Session
export const SESSION_SECRET = process.env.SESSION_SECRET || 'mySuperSecret';
export const SESSION_TTL = 1000 * 60 * 60 * 24 * 30;

// Bcrypt
export const BCRYPT_SALT = +process.env.BCRYPT_SALT! || 10;

// Production database settings
export const DB_DATABASE = process.env.DB_DATABASE!;
export const DB_HOST = process.env.DB_HOST!;
export const DB_PORT = +process.env.DB_PORT!;
export const DB_USER = process.env.DB_USER!;
export const DB_PASS = process.env.DB_PASS!;
