import { App, CONFIG_PROJECT, Server } from "./config";

const serverApp = new Server({ config: CONFIG_PROJECT }, App);
serverApp.start();
