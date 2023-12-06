import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("game main");
});
router.get("/:id", (req, res) => {
  res.send("game id");
});
router.post("/", (req, res) => {
  res.send("game create");
});
router.patch("/:id", (req, res) => {
  res.send("game update");
});
router.delete("/:id", (req, res) => {
  res.send("game deleted");
});

export { router };
