import db from "./db.js";

class ReactionsModel {
	async getReactions(id: number) {
		return (await db.query("SELECT * FROM reactions where post_id = $1;", [id])).rows[0];
	}

	async postReaction(id: number, reaction: string) {
		return (await db.query(`UPDATE reactions set ${reaction} = ${reaction} + 1 where post_id = $1 RETURNING *;`, [id])).rows[0];
	}
	async removeReaction(id: number, reaction: string) {
		return (await db.query(`UPDATE reactions set ${reaction} = ${reaction} - 1 where post_id = $1 RETURNING *;`, [id])).rows[0];
	}

	async getUserReaction(userId: string, postId: number) {
		return (await db.query("SELECT * FROM user_reactions where user_id = $1 AND post_id = $2;", [userId, postId])).rows[0];
	}
	async setUserReaction(userId: string, postId: number, reaction: string) {
		return (await db.query("INSERT INTO user_reactions (user_id, post_id, reaction) values ($1, $2, $3) RETURNING *;", [userId, postId, reaction])).rows[0];
	}
	async changeUserReaction(userId: string, postId: number, reaction: string) {
		return (await db.query("UPDATE user_reactions SET reaction = $1 where user_id = $2 AND post_id = $3 RETURNING *;", [reaction, userId, postId])).rows[0];
	}
	async removeUserReaction(userId: string, postId: number) {
		return (await db.query("DELETE FROM user_reactions where user_id = $1 AND post_id = $2;", [userId, postId])).rows[0];
	}
}

export default new ReactionsModel();