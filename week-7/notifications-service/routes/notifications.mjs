import express from "express";
import getNotificationsController from "../controllers/notifications.mjs";
import getNotificationsModel from "../models/notifications.mjs";
import { client, ObjectId } from "../utils/DatabaseClient.mjs";

const router = express.Router();

const notificationsModel = getNotificationsModel({ client, ObjectId });
const {
    getNotifications,
    saveNotification,
    markNotificationAsSeen,
    deleteNotification,
} = getNotificationsController({ notificationsModel });

router.get("/", getNotifications);
router.post("/", saveNotification);
router.put("/seen", markNotificationAsSeen);
router.delete("/delete", deleteNotification);

export default router;
