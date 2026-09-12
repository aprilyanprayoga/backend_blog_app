import { Router } from "express";
import { PostController } from "../controllers/post.controller";

const router = Router();

router.get("/", PostController.getAll);
router.get("/:id", PostController.getById);
router.post("/", PostController.create);
router.put("/:id", PostController.update);
router.delete("/:id", PostController.remove);

export default router;