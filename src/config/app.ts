import express from "express";

const App = express();

App.use(express.json()); // acepte json entradas

// ruta de prueba inicial
App.get("/", (req, res) => {
  return res.json({ message: "welcome to res-api to project RAWG Backend" });
});

App.get("/api");

export { App };
