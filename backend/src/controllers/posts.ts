import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { page = 1, pageSize = 9, tags } = req.query;
    try {
        let whereClause: any = {};
        
        // Filter by tags if provided
        if (tags) {
            if (Array.isArray(tags)) {
                // Multiple tags - posts must contain ANY of the selected tags (OR logic)
                whereClause.OR = tags.map((tag: any) => ({
                    tags: {
                        contains: String(tag)
                    }
                }));
            } else if (typeof tags === 'string') {
                // Single tag
                whereClause.tags = {
                    contains: tags
                };
            }
        }
        
        const totalPosts = await prisma.post.count({ where: whereClause });
        const totalPages = Math.ceil(totalPosts / Number(pageSize));
        const posts = await prisma.post.findMany({
            where: whereClause,
            orderBy: {
                updatedAt: "desc",
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            include: {
                comments: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        bio: true,
                        avatar: true,
                        fullName: true,
                    },
                },
            },
        });

        // Parse tags for each post
        const postsWithParsedTags = posts.map(post => ({
            ...post,
            tags: (post as any).tags ? JSON.parse((post as any).tags) : []
        }));

        if (!posts) {
            res.status(404).json({ message: "Posts not found" });
        }

        res.status(200).json({
            page,
            totalPages,
            posts: postsWithParsedTags,
        });
    } catch (error) {
        next({ error, message: "Posts not found" });
    }
};

export const getSinglePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const post = await prisma.post.findUniqueOrThrow({
            where: {
                id: req.params.id,
            },
            include: {
                comments: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        bio: true,
                        avatar: true,
                        fullName: true,
                    },
                },
            },
        });

        // Parse tags for the post
        const postWithParsedTags = {
            ...post,
            tags: (post as any).tags ? JSON.parse((post as any).tags) : []
        };

        res.status(200).json(postWithParsedTags);
    } catch (error) {
        next({ error, message: "Post not found." });
    }
};

export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log("Create post request received:", req.body);
    console.log("Image file:", req.image);
    console.log("User:", req.user);
    console.log("Tags received:", req.body.tags);
    console.log("Tags type:", typeof req.body.tags);
    
    try {
        const { tags, ...otherData } = req.body;
        
        // Parse tags if it's a JSON string
        let parsedTags: string[] = [];
        if (typeof tags === 'string') {
            try {
                parsedTags = JSON.parse(tags);
            } catch (error) {
                console.error("Error parsing tags:", error);
                return res.status(400).json({
                    success: false,
                    message: "Invalid tags format."
                });
            }
        } else if (Array.isArray(tags)) {
            parsedTags = tags;
        }
        
        console.log("Parsed tags:", parsedTags);
        
        // Validate that at least one tag is selected
        if (!parsedTags || parsedTags.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one tag is required for the post."
            });
        }
        
        const postData: any = {
            ...otherData,
            tags: JSON.stringify(parsedTags),
            updatedAt: new Date(),
        };
        
        // Only add postImg if it exists
        if (req.image) {
            postData.postImg = req.image;
        }
        
        const newPost = await prisma.post.create({
            data: postData,
        });
        console.log("Post created successfully:", newPost.id);
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Create post error:", error);
        next({
            error,
            message: "Unable to create the post with given details.",
        });
    }
};

export const updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: req.params.id,
            },
            data: {
                ...req.body,
                postImg: req.image || undefined,
                updatedAt: new Date(),
            },
        });
        res.status(200).json(updatedPost);
    } catch (error) {
        next({
            error,
            message: "Unable to update the post with given details.",
        });
    }
};

export const deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log("Delete post request received for post ID:", req.params.id);
    console.log("User:", req.user);
    
    try {
        const postId = req.params.id;
        const userId = req.user?.id;
        
        // Check if post exists and belongs to the user
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { author: true },
        });
        
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        
        if (post.authorId !== userId) {
            return res.status(403).json({ message: "You can only delete your own posts." });
        }
        
        // Delete the post (cascade will handle related likes and comments)
        await prisma.post.delete({
            where: { id: postId },
        });
        
        console.log("Post deleted successfully:", postId);
        res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
        console.error("Delete post error:", error);
        next({
            error,
            message: "Unable to delete the post.",
        });
    }
};

export const getPostsByAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const postsByAuthor = await prisma.post.findMany({
            where: {
                authorId: req.params.id,
            },
            include: {
                comments: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        bio: true,
                        avatar: true,
                        fullName: true,
                    },
                },
            },
        });
        if (!postsByAuthor) {
            res.status(404).json("Posts not found for the given author.");
        }

        // Parse tags for each post
        const postsWithParsedTags = postsByAuthor.map(post => ({
            ...post,
            tags: (post as any).tags ? JSON.parse((post as any).tags) : []
        }));

        res.status(200).json(postsWithParsedTags);
    } catch (error) {
        next({
            error,
            message: "Unable to retrieve the posts for the given author.",
        });
    }
};

// Search posts by keyword
export const searchPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { q: query } = req.query;
        
        if (!query || typeof query !== 'string') {
            return res.status(400).json({ message: "Search query is required" });
        }

        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query,
                        },
                    },
                    {
                        content: {
                            contains: query,
                        },
                    },
                    {
                        preview: {
                            contains: query,
                        },
                    },
                ],
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        avatar: true,
                    },
                },
                comments: true,
                likes: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Parse tags for each post
        const postsWithParsedTags = posts.map(post => ({
            ...post,
            tags: (post as any).tags ? JSON.parse((post as any).tags) : []
        }));

        res.json(postsWithParsedTags);
    } catch (error) {
        next({ error, message: "Unable to search posts" });
    }
};
