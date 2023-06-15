import { IPost, IPostsModel } from "./types.js";
import db from "./db.js";

class PostsModel implements IPostsModel {
	async getById(id: number): Promise<IPost> {
		return (await db.query("SELECT * FROM posts where id = $1;", [id])).rows[0];
	}

	async getByCat(cat: string): Promise<IPost[]> {
		const catId = (await db.query("SELECT id from categories where url = $1;", [cat])).rows[0].id;

		return (await db.query("SELECT * FROM posts where category = $1;", [catId])).rows;
	}

	async getByAuthor(author: number): Promise<IPost[]> {
		return (await db.query("SELECT * FROM posts where author = $1;", [author])).rows;
	}

	async getAll(): Promise<IPost[]> {
		return (await db.query("SELECT * FROM posts;")).rows;
	}
	
	async getReactions(id: number) {
		return (await db.query("SELECT * FROM reactions where post_id = $1;", [id])).rows[0];
	}
}

export default new PostsModel();