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
}

export default new AuthorsController();