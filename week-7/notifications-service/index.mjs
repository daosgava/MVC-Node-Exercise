import express from "express";
import cors from "cors";
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import notificationsRouter from "./routes/notifications.mjs";
import getWebSocketController from "./controllers/webSocket.mjs";

const corsOptions = {
  origin: "http://localhost:3003",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions
});
const port = 3000;
app.set("io", io);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(corsOptions));

app.use('/api/notifications', notificationsRouter);

const { handleOnConnection } = getWebSocketController({ io });
io.on('connection', handleOnConnection);

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
