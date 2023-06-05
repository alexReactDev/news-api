import { IPost, IPostsModel } from "./types.js";
import db from "./db.js";

class PostsModel implements IPostsModel {
	async getById(id: number): Promise<IPost> {
		return (await db.query("SELECT * FROM posts where id = $1;", [id])).rows[0];
	}

	async getByCat(cat: string): Promise<IPost[]> {
		return (await db.query("SELECT * FROM posts where category = $1;", [cat])).rows;
	}

	async getAll(): Promise<IPost[]> {
		return (await db.query("SELECT * FROM posts;")).rows;
	}
}

export default new PostsModel();