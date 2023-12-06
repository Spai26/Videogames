import http from "node:http";
import express, { Router, Express } from "express";

export interface ConfigType {
  PORT: number;
  PROJECT_NAME: string;
  ENVIRONMENT: string;
  HOST_SERVER: string;
}

class Server {
  _config: ConfigType;
  _express: Express;
  _server: http.Server;
  _router: Router;
  _externalRoute: Router;

  constructor({ config }: { config: ConfigType }, router: Express) {
    this._config = config;
    this._express = express();
    this._server = http.createServer(this._express);
    this._router = router;
    this._express.use(router);
  }

  start() {
    return new Promise<void>((resolve, reject): void => {
      this._server.on("error", (error) => {
        reject(error);
      });

      this._server.listen(this._config.PORT || process.env.PORT, () => {
        console.log(`✓ Project ${this._config.PROJECT_NAME}`);
        console.log(`✓ Service: ${this._config.ENVIRONMENT}`);
        if (this._config.ENVIRONMENT !== "production") {
          console.log(
            `✓ Server running on ${this._config.HOST_SERVER}:${this._config.PORT}`
          );
        }
        resolve();
      });
    });
  }
  stop() {
    return new Promise<void>((resolve, reject) => {
      this._server.close((error) => {
        if (error) {
          reject(error);
        } else {
          console.log("✓ Server stopped");
          resolve();
        }
      });
    });
  }
}

export { Server };
