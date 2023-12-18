import { App, CONFIG_PROJECT, Database, Server } from "./config";

const serverApp = new Server({ config: CONFIG_PROJECT }, App);
serverApp.start();
