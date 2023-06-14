import db from "./db.js";

class CategoriesModel {
	async getCategories() {
		const categories = (await db.query("SELECT * FROM categories;")).rows;

		return categories;
	}
}

export default new CategoriesModel();