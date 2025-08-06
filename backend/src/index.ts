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
import { errorMiddleware } from "./middleware/errorMiddleware";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.FRONTEND_SERVER_PROD || "",
    ],
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

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Catch all handler: send back React's index.html file for any non-API routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen({ address: "0.0.0.0", port: PORT }, () => {
    console.log(`Server running on port: ${PORT}`);
});
