import { Router } from "express";
import type { Router as RouterType} from "express";

import PostsRouter from "./posts.js";
import CommentsRouter from "./comments.js";

const router: RouterType = new (Router as any)();

router.use("/posts", PostsRouter);
router.use("/comments", CommentsRouter);

export default router;