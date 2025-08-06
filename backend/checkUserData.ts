import prisma from "./src/config/prisma";

async function checkUserData() {
    try {
        console.log("Checking user data and relationships...");
        
        // Get all users
        const users = await prisma.user.findMany({
            include: {
                posts: true,
                likes: true,
                comments: true,
                savedPosts: true,
                notifications: true,
                sentNotifications: true
            }
        });
        
        console.log(`Found ${users.length} users:`);
        
        for (const user of users) {
            console.log(`\nUser: ${user.username} (${user.email})`);
            console.log(`  - Posts: ${user.posts.length}`);
            console.log(`  - Likes: ${user.likes.length}`);
            console.log(`  - Comments: ${user.comments.length}`);
            console.log(`  - Saved Posts: ${user.savedPosts.length}`);
            console.log(`  - Notifications: ${user.notifications.length}`);
            console.log(`  - Sent Notifications: ${user.sentNotifications.length}`);
        }
        
        // Check total counts for each table
        const totalLikes = await prisma.like.count();
        const totalComments = await prisma.comment.count();
        const totalPosts = await prisma.post.count();
        const totalSavedPosts = await prisma.savedPost.count();
        const totalNotifications = await prisma.notification.count();
        
        console.log(`\nTotal records in database:`);
        console.log(`  - Total likes: ${totalLikes}`);
        console.log(`  - Total comments: ${totalComments}`);
        console.log(`  - Total posts: ${totalPosts}`);
        console.log(`  - Total saved posts: ${totalSavedPosts}`);
        console.log(`  - Total notifications: ${totalNotifications}`);
        
    } catch (error) {
        console.error("Error checking user data:", error);
    } finally {
        await prisma.$disconnect();
    }
}

checkUserData(); 