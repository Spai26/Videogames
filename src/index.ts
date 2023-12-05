import express from "express";
import { prueba } from "@config/server";

const app = express();

app.get("/", (req, res) => {
  return res.send("banda");
});

app.listen(3000, () => {
  console.log(prueba);
});
