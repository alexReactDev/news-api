import db from "./db.js";

class AuthorsModel {
	async getAll() {
		return (await db.query("SELECT * FROM authors;")).rows;
	}
}

export default new AuthorsModel();