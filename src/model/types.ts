export interface IPost {
	id: number,
	title: string,
	text: string,
	author: string
	created: number,
	category: number
}

export interface IPostsData {
	posts: IPost[],
	total: number
}

export interface IPostsModel {
	getById(id: number): Promise<IPost>;

	getByCat(cat: string, limit: number, offset: number): Promise<IPostsData>;

	getByAuthor(author: number, limit: number, offset: number): Promise<IPostsData>;
	
	getAll(limit: number, offset: number): Promise<IPostsData>;
}

/*
create TABLE posts(
	id SERIAL PRIMARY KEY,
	title VARCHAR,
	text VARCHAR,
	created BIGINT,
	author VARCHAR,
	category INTEGER,
	FOREIGN KEY (category) REFERENCES categories(id)
);
*/