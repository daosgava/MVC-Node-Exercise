import express from "express";
import { logMathOperation, getMathOperations } from "./db.mjs";
const app = express();
const port = 3000;

app.get("/", async (_, res) => {
  const results = await getMathOperations();
  res.send(`
    <h1>Welcome</h1>
    <p>Use the following endpoints to perform math operations:</p>
    <ul>
      <li>/add?a=4&b=5</li>
      <li>/sub?a=4&b=5</li>
      <li>/mul?a=4&b=5</li>
      <li>/div?a=4&b=5</li>
      <li>/mod?a=4&b=5</li>
    </ul>
    <p>Use the /results endpoint to view the results of the math operations.</p>
    <h2>Results</h2>
    <ul>
      ${results
        .map(
          (result) =>
            `<li>${result.number} (${result.operationType}) - ${result.timestamp}</li>`
        )
        .join("")}
    </ul>
  `);
});

const validateInput = (a, b) => isNaN(a) || isNaN(b);

app.get("/add", async (req, res) => {
  try {
    const { a, b } = req.query;
    if (validateInput(a, b)) {
      res.status(400).send("Invalid input");
      return;
    }

    const sum = parseInt(a) + parseInt(b);
    await logMathOperation(sum, "add");
    res.send(`a + b = ${sum}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/sub", async (req, res) => {
  try {
    const { a, b } = req.query;
    if (validateInput(a, b)) {
      res.status(400).send("Invalid input");
      return;
    }
    const diff = parseInt(a) - parseInt(b);
    await logMathOperation(diff, "sub");
    res.send(`a - b = ${diff}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/mul", async (req, res) => {
  try {
    const { a, b } = req.query;
    if (validateInput(a, b)) {
      res.status(400).send("Invalid input");
      return;
    }
    const product = parseInt(a) * parseInt(b);
    await logMathOperation(product, "mul");
    res.send(`a * b = ${product}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/div", async (req, res) => {
  try {
    const { a, b } = req.query;
    if (validateInput(a, b)) {
      res.status(400).send("Invalid input");
      return;
    }
    const quotient = parseInt(a) / parseInt(b);
    await logMathOperation(quotient, "div");
    res.send(`a / b = ${quotient}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/mod", async (req, res) => {
  try {
    const { a, b } = req.query;
    if (validateInput(a, b)) {
      res.status(400).send("Invalid input");
      return;
    }
    const remainder = parseInt(a) % parseInt(b);
    await logMathOperation(remainder, "mod");
    res.send(`a % b = ${remainder}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/results", async (_, res) => {
  try {
    const results = await getMathOperations();
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
