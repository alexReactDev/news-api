import express from "express";
import cors from "cors";
import router from "./router/index.js";

const PORT = 4500;

const app = express();
app.use(cors());
app.use(router);

try {
	app.listen(PORT, () => {console.log(`Server started at port ${PORT}`)});
}
catch(e) {
	console.log(e);
}