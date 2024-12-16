import express from "express";
import cors from "cors"; 
import notificationsRouter from "./routes/notifications.mjs";
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const corsOptions = {
  origin: "http://localhost:3003",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

app.use('/api/notifications', notificationsRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
