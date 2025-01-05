import express from "express";
import ejs from "ejs";
import appRouter from "./routes/app.mjs";
const app = express();
const port = 3003;

app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", "./views");
app.use(express.static("public"));

app.use("/", appRouter);

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
