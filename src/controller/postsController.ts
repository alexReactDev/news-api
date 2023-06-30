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
		const page = +(req.query.page ?? 1) - 1; //To make pages start from 0
		const postsPerPage = +(process.env.POSTS_PER_PAGE as string);

		let postsData;

		try {
			postsData = await model.getByCat(cat, postsPerPage, postsPerPage * page);
		}
		catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}

		return res.send({
			posts: postsData.posts,
			page: page + 1,
			total: Math.ceil(postsData.total / postsPerPage)
		});
	}

	async getByAuthor(req: Request, res: Response) {
		const id = +req.params.id;
		const page = +(req.query.page ?? 1) - 1; //To make pages start from 0
		const postsPerPage = +(process.env.POSTS_PER_PAGE as string);

		let postsData;

		try {
			postsData = await model.getByAuthor(id, postsPerPage, postsPerPage * page);
		}
		catch(e: any) {
			console.log(e)
			return res.sendStatus(500)
		}
	
		return res.send({
			posts: postsData.posts,
			page: page + 1,
			total: Math.ceil(postsData.total / postsPerPage)
		});
	}

	async getByCollection(req: Request, res: Response) {
		let collection = req.params.col;
		const page = +(req.query.page ?? 1) - 1; //To make pages start from 0
		const postsPerPage = +(process.env.POSTS_PER_PAGE as string);

		let postsData;

		try {
			postsData = await model.getByCollection(collection, postsPerPage, postsPerPage * page);
		}
		catch(e: any) {
			console.log(e)
			return res.sendStatus(500)
		}
	
		return res.send({
			posts: postsData.posts,
			page: page + 1,
			total: Math.ceil(postsData.total / postsPerPage)
		});
	}

	async getAll(req: Request, res: Response) {
		const page = +(req.query.page ?? 1) - 1; //To make pages start from 0
		const postsPerPage = +(process.env.POSTS_PER_PAGE as string);
		console.log(postsPerPage);

		let postsData;

		try {
			postsData = await model.getAll(postsPerPage, postsPerPage * page);
		}
		catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}

		return res.send({
			posts: postsData.posts,
			page: page + 1,
			total: Math.ceil(postsData.total / postsPerPage)
		});
	}
}

export default new PostsController();