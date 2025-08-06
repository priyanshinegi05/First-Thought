import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { generateJwtToken } from "../utils/generateJwtToken";
import prisma from "../config/prisma";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log("Registration request received:", req.body);
    console.log("File uploaded:", req.file);
    console.log("Image URL:", req.image);
    
    const registeringUser = req.body;
    if (
        !registeringUser.username ||
        !registeringUser.password ||
        !registeringUser.fullName
    ) {
        return res
            .status(400)
            .json({
                message: "Username, password, and full name are required.",
            });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            username: registeringUser.username,
        },
    });
    if (existingUser) {
        return res
            .status(409)
            .json({ message: "User with the given username already exists." });
    }

    try {
        const hashedPassword = await bcrypt.hash(registeringUser.password, 10);
        console.log("Password hashed successfully");
        
        const newUser = await prisma.user.create({
            data: {
                ...registeringUser,
                avatar: req.image,
                password: hashedPassword,
            },
            select: {
                id: true,
                username: true,
                fullName: true,
                email: true,
                bio: true,
                avatar: true,
                topicsOfInterest: true
            }
        });
        console.log("User created successfully:", newUser.id);
        
        const token = generateJwtToken(
            newUser.id,
            process.env.TOKEN_SECRET || "",
            "1d",
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only secure in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({ user: newUser });
    } catch (error) {
        console.error("Registration error:", error);
        next({
            error,
            message: "Unable to sign up the user with given credentials.",
        });
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log("Login request received:", req.body);
    try {
        const { username, password: userPassword } = req.body;
        if (!username || !userPassword) {
            return res
                .status(400)
                .json({ message: "Username and password are required." });
        }

        console.log("Looking for user with username:", username);
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
            select: {
                id: true,
                username: true,
                fullName: true,
                email: true,
                bio: true,
                avatar: true,
                topicsOfInterest: true,
                password: true
            }
        });
        console.log("User found:", user ? "Yes" : "No");
        
        if (!user) {
            return res.status(404).json({ message: "Invalid username." });
        }

        console.log("Comparing passwords...");
        const isPasswordCorrect = await bcrypt.compare(
            userPassword,
            user.password,
        );
        console.log("Password correct:", isPasswordCorrect);
        
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password." });
        }

        console.log("Generating JWT token...");
        console.log("TOKEN_SECRET exists:", !!process.env.TOKEN_SECRET);
        console.log("TOKEN_SECRET length:", process.env.TOKEN_SECRET?.length);
        const token = generateJwtToken(
            user.id,
            process.env.TOKEN_SECRET || "",
            "1d",
        );
        const { password, ...userWithoutPassword } = user;
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only secure in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });
        console.log("Login successful for user:", user.id);
        res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
        console.error("Login error:", error);
        next({
            error,
            message: "Unable to authenticate the user with given credentials.",
        });
    }
};

export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.sendStatus(204);
        }

        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production",
        });
        res.sendStatus(204);
    } catch (error) {
        next({ error, message: "Unable to logout" });
    }
};
