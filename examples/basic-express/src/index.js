import express from "express";
import data from "./data.json"; // Load data from JSON

const port = parseInt(process.env.PORT) || 3000;
const app = express();

app.get("/", (req, res) => {
	res.send(`Hello world from ${data.project}!`);
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
