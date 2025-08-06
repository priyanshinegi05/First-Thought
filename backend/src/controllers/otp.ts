import { Request, Response, NextFunction } from "express";
import { generateOTP, storeOTP, verifyOTP, sendOTPEmail } from "../utils/emailService";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { generateJwtToken } from "../utils/generateJwtToken";

// Send OTP for email verification
export const sendOTP = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Generate and store OTP
        const otp = generateOTP();
        storeOTP(email, otp);

        // Send OTP email
        const emailSent = await sendOTPEmail(email, otp);

        if (!emailSent) {
            return res.status(500).json({ message: "Failed to send OTP email" });
        }

        res.status(200).json({ 
            message: "OTP sent successfully",
            email: email // Return email for frontend reference
        });
    } catch (error) {
        next({ error, message: "Failed to send OTP" });
    }
};

// Verify OTP and create user
export const verifyOTPAndCreateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email, otp, username, password, fullName } = req.body;

        if (!email || !otp || !username || !password || !fullName) {
            return res.status(400).json({ 
                message: "Email, OTP, username, password, and full name are required" 
            });
        }

        // Verify OTP
        const isValidOTP = verifyOTP(email, otp);
        if (!isValidOTP) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Check if username already exists
        const existingUsername = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUsername) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user (without avatar and bio - will be set in profile setup)
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                fullName,
                bio: "", // Empty initially
                avatar: "", // Empty initially
                topicsOfInterest: "[]" // Empty initially as JSON string
            },
            select: {
                id: true,
                email: true,
                username: true,
                fullName: true,
                bio: true,
                avatar: true,
                topicsOfInterest: true
            }
        });

        // Generate JWT token for the newly created user
        const token = generateJwtToken(
            user.id,
            process.env.TOKEN_SECRET || "",
            "1d",
        );

        // Set JWT cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only secure in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "User created successfully",
            user,
            requiresProfileSetup: true
        });
    } catch (error) {
        next({ error, message: "Failed to verify OTP and create user" });
    }
};

// Resend OTP
export const resendOTP = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Generate and store new OTP
        const otp = generateOTP();
        storeOTP(email, otp);

        // Send new OTP email
        const emailSent = await sendOTPEmail(email, otp);

        if (!emailSent) {
            return res.status(500).json({ message: "Failed to send OTP email" });
        }

        res.status(200).json({ 
            message: "OTP resent successfully",
            email: email
        });
    } catch (error) {
        next({ error, message: "Failed to resend OTP" });
    }
}; 