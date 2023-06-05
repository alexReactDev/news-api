export interface IPost {
	id: number,
	title: string,
	text: string,
	author: string
	created: number,
	category: number
}

export interface IPostsModel {
	getById(id: number): Promise<IPost>;

	getByCat(cat: string): Promise<IPost[]>;

	getAll(): Promise<IPost[]>
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