import prisma from "./config/prisma";
import { randUser, randTextRange } from "@ngneat/falso";

const POST_ID = "cmdvng7b4000cw8ss576kfj53"; // Your specific post ID

const seedDemoData = async () => {
    try {
        console.log("Starting to seed demo data for post:", POST_ID);

        // First, check if the post exists
        const post = await prisma.post.findUnique({
            where: { id: POST_ID },
            include: { author: true }
        });

        if (!post) {
            console.error("Post not found with ID:", POST_ID);
            return;
        }

        console.log("Found post:", post.title);
        console.log("Post author:", post.author.fullName);

        // Get all users except the post author
        const users = await prisma.user.findMany({
            where: {
                id: { not: post.authorId }
            }
        });

        if (users.length === 0) {
            console.error("No users found to create likes/comments");
            return;
        }

        console.log(`Found ${users.length} users to create demo data`);

        // Create demo likes (5-10 likes from different users)
        const numLikes = Math.min(8, users.length);
        const usersForLikes = users.slice(0, numLikes);

        console.log(`Creating ${numLikes} likes...`);

        for (const user of usersForLikes) {
            try {
                await prisma.like.create({
                    data: {
                        postId: POST_ID,
                        userId: user.id,
                    }
                });

                // Create notification for the post author
                await prisma.notification.create({
                    data: {
                        type: "like",
                        message: `${user.fullName || user.username} liked your post "${post.title}"`,
                        userId: post.authorId,
                        postId: POST_ID,
                        fromUserId: user.id,
                    }
                });

                console.log(`Created like from user: ${user.fullName}`);
            } catch (error) {
                console.log(`Like already exists for user: ${user.fullName}`);
            }
        }

        // Create demo comments (3-5 comments from different users)
        const numComments = Math.min(5, users.length - numLikes);
        const usersForComments = users.slice(numLikes, numLikes + numComments);

        console.log(`Creating ${numComments} comments...`);

        const demoComments = [
            "Great post! Really enjoyed reading this.",
            "This is very insightful, thanks for sharing!",
            "I learned a lot from this article.",
            "Excellent content, keep it up!",
            "This resonates with me a lot.",
            "Thanks for the valuable information!",
            "Well written and informative!",
            "I'll definitely share this with others."
        ];

        for (let i = 0; i < numComments; i++) {
            const user = usersForComments[i];
            const commentText = demoComments[i] || randTextRange({ min: 20, max: 50 });

            try {
                await prisma.comment.create({
                    data: {
                        content: commentText,
                        postId: POST_ID,
                        authorId: user.id,
                    }
                });

                // Create notification for the post author
                await prisma.notification.create({
                    data: {
                        type: "comment",
                        message: `${user.fullName || user.username} commented "${commentText}" on your post "${post.title}"`,
                        userId: post.authorId,
                        postId: POST_ID,
                        fromUserId: user.id,
                    }
                });

                console.log(`Created comment from user: ${user.fullName}`);
            } catch (error) {
                console.log(`Error creating comment for user: ${user.fullName}`, error);
            }
        }

        // Update the post's likes count
        const totalLikes = await prisma.like.count({
            where: { postId: POST_ID }
        });

        await prisma.post.update({
            where: { id: POST_ID },
            data: { likesNumber: totalLikes }
        });

        console.log(`Updated post likes count to: ${totalLikes}`);

        // Get final counts
        const finalLikesCount = await prisma.like.count({
            where: { postId: POST_ID }
        });

        const finalCommentsCount = await prisma.comment.count({
            where: { postId: POST_ID }
        });

        const notificationsCount = await prisma.notification.count({
            where: { postId: POST_ID }
        });

        console.log("\n=== Demo Data Seeding Complete ===");
        console.log(`Post: ${post.title}`);
        console.log(`Total likes: ${finalLikesCount}`);
        console.log(`Total comments: ${finalCommentsCount}`);
        console.log(`Total notifications created: ${notificationsCount}`);
        console.log("=====================================");

    } catch (error) {
        console.error("Error seeding demo data:", error);
    } finally {
        await prisma.$disconnect();
    }
};

// Run the seeding
seedDemoData(); 