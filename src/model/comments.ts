import db from "./db.js";

class CommentsModel {
	async getByPost(id: number, limit: number, offset: number) {
		const comments = (await db.query("SELECT * FROM comments where post_id = $1 LIMIT $2 OFFSET $3;", [id, limit, offset])).rows;
		const total = +(await db.query("SELECT COUNT(*) FROM comments where post_id = $1;", [id])).rows[0].count;

		return {
			comments,
			total
		}
	}
}

export default new CommentsModel();