/* node:coverage disable */

import { describe, it, mock, beforeEach, afterEach, before } from "node:test";
import { strictEqual, equal } from "node:assert/strict";
import getNotificationsModel from "../../models/notifications.mjs";

const operationsMock = {
  insertOne: mock.fn(),
  find: mock.fn(),
  updateOne: mock.fn(),
  deleteOne: mock.fn(),
};

const client = {
  connect: mock.fn(),
  close: mock.fn(),
  db: () => ({
    collection: () => ({
      insertOne: operationsMock.insertOne,
      find: operationsMock.find,
      updateOne: operationsMock.updateOne,
      deleteOne: operationsMock.deleteOne,
    }),
  }),
};

const ObjectId = {
  createFromHexString: mock.fn(),
};

const notificationsModel = getNotificationsModel({ client, ObjectId });

describe("Notifications Model", () => {
  let doc;
  beforeEach(() => {
    // Set initial state
    doc = {
      userId: 1,
      type: "info",
      message: "Hello, world!",
    };
  });
  afterEach(() => {
    mock.restoreAll();
  });
  describe("saveNotification", () => {
    it("should save a notification", async () => {
      operationsMock.insertOne.mock.mockImplementationOnce(() => ({
        acknowledged: true,
        insertedId: {},
      }));

      const result = await notificationsModel.saveNotification(doc);
      // Check if operation was acknowledged
      strictEqual(result.acknowledged, true);
      // Check if one document was inserted
      strictEqual(typeof result.insertedId, "object");
    });

    it("should throw an error if the operation fails", async () => {
      operationsMock.insertOne.mock.mockImplementationOnce(() => {
        throw new Error("Database connection failed");
      });

      try {
        await notificationsModel.saveNotification(doc);
      } catch (error) {
        strictEqual(error.message, "Database connection failed");
      }
    });
  });

  describe("getNotifications", () => {
    it("should get notifications for a user", async () => {
      operationsMock.find.mock.mockImplementationOnce(() => ({
        toArray: () => [doc],
      }));
      const userId = 1;

      const result = await notificationsModel.getNotifications(userId);
      strictEqual(result.length > 0, true);
      strictEqual(result[0].userId, userId);
    });

    it("should throw an error if the operation fails", async ({ assert }) => {
      const userId = 1;

      operationsMock.find.mock.mockImplementationOnce(() => {
        throw new Error("Database connection failed");
      });

      try {
        await notificationsModel.getNotifications(userId);
      } catch (error) {
        strictEqual(error.message, "Database connection failed");
      }
    });
  });

  describe("markNotificationAsSeen", () => {
    it("should throw an error if the operation fails", async () => {
      const notificationId = "60c1c7a3c3c5d8e3b1e3e6f7";

      operationsMock.updateOne.mock.mockImplementationOnce(() => {
        throw new Error("Database connection failed");
      });

      try {
        await notificationsModel.markNotificationAsSeen(notificationId);
      } catch (error) {
        strictEqual(error.message, "Database connection failed");
      }
    });
  });

  describe("deleteNotification", () => {
    it("should delete a notification", async () => {
      const notificationId = "67527013a195525bb5b63633";
      operationsMock.deleteOne.mock.mockImplementationOnce(() => ({
        acknowledged: true,
      }));
      const result = await notificationsModel.deleteNotification(
        notificationId,
      );
      equal(result.acknowledged, true);
    });

    it("should throw an error if the operation fails", async () => {
      const notificationId = "67527013a195525bb5b63633";
      operationsMock.deleteOne.mock.mockImplementationOnce(() => {
        throw new Error("Database connection failed");
      });

      try {
        await notificationsModel.deleteNotification(notificationId);
      } catch (error) {
        equal(error.message, "Database connection failed");
      }
    });
  });
});
