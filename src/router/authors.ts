import { Router } from "express";
import authorsController from "../controller/authorsController.js";
import postsController from "../controller/postsController.js";

const router = new (Router as any)();

router.get("/", authorsController.getAll);
router.get("/:id", authorsController.getByID);
router.get("/posts/:id", postsController.getByAuthor);

export default router;