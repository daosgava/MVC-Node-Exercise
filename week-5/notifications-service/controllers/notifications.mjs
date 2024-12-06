import notificationsModel from "../models/notifications.mjs";

const saveNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;
    const dbTransaction = await notificationsModel.saveNotification({
      userId,
      type,
      message,
    });
    if (!dbTransaction.acknowledged) {
      res.status(500).send("Internal server error");
      return;
    }
    if (dbTransaction.insertedCount === 0) {
      res.status(400).send("Notification not saved");
      return;
    }
    res.send("Notification saved");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const getNotifications = async (req, res) => {
  try {
    const { userId } = req.query;
    const notifications = await notificationsModel.getNotifications(userId);
    res.send(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const markNotificationAsSeen = async (req, res) => {
  try {
    const { notificationId } = req.query;
    const dbTransaction = await notificationsModel.markNotificationAsSeen(
      notificationId,
    );
    if (!dbTransaction.acknowledged) {
      res.status(500).send("Internal server error");
      return;
    }
    if (dbTransaction.modifiedCount === 0) {
      res.status(404).send("Notification not found");
      return;
    }
    res.send("Notification marked as seen");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.query;
    const dbTransaction = await notificationsModel.deleteNotification(
      notificationId,
    );
    if (!dbTransaction.acknowledged) {
      res.status(500).send("Internal server error");
      return;
    }
    if (dbTransaction.deletedCount === 0) {
      res.status(404).send("Notification not found");
      return;
    }
    res.send("Notification deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export default {
  saveNotification,
  getNotifications,
  markNotificationAsSeen,
  deleteNotification,
};
