import nodemailer from 'nodemailer';

// OTP storage (in production, use Redis or database)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Generate OTP
export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP
export const storeOTP = (email: string, otp: string): void => {
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    otpStore.set(email, { otp, expiresAt });
};

// Verify OTP
export const verifyOTP = (email: string, otp: string): boolean => {
    const storedData = otpStore.get(email);
    if (!storedData) return false;
    
    if (Date.now() > storedData.expiresAt) {
        otpStore.delete(email);
        return false;
    }
    
    if (storedData.otp === otp) {
        otpStore.delete(email);
        return true;
    }
    
    return false;
};

// Send OTP email
export const sendOTPEmail = async (email: string, otp: string): Promise<boolean> => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: email,
            subject: 'Verify Your Email - First Thought',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #f0f9f4 0%, #e8f5e8 100%); padding: 20px; text-align: center;">
                        <h1 style="color: #1A8917; margin: 0; font-family: 'Dancing Script', cursive;">First Thought</h1>
                    </div>
                    <div style="padding: 30px; background: #ffffff;">
                        <h2 style="color: #2c3e50; margin-bottom: 20px;">Verify Your Email Address</h2>
                        <p style="color: #6B6B6B; line-height: 1.6; margin-bottom: 25px;">
                            Thank you for signing up for First Thought! To complete your registration, please enter the verification code below:
                        </p>
                        <div style="background: #f8faf8; padding: 20px; text-align: center; border-radius: 8px; margin: 25px 0;">
                            <h1 style="color: #1A8917; font-size: 32px; letter-spacing: 8px; margin: 0; font-family: monospace;">${otp}</h1>
                        </div>
                        <p style="color: #6B6B6B; font-size: 14px; margin-top: 25px;">
                            This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
                        </p>
                        <hr style="border: none; border-top: 1px solid #e1e1e1; margin: 30px 0;">
                        <p style="color: #95a5a6; font-size: 12px; text-align: center;">
                            First Thought - A modern blogging platform
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

// Clean up expired OTPs
export const cleanupExpiredOTPs = (): void => {
    const now = Date.now();
    for (const [email, data] of otpStore.entries()) {
        if (now > data.expiresAt) {
            otpStore.delete(email);
        }
    }
};

// Send welcome email
export const sendWelcomeEmail = async (email: string, fullName: string, username: string, topicsOfInterest: string[]): Promise<boolean> => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: email,
            subject: 'Welcome to First Thought!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
                    <!-- Simple header -->
                    <div style="background: #1A8917; padding: 40px 20px; text-align: center; color: white;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: 600;">
                            Welcome to First Thought
                        </h1>
                        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                            Your voice matters here
                        </p>
                    </div>

                    <!-- Main content -->
                    <div style="padding: 40px 30px;">
                        <h2 style="color: #2c3e50; margin-bottom: 20px; font-size: 22px;">
                            Hi ${fullName},
                        </h2>
                        
                        <p style="color: #6B6B6B; line-height: 1.6; font-size: 16px; margin-bottom: 25px;">
                            Thank you for joining First Thought. We're excited to have you as part of our community where people share ideas, stories, and perspectives that matter.
                        </p>

                        <p style="color: #6B6B6B; line-height: 1.6; font-size: 16px; margin-bottom: 25px;">
                            Your profile is ready, and you can start writing whenever you feel inspired. Whether you want to share your thoughts, experiences, or insights, this is your space to be heard.
                        </p>

                        ${topicsOfInterest.length > 0 ? `
                            <div style="background: #f8faf8; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <p style="margin: 0 0 10px 0; color: #2c3e50; font-weight: 600;">
                                    We noticed you're interested in:
                                </p>
                                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                                    ${topicsOfInterest.map(topic => `
                                        <span style="background: #1A8917; color: white; padding: 4px 10px; border-radius: 15px; font-size: 12px;">
                                            ${topic}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <div style="text-align: center; margin: 40px 0;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
                               style="background: #1A8917; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
                                Start Writing
                            </a>
                        </div>

                        <p style="color: #6B6B6B; line-height: 1.6; font-size: 14px; margin-top: 30px;">
                            Happy writing!<br>
                            The First Thought Team
                        </p>
                    </div>

                    <!-- Simple footer -->
                    <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #6B6B6B;">
                        <p style="margin: 0; font-size: 12px;">
                            First Thought - A place for meaningful conversations
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent successfully to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return false;
    }
};

