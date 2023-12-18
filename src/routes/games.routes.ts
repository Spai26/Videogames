import { Router } from "express";
import { GameController } from "../controllers/index";

const router = Router();

router.get("/", GameController.getAll);
router.post("/", GameController.create);
router.get("/:id", GameController.getByid);
router.patch("/:id", GameController.update);
router.delete("/:id", GameController.destroy);

export { router };
