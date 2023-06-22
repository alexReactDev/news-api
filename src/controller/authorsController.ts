import { Request, Response } from "express";
import AuthorsModel from "../model/authors.js";

class AuthorsController {
	async getAll(req: Request, res: Response) {
		let authors;

		try {
			authors = await AuthorsModel.getAll();
		}
		catch(e: any) {
			console.log(e);
			return res.sendStatus(500);
		}

		return res.send(authors);
	}

	async getByID(req: Request, res: Response) {
		const id = req.params.id;
		let author;

		try {
			author = await AuthorsModel.getByID(id);
		}
		catch(e: any) {
			console.log(e)
			return res.sendStatus(500)
		}
	
		return res.send(author)
	}
}

export default new AuthorsController();