import express from "express";
import { apiRoute } from "../routes/index";
import { corsMiddleware } from "@middlewares/cors";



const App = express();

App.use(express.json()); // acepte json entradas
App.use(corsMiddleware());

// ruta de prueba inicial
App.get("/", (req, res) => {
  return res.json({ message: "welcome to res-api to project RAWG Backend" });
});
App.use("/api", apiRoute);

export { App };
