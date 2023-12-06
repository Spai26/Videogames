import dotenv from "dotenv";
import { ConfigType } from "./server";

dotenv.config();

export const CONFIG_PROJECT: ConfigType = {
  PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  PROJECT_NAME: process.env.APP_NAME || "",
  ENVIRONMENT: process.env.APP_ENVIRONMENT || "",
  HOST_SERVER: process.env.APP_HOST || ""
};
