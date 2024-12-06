import express from "express";
import notificationsController from "../controllers/notifications.mjs";

const router = express.Router();

router.get("/", notificationsController.getNotifications);
router.post("/", notificationsController.saveNotification);
router.put("/", notificationsController.markNotificationAsSeen);
router.delete("/", notificationsController.deleteNotification);

export default router;
