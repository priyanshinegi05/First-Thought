import prisma from "./src/config/prisma";

async function debugUserDeletion() {
    try {
        console.log("🔍 Debugging User Deletion Issues...\n");

        // 1. Check all users
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                fullName: true,
                _count: {
                    select: {
                        posts: true,
                        likes: true,
                        comments: true,
                        savedPosts: true,
                        notifications: true,
                        sentNotifications: true
                    }
                }
            }
        });

        console.log("📊 Current Users in Database:");
        if (users.length === 0) {
            console.log("   No users found in database");
        } else {
            users.forEach((user, index) => {
                console.log(`   ${index + 1}. ${user.username} (${user.email})`);
                console.log(`      - Posts: ${user._count.posts}`);
                console.log(`      - Likes: ${user._count.likes}`);
                console.log(`      - Comments: ${user._count.comments}`);
                console.log(`      - Saved Posts: ${user._count.savedPosts}`);
                console.log(`      - Notifications: ${user._count.notifications}`);
                console.log(`      - Sent Notifications: ${user._count.sentNotifications}`);
                console.log(`      - User ID: ${user.id}`);
                console.log("");
            });
        }

        // 2. Check total counts for each table
        const totalUsers = await prisma.user.count();
        const totalPosts = await prisma.post.count();
        const totalLikes = await prisma.like.count();
        const totalComments = await prisma.comment.count();
        const totalSavedPosts = await prisma.savedPost.count();
        const totalNotifications = await prisma.notification.count();

        console.log("📈 Database Statistics:");
        console.log(`   - Total Users: ${totalUsers}`);
        console.log(`   - Total Posts: ${totalPosts}`);
        console.log(`   - Total Likes: ${totalLikes}`);
        console.log(`   - Total Comments: ${totalComments}`);
        console.log(`   - Total Saved Posts: ${totalSavedPosts}`);
        console.log(`   - Total Notifications: ${totalNotifications}\n`);

        // 3. Check for orphaned records (using raw SQL for better compatibility)
        console.log("🔍 Checking for Orphaned Records...");
        
        // For SQLite, we'll check if there are any records with non-existent user IDs
        const allLikes = await prisma.like.findMany({
            include: { user: true }
        });
        const orphanedLikes = allLikes.filter(like => !like.user);
        
        const allComments = await prisma.comment.findMany({
            include: { author: true }
        });
        const orphanedComments = allComments.filter(comment => !comment.author);
        
        const allSavedPosts = await prisma.savedPost.findMany({
            include: { user: true }
        });
        const orphanedSavedPosts = allSavedPosts.filter(savedPost => !savedPost.user);
        
        const allNotifications = await prisma.notification.findMany({
            include: { user: true }
        });
        const orphanedNotifications = allNotifications.filter(notification => !notification.user);

        console.log(`   - Orphaned Likes: ${orphanedLikes.length}`);
        console.log(`   - Orphaned Comments: ${orphanedComments.length}`);
        console.log(`   - Orphaned Saved Posts: ${orphanedSavedPosts.length}`);
        console.log(`   - Orphaned Notifications: ${orphanedNotifications.length}\n`);

        // 4. Test deletion if users exist
        if (users.length > 0) {
            const firstUser = users[0];
            console.log(`🧪 Testing deletion for user: ${firstUser.username}`);
            
            try {
                const deletedUser = await prisma.user.delete({
                    where: { id: firstUser.id }
                });
                console.log(`✅ Successfully deleted user: ${deletedUser.username}`);
                
                // Check if related records were also deleted
                const remainingUsers = await prisma.user.count();
                const remainingPosts = await prisma.post.count();
                const remainingLikes = await prisma.like.count();
                const remainingComments = await prisma.comment.count();
                const remainingSavedPosts = await prisma.savedPost.count();
                const remainingNotifications = await prisma.notification.count();
                
                console.log("\n📊 After Deletion:");
                console.log(`   - Remaining Users: ${remainingUsers}`);
                console.log(`   - Remaining Posts: ${remainingPosts}`);
                console.log(`   - Remaining Likes: ${remainingLikes}`);
                console.log(`   - Remaining Comments: ${remainingComments}`);
                console.log(`   - Remaining Saved Posts: ${remainingSavedPosts}`);
                console.log(`   - Remaining Notifications: ${remainingNotifications}`);
                
            } catch (deleteError: any) {
                console.log(`❌ Failed to delete user: ${deleteError.message}`);
                console.log(`   Error Code: ${deleteError.code}`);
                console.log(`   Error Meta: ${JSON.stringify(deleteError.meta)}`);
            }
        }

        // 5. Provide troubleshooting tips
        console.log("\n💡 Troubleshooting Tips:");
        console.log("   1. If deletion fails in Prisma Studio, try using the deleteUser.ts script");
        console.log("   2. Make sure no other processes are accessing the database");
        console.log("   3. Check if there are any active transactions");
        console.log("   4. Try restarting Prisma Studio");
        console.log("   5. If issues persist, use the resetDatabase.ts script to clear everything");

    } catch (error) {
        console.error("❌ Error during debugging:", error);
    } finally {
        await prisma.$disconnect();
    }
}

debugUserDeletion(); 