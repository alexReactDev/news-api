import { Router } from "express";
import type { Router as RouterType} from "express";

import PostsRouter from "./posts.js";
import CommentsRouter from "./comments.js";
import AuthorsRouter from "./authors.js";
import ReactionsRouter from "./reactions.js";
import categoriesController from "../controller/categoriesController.js";
import postsController from "../controller/postsController.js";

const router: RouterType = new (Router as any)();

router.use("/posts", PostsRouter);
router.use("/comments", CommentsRouter);
router.use("/authors", AuthorsRouter);
router.use("/reactions", ReactionsRouter);
router.get("/categories", categoriesController.getCategories);
router.get("/collections/:col", postsController.getByCollection);

export default router;