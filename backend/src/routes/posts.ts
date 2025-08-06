import {
    getAllPosts,
    getSinglePost,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost,
    searchPosts,
} from "../controllers/posts";
import { authMiddleware } from "../middleware/authMiddleware";
import { upload } from "../middleware/multerMiddleware";
import express from "express";
import { fileUploadMiddleware } from "../middleware/fileUploadMiddleware";

const router = express.Router();
router.get("/search", searchPosts); // Remove auth requirement for search
router.get("/", authMiddleware, getAllPosts);
router.get("/:id", authMiddleware, getSinglePost);
router.get("/author/:id", authMiddleware, getPostsByAuthor);
router.post(
    "/",
    authMiddleware,
    upload.single("postImg"),
    fileUploadMiddleware,
    createPost,
);
router.patch(
    "/:id",
    authMiddleware,
    upload.single("postImg"),
    fileUploadMiddleware,
    updatePost,
);
router.delete("/:id", authMiddleware, deletePost);

export default router;
