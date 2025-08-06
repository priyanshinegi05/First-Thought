import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";
import { sendNewsletterSubscriptionEmail, sendUnsubscribeConfirmationEmail } from "../utils/emailService";

// Subscribe to newsletter
export const subscribeToNewsletter = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address",
            });
        }

        // Check if email already exists in newsletter subscriptions
        const existingSubscription = await prisma.newsletterSubscription.findUnique({
            where: { email },
        });

        let subscription;

        if (existingSubscription) {
            if (existingSubscription.isActive) {
                return res.status(400).json({
                    success: false,
                    message: "This email is already subscribed to our newsletter",
                });
            } else {
                // Reactivate existing subscription
                subscription = await prisma.newsletterSubscription.update({
                    where: { email },
                    data: { isActive: true },
                });
            }
        } else {
            // Create new newsletter subscription
            subscription = await prisma.newsletterSubscription.create({
                data: {
                    email,
                    isActive: true,
                },
            });
        }

        // Send welcome email for newsletter subscription
        try {
            await sendNewsletterSubscriptionEmail(email);
        } catch (emailError) {
            console.error('Failed to send newsletter subscription email:', emailError);
            // Don't fail the request if email fails
        }

        res.status(201).json({
            success: true,
            message: "Successfully subscribed to newsletter",
            data: {
                id: subscription.id,
                email: subscription.email,
            },
        });
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        next(error);
    }
};

// Unsubscribe from newsletter
export const unsubscribeFromNewsletter = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        // Find and update subscription
        const subscription = await prisma.newsletterSubscription.findUnique({
            where: { email },
        });

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Email not found in newsletter subscriptions",
            });
        }

        await prisma.newsletterSubscription.update({
            where: { email },
            data: { isActive: false },
        });

        // Send unsubscribe confirmation email
        try {
            await sendUnsubscribeConfirmationEmail(email);
        } catch (emailError) {
            console.error('Failed to send unsubscribe confirmation email:', emailError);
            // Don't fail the request if email fails
        }

        res.status(200).json({
            success: true,
            message: "Successfully unsubscribed from newsletter",
        });
    } catch (error) {
        console.error("Newsletter unsubscription error:", error);
        next(error);
    }
};

// Check newsletter subscription status
export const checkNewsletterStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.query;

        if (!email || typeof email !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Email parameter is required",
            });
        }

        const subscription = await prisma.newsletterSubscription.findUnique({
            where: { email },
        });

        res.status(200).json({
            success: true,
            isSubscribed: subscription?.isActive || false,
        });
    } catch (error) {
        console.error("Check newsletter status error:", error);
        next(error);
    }
};

// Get all newsletter subscriptions (admin only)
export const getAllNewsletterSubscriptions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const subscriptions = await prisma.newsletterSubscription.findMany({
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    } catch (error) {
        console.error("Get newsletter subscriptions error:", error);
        next(error);
    }
}; 