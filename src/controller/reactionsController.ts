import { Request, Response } from "express";
import model from "../model/reactions.js";

const allowedReactions = ["upvote", "downvote", "wow"];

class ReactionsController {
	async getReactions(req: Request, res: Response) {
		const id = +req.params.id;
		const uid = req.cookies.uid;
		let reactions;
		let my_reaction;

		try {
			reactions = await model.getReactions(id);
		}
		catch(e: any) {
			console.log(e)
			return res.sendStatus(500)
		}

		try {
			my_reaction = (await model.getUserReaction(uid, id))?.reaction || null;
		}
		catch(e: any) {
			console.log(e)
			return res.sendStatus(500)
		}

		return res.send({
			...reactions,
			my_reaction
		});
	}

	async postReaction(req: Request, res: Response) {
		const id = +req.params.id;
		const reaction = req.params.reaction;
		const uid = req.cookies.uid;
		let my_reaction;

		if(!allowedReactions.includes(reaction)) return res.sendStatus(400);

		try {
			my_reaction = (await model.getUserReaction(uid, id))?.reaction || null;
		}
		catch(e: any) {
			console.log(e)
			return res.sendStatus(500)
		}

		if(reaction === my_reaction) {
			res.statusMessage = "Already reported";
			return res.sendStatus(208);
		}

		if(my_reaction) {
			try {
				await model.removeReaction(id, my_reaction);
			}
			catch(e: any) {
				console.log(e)
				return res.sendStatus(500)
			}
		}

		try {
			await model.postReaction(id, reaction);
		}
		catch(e: any) {
			console.log(e)
			return res.sendStatus(500)
		}

		if(my_reaction) {
			try {
				await model.changeUserReaction(uid, id, reaction);
			}
			catch(e: any) {
				console.log(e)
				return res.sendStatus(500)
			}
		}
		else {
			try {
				await model.setUserReaction(uid, id, reaction);
			}
			catch(e: any) {
				console.log(e)
				return res.sendStatus(500)
			}
		}
	
		return res.sendStatus(200);
	}

	async removeReaction(req: Request, res: Response) {
		const id = +req.params.id;
		const reaction = req.params.reaction;
		const uid = req.cookies.uid;
		let my_reaction;

		if(!allowedReactions.includes(reaction)) return res.sendStatus(400);

		try {
			my_reaction = (await model.getUserReaction(uid, id))?.reaction || null;
		}
		catch(e: any) {
			console.log(e)
			return res.sendStatus(500)
		}

		if(reaction !== my_reaction) return res.sendStatus(400);

		try {
			await model.removeReaction(id, reaction);
			await model.removeUserReaction(uid, id);
		}
		catch(e: any) {
			console.log(e)
			return res.sendStatus(500)
		}
	
		return res.sendStatus(200);
	}
}

export default new ReactionsController();