// Send newsletter subscription email
export const sendNewsletterSubscriptionEmail = async (email: string): Promise<boolean> => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: email,
            subject: 'Thank you for subscribing to our newsletter!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
                    <!-- Header -->
                    <div style="background: #1A8917; padding: 30px 20px; text-align: center; color: white;">
                        <h1 style="margin: 0; font-size: 24px; font-weight: 600;">
                            First Thought
                        </h1>
                        <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">
                            Thank you for subscribing!
                        </p>
                    </div>

                    <!-- Main content -->
                    <div style="padding: 30px;">
                        <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">
                            You're all set!
                        </h2>
                        
                        <p style="color: #6B6B6B; line-height: 1.6; font-size: 15px; margin-bottom: 20px;">
                            Thank you for subscribing to our newsletter. We're excited to share the latest stories, writing tips, and community updates with you.
                        </p>

                        <div style="background: #f8faf8; padding: 15px; border-radius: 6px; margin: 20px 0;">
                            <p style="margin: 0; color: #6B6B6B; font-size: 14px;">
                                You'll receive our newsletter weekly with curated content from our community.
                            </p>
                        </div>

                        <div style="text-align: center; margin: 25px 0;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
                               style="background: #1A8917; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px; font-weight: 500; display: inline-block; font-size: 14px;">
                                Visit First Thought
                            </a>
                        </div>

                        <p style="color: #6B6B6B; line-height: 1.6; font-size: 13px; margin-top: 20px;">
                            Best regards,<br>
                            The First Thought Team
                        </p>
                    </div>

                    <!-- Footer -->
                    <div style="background: #f8f9fa; padding: 15px; text-align: center; color: #6B6B6B;">
                        <p style="margin: 0; font-size: 11px;">
                            First Thought - A place for meaningful conversations
                        </p>
                        <p style="margin: 8px 0 0 0; font-size: 10px;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/newsletter/unsubscribe?email=${encodeURIComponent(email)}" 
                               style="color: #1A8917; text-decoration: none;">
                                Unsubscribe from this newsletter
                            </a>
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Newsletter subscription email sent successfully to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending newsletter subscription email:', error);
        return false;
    }
};

// Send unsubscribe confirmation email
export const sendUnsubscribeConfirmationEmail = async (email: string): Promise<boolean> => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: email,
            subject: 'You have been unsubscribed from First Thought newsletter',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
                    <!-- Header -->
                    <div style="background: #f8f9fa; padding: 25px 20px; text-align: center; color: #6B6B6B;">
                        <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #2c3e50;">
                            First Thought
                        </h1>
                    </div>

                    <!-- Main content -->
                    <div style="padding: 25px;">
                        <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 18px;">
                            Unsubscription Confirmed
                        </h2>
                        
                        <p style="color: #6B6B6B; line-height: 1.6; font-size: 14px; margin-bottom: 20px;">
                            You have been successfully unsubscribed from our newsletter. We're sorry to see you go!
                        </p>

                        <div style="background: #f8faf8; padding: 15px; border-radius: 6px; margin: 20px 0;">
                            <p style="margin: 0; color: #6B6B6B; font-size: 13px;">
                                You will no longer receive our weekly newsletters. If you change your mind, you can always resubscribe by visiting our website.
                            </p>
                        </div>

                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
                               style="background: #1A8917; color: white; padding: 8px 20px; text-decoration: none; border-radius: 4px; font-weight: 500; display: inline-block; font-size: 13px;">
                                Visit First Thought
                            </a>
                        </div>

                        <p style="color: #6B6B6B; line-height: 1.6; font-size: 12px; margin-top: 15px;">
                            Best regards,<br>
                            The First Thought Team
                        </p>
                    </div>

                    <!-- Footer -->
                    <div style="background: #f8f9fa; padding: 12px; text-align: center; color: #6B6B6B;">
                        <p style="margin: 0; font-size: 10px;">
                            First Thought - A place for meaningful conversations
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Unsubscribe confirmation email sent successfully to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending unsubscribe confirmation email:', error);
        return false;
    }
};

// Run cleanup every 5 minutes
setInterval(cleanupExpiredOTPs, 5 * 60 * 1000); 