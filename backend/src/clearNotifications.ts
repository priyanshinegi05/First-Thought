import prisma from "./config/prisma";

const clearNotifications = async () => {
    try {
        await prisma.notification.deleteMany();
        console.log("All notifications cleared successfully");
    } catch (error) {
        console.error("Error clearing notifications:", error);
    } finally {
        await prisma.$disconnect();
    }
};

clearNotifications(); 