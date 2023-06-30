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
	views_count INTEGER,
	comments_count INTEGER,
	picture VARCHAR,
	FOREIGN KEY (category) REFERENCES categories(id),
	FOREIGN KEY (author) REFERENCES authors(id)
);

create TABLE collections(
	post_id INTEGER,
	collection VARCHAR,
	FOREIGN KEY (post_id) REFERENCES posts(id)
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
	upvote INTEGER,
	downvote INTEGER,
	wow INTEGER,
	FOREIGN KEY (post_id) REFERENCES posts(id)
);
 
CREATE TABLE users(
	id VARCHAR PRIMARY KEY,
	last_online BIGINT
);

CREATE TABLE user_reactions(
	id SERIAL PRIMARY KEY,
	user_id VARCHAR,
	post_id SERIAL,
	reaction VARCHAR,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (post_id) REFERENCES posts(id)
);