import client, { ObjectId } from "../utils/DatabaseClient.mjs";

const database = client.db("notifications");
const results = database.collection("notifications");

const saveNotification = async ({ userId, type, message }) => {
  try {
    await client.connect();
    const doc = {
      userId,
      type,
      message,
      timestamp: new Date(),
      seen: false,
    };

    const result = await results.insertOne(doc);
    return result;
  } finally {
    await client.close();
  }
};

const getNotifications = async (userId) => {
  try {
    await client.connect();
    const documents = await results.find({ userId }).toArray();

    return documents;
  } finally {
    await client.close();
  }
};

const markNotificationAsSeen = async (notificationId) => {
  try {
    await client.connect();
    const objectId = ObjectId.createFromHexString(notificationId);
    
    const result = await results.updateOne(
      { _id: objectId },
      { $set: { seen: true } },
    );
    return result;
  } finally {
    await client.close();
  }
};

const deleteNotification = async (notificationId) => {
  try {
    await client.connect();
    const objectId = ObjectId.createFromHexString(notificationId);
    const result = await results.deleteOne({ _id: objectId });
    return result;
  } finally {
    await client.close();
  }
};

export default {
  saveNotification,
  getNotifications,
  markNotificationAsSeen,
  deleteNotification,
};
