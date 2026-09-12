import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { uploadThumbnail } from "../middlewares/upload.middleware";

const router = Router();

router.get("/", PostController.getAll);
router.get("/:id", PostController.getById);
router.post("/", uploadThumbnail, PostController.create);
router.put("/:id", uploadThumbnail, PostController.update);
router.delete("/:id", PostController.remove);

export default router;