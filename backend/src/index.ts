import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
console.log("Environment variables loaded:");
console.log("PORT:", process.env.PORT);
console.log("TOKEN_SECRET exists:", !!process.env.TOKEN_SECRET);
console.log("TOKEN_SECRET length:", process.env.TOKEN_SECRET?.length);
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRoutes from "./routes/users";
import postsRoutes from "./routes/posts";
import authRoutes from "./routes/auth";
import likesRoutes from "./routes/likes";
import commentsRoutes from "./routes/comments";
import savedPostsRoutes from "./routes/savedPosts";
import notificationsRoutes from "./routes/notifications";
import otpRoutes from "./routes/otp";
import profileSetupRoutes from "./routes/profileSetup";
import newsletterRoutes from "./routes/newsletter";
import path from "path";
import fs from "fs";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { v2 as cloudinary } from "cloudinary";


const app = express();
const PORT = process.env.PORT || 3000;

// Increase body size limit to 10mb for JSON and URL-encoded data
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Allow main frontend origin and Netlify deploy previews
const allowedOrigins = new Set([
    "http://localhost:5173",
    "http://localhost:4173",
    process.env.FRONTEND_SERVER_PROD || "",
]);
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.has(origin)) return callback(null, true);
        // Allow any Netlify *.netlify.app (including unique deploy subdomains)
        if (/^https?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*\.netlify\.app$/i.test(origin)) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
};
app.use(cors(corsOptions));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/uploads/", express.static(path.join(process.cwd(), "/uploads/")));
app.use("/posts", postsRoutes);
app.use("/posts", likesRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/comments", commentsRoutes);
app.use("/saved-posts", savedPostsRoutes);
app.use("/notifications", notificationsRoutes);
app.use("/otp", otpRoutes);
app.use("/profile-setup", profileSetupRoutes);
app.use("/newsletter", newsletterRoutes);

app.use(errorMiddleware);

// Serve frontend only if the built files are present (useful locally or when co-deployed)
const frontendDistPath = path.join(__dirname, "../../frontend/dist");
const frontendIndexPath = path.join(frontendDistPath, "index.html");
if (fs.existsSync(frontendIndexPath)) {
    app.use(express.static(frontendDistPath));
    app.get("*", (req: express.Request, res: express.Response) => {
        res.sendFile(frontendIndexPath);
    });
} else {
    // Minimal root handler so platform health checks succeed when frontend isn't bundled
    app.get("/", (req: express.Request, res: express.Response) => {
        res.status(200).send("API is running");
    });
}

app.listen({ address: "0.0.0.0", port: PORT }, () => {
    console.log(`Server running on port: ${PORT}`);
});
