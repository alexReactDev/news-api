import db from "./db.js";

class CommentsModel {
	async getByPost(id: number) {
		return (await db.query("SELECT * FROM comments where post_id = $1;", [id])).rows;
	}
}

export default new CommentsModel();