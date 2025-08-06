import { sendWelcomeEmail } from "./src/utils/emailService";

async function testWelcomeEmail() {
    try {
        console.log("Testing welcome email...");
        
        const testEmail = "test@example.com";
        const testName = "John Doe";
        const testUsername = "johndoe";
        const testTopics = ["Technology", "Science", "Health"];
        
        const result = await sendWelcomeEmail(testEmail, testName, testUsername, testTopics);
        
        if (result) {
            console.log("✅ Welcome email sent successfully!");
        } else {
            console.log("❌ Failed to send welcome email");
        }
    } catch (error) {
        console.error("❌ Error testing welcome email:", error);
    }
}

testWelcomeEmail(); 