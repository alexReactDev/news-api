import { Request, Response } from "express";
import model from "../model/categories.js";

class CategoriesController {
	async getCategories(req: Request, res: Response) {
		let categories;

		try {
			categories = await model.getCategories();
		}
		catch(e: any) {
			console.log(e)
			return res.sendStatus(500)
		}

		return res.send(categories);
	}
}

export default new CategoriesController();