const express = require("express");
const app = express();
const port = 3000;

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (_, res) => {
  res.render("index.html", { title: "Welcome" });
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
