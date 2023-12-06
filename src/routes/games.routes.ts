import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send("game main");
});
router.get("/:id", (req, res) => {
  return res.send("game id");
});
router.post("/", (req, res) => {
  return res.send("game create");
});
router.patch("/:id", (req, res) => {
  return res.send("game update");
});
router.delete("/:id", (req, res) => {
  return res.send("game deleted");
});

export { router };
