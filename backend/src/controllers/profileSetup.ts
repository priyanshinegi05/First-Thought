import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";
import { sendWelcomeEmail } from "../utils/emailService";

// Update user profile after email verification
export const updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.params;
        const { bio, avatar, topicsOfInterest } = req.body;

        // Validate input
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user profile
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                bio: bio || "",
                avatar: avatar || "",
                topicsOfInterest: topicsOfInterest ? JSON.stringify(topicsOfInterest) : "[]"
            },
            select: {
                id: true,
                email: true,
                username: true,
                fullName: true,
                bio: true,
                avatar: true,
                topicsOfInterest: true
            }
        });

        // Send welcome email
        const parsedTopics = topicsOfInterest || [];
        try {
            await sendWelcomeEmail(
                updatedUser.email,
                updatedUser.fullName,
                updatedUser.username,
                parsedTopics
            );
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Don't fail the request if email fails
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                ...updatedUser,
                topicsOfInterest: JSON.parse(updatedUser.topicsOfInterest)
            }
        });
    } catch (error) {
        next({ error, message: "Failed to update profile" });
    }
};

// Get user profile for setup
export const getProfileForSetup = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                username: true,
                fullName: true,
                bio: true,
                avatar: true,
                topicsOfInterest: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            user: {
                ...user,
                topicsOfInterest: JSON.parse(user.topicsOfInterest)
            }
        });
    } catch (error) {
        next({ error, message: "Failed to get user profile" });
    }
}; 