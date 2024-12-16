import { describe, it, mock } from "node:test";
import { strictEqual, deepStrictEqual } from "node:assert/strict";
import notificationsController from "../../controllers/notifications.mjs";
import notificationsModel from "../../models/notifications.mjs";

describe("Notifications Controller", () => {
  describe("saveNotification", () => {
    it("should save a notification", async () => {
      const req = {
        body: {
          userId: 1,
          type: "info",
          message: "Hello, world!",
        },
      };

      // Mock the response object
      const res = {
        send: mock.fn(),
        status: mock.fn(() => res),
      };

      // Mock the saveNotification method from the notificationsModel
      mock.method(notificationsModel, "saveNotification", () => ({
        acknowledged: true,
        insertedCount: 1,
      }));

      await notificationsController.saveNotification(req, res);

      // Check if the saveNotification method was called with the correct arguments
      strictEqual(res.send.mock.calls.length, 1);
      // Check if the response was sent with the correct message
      strictEqual(
        res.send.mock.calls[0].arguments[0],
        "Notification saved",
      );
    });

    it("should return an error if the notification was not saved", async () => {
      const req = {
        body: {
          userId: 1,
          type: "info",
          message: "Hello, world!",
        },
      };

      const res = {
        send: mock.fn(),
        status: mock.fn(() => res),
      };

      // Mock the saveNotification method from the notificationsModel
      mock.method(notificationsModel, "saveNotification", () => ({
        acknowledged: true,
        insertedCount: 0,
      }));

      await notificationsController.saveNotification(req, res);

      strictEqual(res.status.mock.calls.length, 1);
      strictEqual(res.status.mock.calls[0].arguments[0], 400);
      strictEqual(res.send.mock.calls.length, 1);
      strictEqual(
        res.send.mock.calls[0].arguments[0],
        "Notification not saved",
      );
    });

    it("should return an error if an internal server error occurs", async () => {
      const req = {
        body: {
          userId: 1,
          type: "info",
          message: "Hello, world!",
        },
      };

      const res = {
        send: mock.fn(),
        status: mock.fn(() => res),
      };

      // Mock the saveNotification method from the notificationsModel
      mock.method(notificationsModel, "saveNotification", () => {
        throw new Error("Internal server error");
      });

      await notificationsController.saveNotification(req, res);

      strictEqual(res.status.mock.calls.length, 1);
      strictEqual(res.status.mock.calls[0].arguments[0], 500);
      strictEqual(res.send.mock.calls.length, 1);
      strictEqual(
        res.send.mock.calls[0].arguments[0],
        "Internal server error",
      );
    });
  });

  describe("getNotifications", () => {
    it("should get notifications", async () => {
      const req = {
        query: {
          userId: 1,
        },
      };

      const res = {
        send: mock.fn(),
        status: mock.fn(() => res),
      };

      // Mock the getNotifications method from the notificationsModel
      mock.method(notificationsModel, "getNotifications", () => [
        {
          _id: "1",
          type: "info",
          message: "Hello, world!",
          seen: false,
        },
      ]);

      await notificationsController.getNotifications(req, res);

      strictEqual(res.send.mock.calls.length, 1);
      deepStrictEqual(res.send.mock.calls[0].arguments[0], [
        {
          _id: "1",
          type: "info",
          message: "Hello, world!",
          seen: false,
        },
      ]);
    });

    it("should return an error if an internal server error occurs", async () => {
      const req = {
        query: {
          userId: 1,
        },
      };

      const res = {
        send: mock.fn(),
        status: mock.fn(() => res),
      };

      mock.method(notificationsModel, "getNotifications", () => {
        throw new Error("Internal server error");
      });

      await notificationsController.getNotifications(req, res);

      strictEqual(res.status.mock.calls.length, 1);
      strictEqual(res.status.mock.calls[0].arguments[0], 500);
      strictEqual(res.send.mock.calls.length, 1);
      strictEqual(
        res.send.mock.calls[0].arguments[0],
        "Internal server error",
      );
    });
  });

  describe("markNotificationAsSeen", () => {
    it("should mark a notification as seen", async () => {
      const req = {
        query: {
          notificationId: "1",
        },
      };

      const res = {
        send: mock.fn(),
        status: mock.fn(() => res),
      };

      mock.method(notificationsModel, "markNotificationAsSeen", () => ({
        acknowledged: true,
        modifiedCount: 1,
      }));

      await notificationsController.markNotificationAsSeen(req, res);

      strictEqual(res.send.mock.calls.length, 1);
      strictEqual(
        res.send.mock.calls[0].arguments[0],
        "Notification marked as seen",
      );
    });

    it("should return an error if the notification was not found", async () => {
      const req = {
        query: {
          notificationId: "1",
        },
      };

      const res = {
        send: mock.fn(),
        status: mock.fn(() => res),
      };

      mock.method(notificationsModel, "markNotificationAsSeen", () => ({
        acknowledged: true,
        modifiedCount: 0,
      }));

      await notificationsController.markNotificationAsSeen(req, res);

      strictEqual(res.status.mock.calls.length, 1);
      strictEqual(res.status.mock.calls[0].arguments[0], 404);
      strictEqual(res.send.mock.calls.length, 1);
      strictEqual(
        res.send.mock.calls[0].arguments[0],
        "Notification not found",
      );
    });

    it("should return an error if an internal server error occurs", async () => {
      const req = {
        query: {
          notificationId: "1",
        },
      };

      const res = {
        send: mock.fn(),
        status: mock.fn(() => res),
      };

      mock.method(notificationsModel, "markNotificationAsSeen", () => {
        throw new Error("Internal server error");
      });

      await notificationsController.markNotificationAsSeen(req, res);

      strictEqual(res.status.mock.calls.length, 1);
      strictEqual(res.status.mock.calls[0].arguments[0], 500);
      strictEqual(res.send.mock.calls.length, 1);
      strictEqual(
        res.send.mock.calls[0].arguments[0],
        "Internal server error",
      );
    });
  });

  describe("deleteNotification", () => {
    it("should delete a notification", async () => {
      const req = {
        query: {
          notificationId: "1",
        },
      };

      const res = {
        send: mock.fn(),
        status: mock.fn(() => res),
      };

      mock.method(notificationsModel, "deleteNotification", () => ({
        acknowledged: true,
        deletedCount: 1,
      }));

      await notificationsController.deleteNotification(req, res);

      strictEqual(res.send.mock.calls.length, 1);
      strictEqual(
        res.send.mock.calls[0].arguments[0],
        "Notification deleted",
      );
    });

    it("should return an error if the notification was not found", async () => {
      const req = {
        query: {
          notificationId: "1",
        },
      };

      const res = {
        send: mock.fn(),
        status: mock.fn(() => res),
      };

      mock.method(notificationsModel, "deleteNotification", () => ({
        acknowledged: true,
        deletedCount: 0,
      }));

      await notificationsController.deleteNotification(req, res);

      strictEqual(res.status.mock.calls.length, 1);
      strictEqual(res.status.mock.calls[0].arguments[0], 404);
      strictEqual(res.send.mock.calls.length, 1);
      strictEqual(
        res.send.mock.calls[0].arguments[0],
        "Notification not found",
      );
    });

    it("should return an error if an internal server error occurs", async () => {
      const req = {
        query: {
          notificationId: "1",
        },
      };

      const res = {
        send: mock.fn(),
        status: mock.fn(() => res),
      };

      mock.method(notificationsModel, "deleteNotification", () => {
        throw new Error("Internal server error");
      });

      await notificationsController.deleteNotification(req, res);

      strictEqual(res.status.mock.calls.length, 1);
      strictEqual(res.status.mock.calls[0].arguments[0], 500);
      strictEqual(res.send.mock.calls.length, 1);
      strictEqual(
        res.send.mock.calls[0].arguments[0],
        "Internal server error",
      );
    });
  });
});
