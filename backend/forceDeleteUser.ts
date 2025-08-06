import prisma from "./src/config/prisma";

async function forceDeleteUser(username: string) {
    try {
        console.log(`🔍 Looking for user: ${username}`);
        
        // Find the user first
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
            console.log(`❌ User '${username}' not found`);
            return;
        }

        console.log(`✅ Found user: ${user.username} (${user.email})`);
        console.log(`📊 Related data:`);
        console.log(`   - Posts: ${user.posts.length}`);
        console.log(`   - Likes: ${user.likes.length}`);
        console.log(`   - Comments: ${user.comments.length}`);
        console.log(`   - Saved Posts: ${user.savedPosts.length}`);
        console.log(`   - Notifications: ${user.notifications.length}`);
        console.log(`   - Sent Notifications: ${user.sentNotifications.length}`);

        // Try cascade deletion first
        console.log(`\n🔄 Attempting cascade deletion...`);
        try {
            const deletedUser = await prisma.user.delete({
                where: { username }
            });
            console.log(`✅ Successfully deleted user: ${deletedUser.username}`);
            console.log(`✅ Cascade deletion worked! All related data was automatically removed.`);
            return;
        } catch (cascadeError: any) {
            console.log(`⚠️  Cascade deletion failed: ${cascadeError.message}`);
            console.log(`🔄 Attempting manual deletion...`);
        }

        // Manual deletion if cascade fails
        console.log(`\n🔧 Starting manual deletion process...`);
        
        // Delete in correct order to avoid foreign key constraints
        const transaction = await prisma.$transaction(async (tx) => {
            console.log(`   - Deleting notifications...`);
            await tx.notification.deleteMany({
                where: {
                    OR: [
                        { userId: user.id },
                        { fromUserId: user.id }
                    ]
                }
            });

            console.log(`   - Deleting saved posts...`);
            await tx.savedPost.deleteMany({
                where: { userId: user.id }
            });

            console.log(`   - Deleting likes...`);
            await tx.like.deleteMany({
                where: { userId: user.id }
            });

            console.log(`   - Deleting comments...`);
            await tx.comment.deleteMany({
                where: { authorId: user.id }
            });

            console.log(`   - Deleting posts...`);
            await tx.post.deleteMany({
                where: { authorId: user.id }
            });

            console.log(`   - Deleting user...`);
            const deletedUser = await tx.user.delete({
                where: { id: user.id }
            });

            return deletedUser;
        });

        console.log(`✅ Successfully deleted user: ${transaction.username}`);
        console.log(`✅ Manual deletion completed! All related data was removed.`);

    } catch (error: any) {
        console.error(`❌ Error during force deletion:`, error);
        console.error(`   Error Code: ${error.code}`);
        console.error(`   Error Message: ${error.message}`);
        
        if (error.meta) {
            console.error(`   Error Meta: ${JSON.stringify(error.meta)}`);
        }
    } finally {
        await prisma.$disconnect();
    }
}

// Get username from command line arguments
const username = process.argv[2];
if (!username) {
    console.log("❌ Please provide a username to delete");
    console.log("Usage: npx ts-node forceDeleteUser.ts <username>");
    process.exit(1);
}

forceDeleteUser(username); 