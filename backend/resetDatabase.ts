import prisma from "./src/config/prisma";

async function resetDatabase() {
    try {
        console.log("Starting database reset...");
        
        // Delete all data in the correct order to avoid foreign key constraints
        console.log("Deleting notifications...");
        await prisma.notification.deleteMany();
        
        console.log("Deleting saved posts...");
        await prisma.savedPost.deleteMany();
        
        console.log("Deleting likes...");
        await prisma.like.deleteMany();
        
        console.log("Deleting comments...");
        await prisma.comment.deleteMany();
        
        console.log("Deleting posts...");
        await prisma.post.deleteMany();
        
        console.log("Deleting users...");
        await prisma.user.deleteMany();
        
        console.log("Database reset completed successfully!");
        
    } catch (error) {
        console.error("Error resetting database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

resetDatabase(); 