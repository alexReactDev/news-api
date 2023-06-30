// Выдавать комменты определенного поста

import { Request, Response } from "express";
import model from "../model/comments.js";

class CommentsController {
	async getByPost(req: Request, res: Response) {
		const postId = +req.params.post;
		const page = +(req.query.page ?? 1) - 1; //To make pages start from 0
		const commentsPerPage = +(process.env.COMMENTS_PER_PAGE as string);

		let commentsData;

		try {
			commentsData = await model.getByPost(postId, commentsPerPage, commentsPerPage * page);
		}
		catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}

		return res.send({
			comments: commentsData.comments,
			total: Math.ceil(commentsData.total / commentsPerPage),
			page: page + 1
		});
	}

	async createComment(req: Request, res: Response) {
		const postId = +req.params.post;
		const { author, text } = req.body;
		const created = new Date().getTime();

		if(!author || !text) return res.sendStatus(400);

		try {
			await model.createForPost(postId, author, text, created);
		}
		catch(e: any) {
			console.log(e);
			return res.sendStatus(500)
		}
	
		return res.sendStatus(201);
	}
}

export default new CommentsController();