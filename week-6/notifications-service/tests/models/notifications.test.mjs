import { describe, it, mock, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import notificationsModel from "../../models/notifications.mjs";
import client from "../../utils/DatabaseClient.mjs";

describe("Notifications Model", () => {
  let doc;
  beforeEach(() => {
    doc = {
      userId: 1,
      type: "info",
      message: "Hello, world!",
    };
    mock.fn(client, "connect", async () => {});
    mock.fn(client, "close", async () => {});
    mock.fn(client, "db", () => ({
      collection: () => ({
        insertOne: () => ({
          acknowledged: true,
          insertedCount: 1,
        }),
      }),
    }));
  });
  afterEach(() => {
    mock.restoreAll();
  });
  describe("saveNotification", () => {
    it("should save a notification", async () => {
      const result = await notificationsModel.saveNotification(doc);

      // Check if operation was acknowledged
      assert.strictEqual(result.acknowledged, true);
      // Check if one document was inserted
      assert.strictEqual(typeof result.insertedId, "object");
    });

    it("should throw an error if the operation fails", async () => {
      mock.fn(client, "db", () => ({
        collection: () => ({
          insertOne: () => {
            throw new Error("Database connection failed");
          },
        }),
      }));

      try {
        await notificationsModel.saveNotification(doc);
      } catch (error) {
        assert.strictEqual(error.message, "Database connection failed");
      }
    });
  });

  describe("getNotifications", () => {
    it("should get notifications for a user", async () => {
      const userId = 1;

      const result = await notificationsModel.getNotifications(userId);
      assert.strictEqual(result.length > 0, true);
      assert.strictEqual(result[0].userId, userId);
    });

    it("should throw an error if the operation fails", async ({ assert }) => {
      const userId = 1;

      mock.fn(client, "db", () => ({
        collection: () => ({
          find: () => ({
            toArray: () => {
              throw new Error("Database connection failed");
            },
          }),
        }),
      }));

      try {
        await notificationsModel.getNotifications(userId);
      } catch (error) {
        assert.strictEqual(error.message, "Database connection failed");
      }
    });
  });

  describe("markNotificationAsSeen", () => {
    it("should throw an error if the operation fails", async () => {
      const notificationId = "60c1c7a3c3c5d8e3b1e3e6f7";

      mock.fn(client, "db", () => ({
        collection: () => ({
          updateOne: () => {
            throw new Error("Database connection failed");
          },
        }),
      }));

      try {
        await notificationsModel.markNotificationAsSeen(notificationId);
      } catch (error) {
        assert.strictEqual(error.message, "Database connection failed");
      }
    });
  });
});
