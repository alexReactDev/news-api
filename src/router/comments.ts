import { Router } from "express";
import type { Router as RouterType } from "express";

import CommentsController from "../controller/commentsController.js";

const router: RouterType = new (Router as any)();

router.get("/:post", CommentsController.getByPost);
router.post("/:post", CommentsController.createComment);

export default router;