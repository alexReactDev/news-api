import { IPost, IPostsData, IPostsModel } from "./types.js";
import db from "./db.js";

class PostsModel implements IPostsModel {
	async getById(id: number): Promise<IPost> {
		return (await db.query("SELECT * FROM posts where id = $1;", [id])).rows[0];
	}

	async getByCat(cat: string, limit: number, offset: number): Promise<IPostsData> {
		const catId = (await db.query("SELECT id from categories where url = $1;", [cat])).rows[0].id;

		const posts = (await db.query("SELECT * FROM posts where category = $1 LIMIT $2 OFFSET $3;", [catId, limit, offset])).rows;
		const total = +(await db.query("SELECT COUNT(*) FROM posts where category = $1;", [catId])).rows[0].count;

		return {
			posts,
			total
		}
	}

	async getByAuthor(author: number, limit: number, offset: number): Promise<IPostsData> {
		const posts = (await db.query("SELECT * FROM posts where author = $1 LIMIT $2 OFFSET $3;", [author, limit, offset])).rows;
		const total = +(await db.query("SELECT COUNT(*) FROM posts where author = $1;", [author])).rows[0].count;

		return {
			posts,
			total
		}
	}

	async getByCollection(collection: string, limit: number, offset: number) {
		const postsIDs = (await db.query("SELECT post_id from collections where collection = $1;", [collection])).rows.map((postObj: any) => postObj.post_id);
		const total = +(await db.query("SELECT COUNT(*) from collections where collection = $1;", [collection])).rows[0].count;
		const posts = (await db.query("SELECT * FROM posts where id = ANY($1);", [postsIDs])).rows;

		return {
			posts,
			total
		}
	}

	async getAll(limit: number, offset: number): Promise<IPostsData> {
		const posts = (await db.query("SELECT * FROM posts LIMIT $1 OFFSET $2;", [limit, offset])).rows;
		const total = +(await db.query("SELECT COUNT(*) FROM posts;")).rows[0].count;
		
		return {
			posts,
			total
		};
	}
}

export default new PostsModel();