import { ConfigType } from "./server";
import dotenv from "dotenv";

dotenv.config();

export const CONFIG_PROJECT: ConfigType = {
  PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  PROJECT_NAME: process.env.APP_NAME || "",
  ENVIRONMENT: process.env.APP_ENVIRONMENT || "",
  HOST_SERVER: process.env.APP_HOST || ""
};


export const DATABASE_CONFIG = {
  PROD: process.env.DATABASE_URL || "",
  ENV: process.env.DATABASE_DEV || ""
};