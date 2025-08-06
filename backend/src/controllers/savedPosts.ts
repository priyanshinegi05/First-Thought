import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const savePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { postId } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        // Check if post exists
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Check if already saved
        const existingSave = await prisma.savedPost.findUnique({
            where: {
                savedPostId: {
                    postId,
                    userId,
                },
            },
        });

        if (existingSave) {
            return res.status(400).json({ message: "Post is already saved." });
        }

        // Save the post
        const savedPost = await prisma.savedPost.create({
            data: {
                postId,
                userId,
            },
            include: {
                post: {
                    include: {
                        author: true,
                    },
                },
            },
        });

        res.status(201).json(savedPost);
    } catch (error) {
        next({
            error,
            message: "Unable to save the post.",
        });
    }
};

export const unsavePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { postId } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const savedPost = await prisma.savedPost.findUnique({
            where: {
                savedPostId: {
                    postId,
                    userId,
                },
            },
        });

        if (!savedPost) {
            return res.status(404).json({ message: "Saved post not found." });
        }

        await prisma.savedPost.delete({
            where: {
                savedPostId: {
                    postId,
                    userId,
                },
            },
        });

        res.status(200).json({ message: "Post unsaved successfully." });
    } catch (error) {
        next({
            error,
            message: "Unable to unsave the post.",
        });
    }
};

export const getSavedPosts = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const savedPosts = await prisma.savedPost.findMany({
            where: {
                userId,
            },
            include: {
                post: {
                    include: {
                        author: true,
                    },
                },
            },
            orderBy: {
                savedAt: "desc",
            },
        });

        res.status(200).json(savedPosts);
    } catch (error) {
        next({
            error,
            message: "Unable to fetch saved posts.",
        });
    }
};

export const checkIfPostSaved = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { postId } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const savedPost = await prisma.savedPost.findUnique({
            where: {
                savedPostId: {
                    postId,
                    userId,
                },
            },
        });

        res.status(200).json({ isSaved: !!savedPost });
    } catch (error) {
        next({
            error,
            message: "Unable to check if post is saved.",
        });
    }
}; 