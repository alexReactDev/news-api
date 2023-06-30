import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import db from "../model/db.js";

export default async function cookieMiddleware(req: Request, res: Response, next: NextFunction) {
	if(!req.cookies.uid) {
		const uid = v4();
		const lastOnline = new Date().getTime();
		
		try {
			await db.query("INSERT INTO users (id, last_online) values ($1, $2);", [uid, lastOnline]);
		}
		catch(e) {
			console.log("ERROR. Attempt to set cookie failed");
			console.log(e);
			next();
		}

		res.cookie("uid", uid, { maxAge: 2629743000 });
	}
	else {
		const lastOnline = new Date().getTime();
		
		try {
			await db.query("UPDATE users SET last_online = $1 where id = $2;", [lastOnline, req.cookies.uid]);
		}
		catch(e) {
			console.log("ERROR. Attempt to update cookie failed");
			console.log(e);
			next();
		}

		res.cookie("uid", req.cookies.uid, { maxAge: 2629743000 });
	}

	next();
}