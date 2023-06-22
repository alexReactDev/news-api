import db from "./db.js";

class AuthorsModel {
	async getAll() {
		return (await db.query("SELECT * FROM authors;")).rows;
	}

	async getByID(id: string) {
		return (await db.query("SELECT * FROM authors where id = $1;", [id])).rows[0];
	}
}

export default new AuthorsModel();