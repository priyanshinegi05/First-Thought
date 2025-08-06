import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

// Get user by ID
export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                fullName: true,
                email: true,
                bio: true,
                avatar: true,
                topicsOfInterest: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Parse topicsOfInterest from JSON string to array
        const userWithParsedTopics = {
            ...user,
            topicsOfInterest: user.topicsOfInterest ? JSON.parse(user.topicsOfInterest) : []
        };

        res.status(200).json({
            success: true,
            data: userWithParsedTopics,
        });
    } catch (error) {
        console.error("Get user error:", error);
        next(error);
    }
};

// Update user
export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { fullName, bio, topicsOfInterest } = req.body;

        // Convert topicsOfInterest array to JSON string for storage
        const updateData: any = {
            fullName,
            bio,
            avatar: req.image,
        };

        if (topicsOfInterest) {
            updateData.topicsOfInterest = JSON.stringify(topicsOfInterest);
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                username: true,
                fullName: true,
                email: true,
                bio: true,
                avatar: true,
                topicsOfInterest: true,
            },
        });

        // Parse topicsOfInterest back to array for response
        const userWithParsedTopics = {
            ...updatedUser,
            topicsOfInterest: updatedUser.topicsOfInterest ? JSON.parse(updatedUser.topicsOfInterest) : []
        };

        res.status(200).json({
            success: true,
            data: userWithParsedTopics,
        });
    } catch (error) {
        console.error("Update user error:", error);
        next(error);
    }
};

// Get user comments
export const getUserComments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;

        const comments = await prisma.comment.findMany({
            where: { authorId: userId },
            include: {
                author: {
                    select: {
                        id: true,
                        fullName: true,
                        username: true,
                        avatar: true,
                    },
                },
                post: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
            orderBy: { updatedAt: "desc" },
        });

        res.status(200).json({
            success: true,
            data: comments,
        });
    } catch (error) {
        console.error("Get user comments error:", error);
        next(error);
    }
};

// Get user likes
export const getUserLikes = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;

        const likes = await prisma.like.findMany({
            where: { userId },
            include: {
                post: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                fullName: true,
                                username: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
        });

        res.status(200).json({
            success: true,
            data: likes,
        });
    } catch (error) {
        console.error("Get user likes error:", error);
        next(error);
    }
};

// Get user saved posts
export const getUserSavedPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.params;

        const savedPosts = await prisma.savedPost.findMany({
            where: { userId },
            include: {
                post: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                fullName: true,
                                username: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
            orderBy: { savedAt: "desc" },
        });

        res.status(200).json({
            success: true,
            data: savedPosts,
        });
    } catch (error) {
        console.error("Get user saved posts error:", error);
        next(error);
    }
};
