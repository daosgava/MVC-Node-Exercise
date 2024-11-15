const express = require("express");
const app = express();
const port = 3000;

const results = [];

app.get("/", (_, res) => {
	res.send("Home page");
});

app.get("/add", (req, res) => {
	const { a, b } = req.query;
    const sum = parseInt(a) + parseInt(b);
    results.push(sum);
	res.send(`a + b = ${sum}`);
});

app.get("/sub", (req, res) => {
	const { a, b } = req.query;
    const diff = parseInt(a) - parseInt(b);
    results.push(diff);
	res.send(`a - b = ${diff}`);
});

app.get("/mul", (req, res) => {
	const { a, b } = req.query;
    const product = parseInt(a) * parseInt(b);
    results.push(product);
	res.send(`a * b = ${product}`);
});

app.get("/div", (req, res) => {
	const { a, b } = req.query;
    const quotient = parseInt(a) / parseInt(b);
    results.push(quotient);
	res.send(`a / b = ${quotient}`);
});

app.get("/mod", (req, res) => {
	const { a, b } = req.query;
    const remainder = parseInt(a) % parseInt(b);
    results.push(remainder);
	res.send(`a % b = ${remainder}`);
});

app.post("/results", (_, res) => {
    res.send(results);
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
