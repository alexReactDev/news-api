import { Router } from "express";
import reactionsController from "../controller/reactionsController.js";

const router = new (Router as any)();

router.get("/:id", reactionsController.getReactions);
router.post("/:reaction/:id", reactionsController.postReaction);
router.delete("/:reaction/:id", reactionsController.removeReaction);

export default router;