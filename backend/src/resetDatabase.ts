import prisma from "./config/prisma";

const resetDatabase = async () => {
    try {
        console.log("Starting database reset...");

        // Delete all data in the correct order (respecting foreign key constraints)
        console.log("Deleting notifications...");
        await prisma.notification.deleteMany();

        console.log("Deleting likes...");
        await prisma.like.deleteMany();

        console.log("Deleting comments...");
        await prisma.comment.deleteMany();

        console.log("Deleting saved posts...");
        await prisma.savedPost.deleteMany();

        console.log("Deleting posts...");
        await prisma.post.deleteMany();

        console.log("Deleting users...");
        await prisma.user.deleteMany();

        console.log("Database reset complete!");

        // Create 2 users
        console.log("Creating 2 users...");

        const user1 = await prisma.user.create({
            data: {
                username: "priyanshi",
                fullName: "Priyanshi Negi",
                password: "$2a$10$example.hash.for.password",
                bio: "A passionate writer and developer",
                avatar: null,
            },
        });

        const user2 = await prisma.user.create({
            data: {
                username: "demo_user",
                fullName: "Demo User",
                password: "$2a$10$example.hash.for.password",
                bio: "A demo user for testing",
                avatar: null,
            },
        });

        console.log("Created users:");
        console.log(`- ${user1.fullName} (${user1.username})`);
        console.log(`- ${user2.fullName} (${user2.username})`);

        console.log("\n=== Database Reset Complete ===");
        console.log("Total users: 2");
        console.log("All other data cleared");
        console.log("================================");

    } catch (error) {
        console.error("Error resetting database:", error);
    } finally {
        await prisma.$disconnect();
    }
};

// Run the reset
resetDatabase(); 