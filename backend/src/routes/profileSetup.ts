import express from "express";
import { updateProfile, getProfileForSetup } from "../controllers/profileSetup";

const router = express.Router();

// Get user profile for setup
router.get("/:userId", getProfileForSetup);

// Update user profile
router.put("/:userId", updateProfile);

export default router; 