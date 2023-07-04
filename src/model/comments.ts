import db from "./db.js";

class CommentsModel {
	async getByPost(id: number, limit: number, offset: number) {
		const comments = (await db.query("SELECT * FROM comments where post_id = $1 ORDER BY created DESC LIMIT $2 OFFSET $3;", [id, limit, offset])).rows;
		const total = +(await db.query("SELECT COUNT(*) FROM comments where post_id = $1;", [id])).rows[0].count;

		return {
			comments,
			total
		}
	}

	async createForPost(id: number, author: string, text: string, created: number) {
		const createdComment = (await db.query("INSERT INTO comments (author, text, created, post_id) values ($1, $2, $3, $4) RETURNING *;", [author, text, created, id])).rows[0];
		await db.query("UPDATE posts SET comments_count = comments_count + 1 where id = $1;", [id]);

		return createdComment;
	}
}

export default new CommentsModel();