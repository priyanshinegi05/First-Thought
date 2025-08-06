import prisma from "./src/config/prisma";

async function deleteUser(username: string) {
    try {
        console.log(`Attempting to delete user: ${username}`);
        
        // First, find the user
        const user = await prisma.user.findUnique({
            where: { username },
            include: {
                posts: true,
                likes: true,
                comments: true,
                savedPosts: true,
                notifications: true,
                sentNotifications: true
            }
        });
        
        if (!user) {
            console.log(`User ${username} not found`);
            return;
        }
        
        console.log(`Found user: ${user.username} (${user.email})`);
        console.log(`  - Posts: ${user.posts.length}`);
        console.log(`  - Likes: ${user.likes.length}`);
        console.log(`  - Comments: ${user.comments.length}`);
        console.log(`  - Saved Posts: ${user.savedPosts.length}`);
        console.log(`  - Notifications: ${user.notifications.length}`);
        console.log(`  - Sent Notifications: ${user.sentNotifications.length}`);
        
        // Delete user (this should cascade to all related records)
        const deletedUser = await prisma.user.delete({
            where: { username }
        });
        
        console.log(`Successfully deleted user: ${deletedUser.username}`);
        
    } catch (error) {
        console.error("Error deleting user:", error);
        
        // If cascade deletion fails, try manual deletion
        if (error.code === 'P2003' || error.message.includes('foreign key constraint')) {
            console.log("Cascade deletion failed, trying manual deletion...");
            await deleteUserManually(username);
        }
    } finally {
        await prisma.$disconnect();
    }
}

async function deleteUserManually(username: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { username }
        });
        
        if (!user) {
            console.log(`User ${username} not found`);
            return;
        }
        
        // Delete related records manually
        console.log("Deleting related records manually...");
        
        // Delete notifications
        await prisma.notification.deleteMany({
            where: {
                OR: [
                    { userId: user.id },
                    { fromUserId: user.id }
                ]
            }
        });
        
        // Delete saved posts
        await prisma.savedPost.deleteMany({
            where: { userId: user.id }
        });
        
        // Delete likes
        await prisma.like.deleteMany({
            where: { userId: user.id }
        });
        
        // Delete comments
        await prisma.comment.deleteMany({
            where: { authorId: user.id }
        });
        
        // Delete posts (this will cascade to post-related records)
        await prisma.post.deleteMany({
            where: { authorId: user.id }
        });
        
        // Finally delete the user
        await prisma.user.delete({
            where: { username }
        });
        
        console.log(`Successfully deleted user: ${username} and all related data`);
        
    } catch (error) {
        console.error("Error in manual deletion:", error);
    }
}

// Get username from command line arguments
const username = process.argv[2];

if (!username) {
    console.log("Usage: npx ts-node deleteUser.ts <username>");
    process.exit(1);
}

deleteUser(username); 