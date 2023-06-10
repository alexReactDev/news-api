// Выдавать комменты определенного поста

import { Request, Response } from "express";
import model from "../model/comments.js";

class CommentsController {
	async getByPost(req: Request, res: Response) {
		const postId = +req.params.post;
		let comments;

		try {
			comments = await model.getByPost(postId);
		}
		catch(e) {
			console.log(e);
			res.sendStatus(500);
		}

		res.send(comments);
	}
}

export default new CommentsController();