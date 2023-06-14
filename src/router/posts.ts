import { Router } from "express";
import type { Router as RouterType } from "express";
import postsController from "../controller/postsController.js";

const router: RouterType = new (Router as any)();

router.get("/post/:id", postsController.getById);
router.get("/:cat", postsController.getByCat);
router.get("/", postsController.getAll);
router.get("/reactions/:id", postsController.getReactions);

export default router;