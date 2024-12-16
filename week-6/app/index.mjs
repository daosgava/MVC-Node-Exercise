import express from "express";
import ejs from "ejs";
const app = express();
const port = 3003;

app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (_, res) => {
  res.render("index.html", { title: "Welcome Page" });
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
