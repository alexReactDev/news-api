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

		return res.send(post);
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

		return res.send(posts);
	}

	async getByAuthor(req: Request, res: Response) {
		const id = +req.params.id;
		let posts;

		try {
			posts = await model.getByAuthor(id);
		}
		catch(e: any) {
			console.log(e)
			return res.sendStatus(500)
		}
	
		return res.send(posts);
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

		return res.send(posts);
	}

	async getReactions(req: Request, res: Response) {
		const id = +req.params.id;
		let reactions;

		try {
			reactions = await model.getReactions(id);
		}
		catch(e: any) {
			console.log(e)
			return res.sendStatus(500)
		}

		return res.send(reactions);
	}
}

export default new PostsController();