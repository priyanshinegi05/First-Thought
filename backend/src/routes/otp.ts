import express from "express";
import { sendOTP, verifyOTPAndCreateUser, resendOTP } from "../controllers/otp";

const router = express.Router();

// Send OTP for email verification
router.post("/send", sendOTP);

// Verify OTP and create user
router.post("/verify", verifyOTPAndCreateUser);

// Resend OTP
router.post("/resend", resendOTP);

export default router; 