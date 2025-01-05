import { drawNotifications } from "./notifications.js";

const initializeWebSocket = () => {
  const socket = io("http://localhost:3000");

  socket.on("new-notification", () => {
    const userId = 3;
    drawNotifications(userId);
  });
};

export default initializeWebSocket;
