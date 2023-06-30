import express from "express";
import cors from "cors";
import router from "./router/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import throttleMiddleware from "./service/throttleMiddleware.js";
import cookieMiddleware from "./service/cookieMiddleware.js";

dotenv.config();

const PORT = 4500;

const app = express();
app.use(cors());
app.use(cookieParser());

if(process.env.MODE = "DEV") {
	app.use(throttleMiddleware);
}
app.use(cookieMiddleware);

app.use(router);

try {
	app.listen(PORT, () => {console.log(`Server started at port ${PORT}`)});
}
catch(e) {
	console.log(e);
}