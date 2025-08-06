import express from "express";
import {
    createNotification,
    getUserNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    getUnreadNotificationCount,
} from "../controllers/notifications";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// All routes are protected with authMiddleware
router.use(authMiddleware);

// Get all notifications for the authenticated user
router.get("/", getUserNotifications);

// Get unread notification count
router.get("/unread-count", getUnreadNotificationCount);

// Mark a specific notification as read
router.patch("/:notificationId/read", markNotificationAsRead);

// Mark all notifications as read
router.patch("/mark-all-read", markAllNotificationsAsRead);

// Delete a notification
router.delete("/:notificationId", deleteNotification);

// Create a notification (for internal use, not exposed to frontend directly)
router.post("/", createNotification);

export default router; 