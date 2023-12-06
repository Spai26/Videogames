import { Connection, createConnection } from "mysql2";
import { DATABASE_CONFIG } from "./variablesDontenv";

export class Database {
  private static instance: Database;
  private connetion: Connection | undefined;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  connect(): Connection {
    if (!this.connetion) {
      const env = process.env.APP_ENVIRONMENT;

      const connectionString =
        env !== "production" ? DATABASE_CONFIG.ENV : DATABASE_CONFIG.PROD;

      this.connetion = createConnection(connectionString);
    }

    this.connetion.connect((err) => {
      if (err) {
        console.error(`Error connect to database,${err}`);
        return;
      }
      console.log("connect database succefull!");
    });

    return this.connetion;
  }

  close(): void {
    if (this.connetion) {
      this.connetion.end((err) => {
        console.error(`Error disconnect to database,${err}`);
        return;
      });
    }
    console.log("disconnect database succefull!");
  }
}
