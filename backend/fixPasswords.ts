import bcrypt from "bcryptjs";
import prisma from "./src/config/prisma";

async function fixPasswords() {
    try {
        console.log("Starting password fix process...");
        
        // Get all users
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                password: true,
                email: true
            }
        });
        
        console.log(`Found ${users.length} users`);
        
        for (const user of users) {
            // Check if password is already hashed (bcrypt hashes start with $2a$ or $2b$)
            const isAlreadyHashed = user.password.startsWith('$2a$') || user.password.startsWith('$2b$');
            
            if (!isAlreadyHashed) {
                console.log(`Fixing password for user: ${user.username} (${user.email})`);
                
                // Hash the plain text password
                const hashedPassword = await bcrypt.hash(user.password, 10);
                
                // Update the user with hashed password
                await prisma.user.update({
                    where: { id: user.id },
                    data: { password: hashedPassword }
                });
                
                console.log(`Password fixed for user: ${user.username}`);
            } else {
                console.log(`Password already hashed for user: ${user.username}`);
            }
        }
        
        console.log("Password fix process completed!");
    } catch (error) {
        console.error("Error fixing passwords:", error);
    } finally {
        await prisma.$disconnect();
    }
}

fixPasswords(); 