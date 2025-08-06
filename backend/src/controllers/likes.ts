import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";

export const likePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { postId, userId } = req.body;
        
        // Get the post to find the author
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { author: true },
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Don't create notification if user is liking their own post
        if (post.authorId !== userId) {
            // Get the user who is liking the post
            const likingUser = await prisma.user.findUnique({
                where: { id: userId },
                select: { username: true, fullName: true }
            });

            // Create notification for the post author
            await prisma.notification.create({
                data: {
                    type: "like",
                    message: `${likingUser?.fullName || likingUser?.username || 'Someone'} liked your post "${post.title}"`,
                    userId: post.authorId,
                    postId: postId,
                    fromUserId: userId,
                },
            });
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likesNumber: { increment: 1 },
                likes: {
                    create: [
                        {
                            userId,
                        },
                    ],
                },
            },
        });
        res.status(201).json(updatedPost);
    } catch (error) {
        next({ error, message: "Unable to like this post" });
    }
};

export const dislikePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { postId, userId } = req.body;
        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likesNumber: { decrement: 1 },
                likes: {
                    delete: [
                        {
                            likeId: {
                                postId,
                                userId,
                            },
                        },
                    ],
                },
            },
        });
        res.status(200).json(updatedPost);
    } catch (error) {
        next({ error, message: "Unable to dislike this post" });
    }
};

export const checkLike = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId, postId } = req.query;
        const userLike = await prisma.like.findUnique({
            where: {
                likeId: {
                    postId: postId as string,
                    userId: userId as string,
                },
            },
        });
        res.status(200).json({ isLiked: !!userLike });
    } catch (error) {
        next({
            error,
            message: "Unable to verify the like for the given post",
        });
    }
};
