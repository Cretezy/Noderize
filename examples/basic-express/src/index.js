import express from "express";

const app = express();
const port = parseInt(process.env.PORT) || 3000;

app.get("/", (req, res) => {
	res.send("Hello from Noderize!");
});

app.get("/greet", (req, res) => {
	res.send(`Hello ${req.query.name || "world"}!`);
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
