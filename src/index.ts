import { CONFIG_PROJECT } from "@config/index";
import { App, Server } from "./config";

const serverApp = new Server({ config: CONFIG_PROJECT }, App);
serverApp.start();
