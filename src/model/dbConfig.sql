create TABLE categories(
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	url VARCHAR UNIQUE
);

create TABLE posts(
	id SERIAL PRIMARY KEY,
	title VARCHAR,
	text VARCHAR,
	created BIGINT,
	author VARCHAR,
	category INTEGER,
	FOREIGN KEY (category) REFERENCES categories(id)
);

create TABLE comments(
	id SERIAL PRIMARY KEY,
	author VARCHAR,
	text VARCHAR,
	created BIGINT,
	post_id INTEGER,
	FOREIGN KEY (post_id) REFERENCES posts(id)
);

create TABLE reactions(
	post_id INTEGER PRIMARY KEY,
	likes INTEGER,
	dislikes INTEGER,
	FOREIGN KEY (post_id) REFERENCES posts(id)
);
 