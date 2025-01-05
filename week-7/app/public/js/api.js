const BASE_URL = "http://localhost:3000";

const getNotifications = async (userId) => {
  try {
    const notifications = await fetch(
      `${BASE_URL}/api/notifications?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await notifications.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const markNotificationAsSeen = async (notificationId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/notifications/seen?notificationId=${notificationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteNotification = async (notificationId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/notifications/delete?notificationId=${notificationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getNotifications, markNotificationAsSeen, deleteNotification };
