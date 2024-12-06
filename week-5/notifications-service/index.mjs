import express from "express";
import notificationsRouter from "./routes/notifications.mjs";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/notifications', notificationsRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
