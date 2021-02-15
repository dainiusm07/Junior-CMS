import dotenv from "dotenv";
dotenv.config();

export const API_DOMAIN: string = process.env.API_DOMAIN || "localhost";
export const API_PORT = +(<string>process.env.API_PORT) || 4000;
export const API_END_POINT: string = process.env.API_END_POINT || "graphql";
