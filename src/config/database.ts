import { Connection, createConnection } from "mysql2/promise";
import { DATABASE_CONFIG } from "./variablesDontenv";

export class Database {
  private static instance: Database;
  private connetion: Connection | null = null;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect(): Promise<Connection> {
    if (!this.connetion) {
      const env = process.env.APP_ENVIRONMENT;

      const connectionString =
        env !== "production" ? DATABASE_CONFIG.ENV : DATABASE_CONFIG.PROD;

      this.connetion = await createConnection(connectionString);
      console.log("connect database succefull!");
    }

    return this.connetion;
  }

  async close(): Promise<void> {
    if (this.connetion) {
      await this.connetion.end();
      console.log("disconnect database succefull!");
    }
  }
}
