import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const createComment = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { postId, content } = req.body;
        const authorId = req.user?.id;

        // Get the post to find the author
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { author: true },
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = await prisma.comment.create({
            data: {
                content,
                postId,
                authorId: authorId!,
            },
            include: {
                author: true,
            },
        });

        // Don't create notification if user is commenting on their own post
        if (post.authorId !== authorId) {
            // Get the user who is commenting
            const commentingUser = await prisma.user.findUnique({
                where: { id: authorId },
                select: { username: true, fullName: true }
            });

            // Create notification for the post author
            await prisma.notification.create({
                data: {
                    type: "comment",
                    message: `${commentingUser?.fullName || commentingUser?.username || 'Someone'} commented "${content}" on your post "${post.title}"`,
                    userId: post.authorId,
                    postId: postId,
                    fromUserId: authorId,
                },
            });
        }

        res.status(201).json(newComment);
    } catch (error) {
        next({
            error,
            message: "Unable to create the comment with given details.",
        });
    }
};

export const getPostComments = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: req.params.postId,
            },
            include: {
                author: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        res.status(200).json(comments);
    } catch (error) {
        next({
            error,
            message: "Unable to fetch comments for the post.",
        });
    }
};

export const deleteComment = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log("Delete comment request received for comment ID:", req.params.id);
    console.log("User:", req.user);

    try {
        const commentId = req.params.id;
        const userId = req.user?.id;

        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
            include: { author: true },
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        if (comment.authorId !== userId) {
            return res.status(403).json({ message: "You can only delete your own comments." });
        }

        await prisma.comment.delete({
            where: { id: commentId },
        });

        console.log("Comment deleted successfully:", commentId);
        res.status(200).json({ message: "Comment deleted successfully." });
    } catch (error) {
        console.error("Delete comment error:", error);
        next({
            error,
            message: "Unable to delete the comment.",
        });
    }
};
