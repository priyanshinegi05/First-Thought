import jwt from "jsonwebtoken";
import { generateJwtToken } from "./src/utils/generateJwtToken";

async function testAuth() {
    try {
        console.log("Testing JWT token generation...");
        
        const userId = "test_user_id";
        const secret = process.env.TOKEN_SECRET || "fallback_secret";
        
        console.log("TOKEN_SECRET exists:", !!process.env.TOKEN_SECRET);
        console.log("TOKEN_SECRET length:", process.env.TOKEN_SECRET?.length);
        
        // Test token generation
        const token = generateJwtToken(userId, secret, "1d");
        console.log("Generated token:", token);
        
        // Test token verification
        const decoded = jwt.verify(token, secret);
        console.log("Decoded token:", decoded);
        
        console.log("✅ JWT token generation and verification working correctly!");
        
    } catch (error) {
        console.error("❌ Error testing auth:", error);
    }
}

testAuth(); 