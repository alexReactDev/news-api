export default async function throttleMiddleware(req, res, next) {
	await new Promise((res, rej) => {
		setTimeout(() => {
			res();
		}, +process.env.THROTTLE_MS);
	})

	next();
}