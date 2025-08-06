import express from "express";
import {
    subscribeToNewsletter,
    unsubscribeFromNewsletter,
    getAllNewsletterSubscriptions,
    checkNewsletterStatus,
} from "../controllers/newsletter";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.post("/subscribe", subscribeToNewsletter);
router.post("/unsubscribe", unsubscribeFromNewsletter);
router.get("/check-status", checkNewsletterStatus);

// Protected routes (admin only)
router.get("/subscriptions", authMiddleware, getAllNewsletterSubscriptions);

export default router; 