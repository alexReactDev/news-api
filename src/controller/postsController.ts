// Выдавать посты по категории, делать пагинацию

import type { Request, Response } from "express";
import model from "../model/posts.js";

class PostsController {
	async getById(req: Request, res: Response) {
		const id = +req.params.id;
		let post;

		try {
			post = await model.getById(id);
		}
		catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}

		res.send(post);
	}

	async getByCat(req: Request, res: Response) {
		const cat = req.params.cat;
		let posts;

		try {
			posts = await model.getByCat(cat);
		}
		catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}

		res.send(posts);
	}

	async getAll(req: Request, res: Response) {
		let posts;

		try {
			posts = await model.getAll();
		}
		catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}

		res.send(posts);
	}
}

export default new PostsController();