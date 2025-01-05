import { drawNotifications } from "./notifications.js";
import initializeWebSocket from "./socket-client.js";

const initializeMaterialize = () => {
  const elements = document.querySelectorAll('.collapsible');
  M.Collapsible.init(elements, {});
};

// Notifications are being fetched for user with id 3
const userId = 3;
initializeMaterialize();
initializeWebSocket();
drawNotifications(userId);
