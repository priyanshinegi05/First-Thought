import { Request, Response } from "express";
import prisma from "../config/prisma";

// Create a notification
export const createNotification = async (req: Request, res: Response) => {
    try {
        const { type, message, userId, postId, fromUserId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const notification = await prisma.notification.create({
            data: {
                type,
                message,
                userId,
                postId: postId || null,
                fromUserId: fromUserId || null,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        avatar: true,
                    },
                },
                post: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                fromUser: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        avatar: true,
                    },
                },
            },
        });

        res.status(201).json(notification);
    } catch (error) {
        console.error("Error creating notification:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Get all notifications for a user
export const getUserNotifications = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId,
            },
            include: {
                post: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                fromUser: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        avatar: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json(notifications);
    } catch (error) {
        console.error("Error getting notifications:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Mark notification as read
export const markNotificationAsRead = async (req: Request, res: Response) => {
    try {
        const { notificationId } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const notification = await prisma.notification.update({
            where: {
                id: notificationId,
                userId, // Ensure user can only mark their own notifications as read
            },
            data: {
                isRead: true,
            },
        });

        res.json(notification);
    } catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        await prisma.notification.updateMany({
            where: {
                userId,
                isRead: false,
            },
            data: {
                isRead: true,
            },
        });

        res.json({ message: "All notifications marked as read." });
    } catch (error) {
        console.error("Error marking all notifications as read:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Delete a notification
export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const { notificationId } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        await prisma.notification.delete({
            where: {
                id: notificationId,
                userId, // Ensure user can only delete their own notifications
            },
        });

        res.json({ message: "Notification deleted successfully." });
    } catch (error) {
        console.error("Error deleting notification:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Get unread notification count
export const getUnreadNotificationCount = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const count = await prisma.notification.count({
            where: {
                userId,
                isRead: false,
            },
        });

        res.json({ count });
    } catch (error) {
        console.error("Error getting unread notification count:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}; 