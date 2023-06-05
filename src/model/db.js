import pg from "pg";

const Pool = pg.Pool;

const pool = new Pool({
	user: "postgres",
	password: "D(902)-console",
	host: "localhost",
	port: 5432,
	database: "news"
})

export default pool;