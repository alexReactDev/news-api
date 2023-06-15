create TABLE categories(
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	url VARCHAR UNIQUE
);

create TABLE authors(
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	age INTEGER,
	gender VARCHAR CHECK (gender = 'male' or gender = 'female'),
	city VARCHAR,
	about VARCHAR,
	picture VARCHAR
);

create TABLE posts(
	id SERIAL PRIMARY KEY,
	title VARCHAR,
	text VARCHAR,
	created BIGINT,
	author INTEGER,
	category INTEGER,
	FOREIGN KEY (category) REFERENCES categories(id),
	FOREIGN KEY (author) REFERENCES authors(id)
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
 