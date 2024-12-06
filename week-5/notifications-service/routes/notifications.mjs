import express from "express";
import notificationsController from "../controllers/notifications.mjs";

const router = express.Router();

router.get("/", notificationsController.getNotifications);
router.post("/", notificationsController.saveNotification);
router.put("/seen", notificationsController.markNotificationAsSeen);
router.delete("/delete", notificationsController.deleteNotification);

export default router;
