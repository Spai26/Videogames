import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send("gender main");
});
router.get("/:id", (req, res) => {
  return res.send("gender id");
});
router.post("/", (req, res) => {
  return res.send("gender create");
});
router.patch("/:id", (req, res) => {
  return res.send("gender update");
});
router.delete("/:id", (req, res) => {
  return res.send("gender deleted");
});

export { router };
