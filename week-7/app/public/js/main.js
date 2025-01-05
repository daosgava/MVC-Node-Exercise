import { getNotifications, deleteNotification, markNotificationAsSeen } from "./api.js";

const collection = document.querySelector(".collection");

const initializeMaterialize = () => {
  const elements = document.querySelectorAll('.collapsible');
  M.Collapsible.init(elements, {});
};

const createNotification = (notificationId, type, message, seen) => {
    const link = document.createElement("a");
    link.href = "#!";
    link.className = `collection-item notification-item blue-text text-darken-2 ${seen ? "seen" : "unread"}`;
    link.textContent = message;
    link.onmouseover = async () => {
      console.log("onmouseover", seen);
      if (!seen) {
        await markNotificationAsSeen(notificationId);
        drawNotifications(userId);
      }
    }

    const remove = document.createElement("button");
    remove.className = "btn-flat waves-effect waves-blue";
    remove.innerHTML = "<i class='material-icons'>delete</i>";
    remove.onclick = async () => {
      await deleteNotification(notificationId);
      drawNotifications(userId);
    };
    link.appendChild(remove);
    collection.appendChild(link);
};

const updateBadgeNumber = (notifications) => {
  const badgeElement = document.querySelector(".collapsible-header .badge");
  const countUnseen = notifications.filter((notification) => !notification.seen).length;
  badgeElement.textContent = countUnseen;
};

const drawNotifications = async (userId) => {
  try {
    const notifications = await getNotifications(userId);
    
    collection.innerHTML = "";
    
    updateBadgeNumber(notifications);
    const sortedNotifications = notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    sortedNotifications.forEach((notification) => {
      createNotification(notification._id, notification.type, notification.message, notification.seen);
    });
  } catch (error) {
    console.error(error);
  }
};

const userId = 3;
initializeMaterialize();
drawNotifications(userId);
