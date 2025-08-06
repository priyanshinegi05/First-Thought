import prisma from "./src/config/prisma";

async function testDelete() {
    try {
        console.log("Testing user deletion...");
        
        // First, let's see what users exist
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true
            }
        });
        
        console.log("Current users:");
        users.forEach(user => {
            console.log(`- ${user.username} (${user.email})`);
        });
        
        if (users.length === 0) {
            console.log("No users found to delete");
            return;
        }
        
        // Try to delete the first user
        const userToDelete = users[0];
        console.log(`\nAttempting to delete user: ${userToDelete.username}`);
        
        // Check related data first
        const relatedData = await prisma.user.findUnique({
            where: { id: userToDelete.id },
            include: {
                posts: true,
                likes: true,
                comments: true,
                savedPosts: true,
                notifications: true,
                sentNotifications: true
            }
        });
        
        console.log(`Related data for ${userToDelete.username}:`);
        console.log(`- Posts: ${relatedData?.posts.length || 0}`);
        console.log(`- Likes: ${relatedData?.likes.length || 0}`);
        console.log(`- Comments: ${relatedData?.comments.length || 0}`);
        console.log(`- Saved Posts: ${relatedData?.savedPosts.length || 0}`);
        console.log(`- Notifications: ${relatedData?.notifications.length || 0}`);
        console.log(`- Sent Notifications: ${relatedData?.sentNotifications.length || 0}`);
        
        // Try to delete
        const deletedUser = await prisma.user.delete({
            where: { id: userToDelete.id }
        });
        
        console.log(`\n✅ Successfully deleted user: ${deletedUser.username}`);
        
    } catch (error: any) {
        console.error("❌ Error deleting user:", error);
        console.error("Error details:", {
            code: error?.code,
            message: error?.message,
            meta: error?.meta
        });
    } finally {
        await prisma.$disconnect();
    }
}

testDelete(); 