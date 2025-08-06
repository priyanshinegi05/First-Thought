import express from "express";
import { savePost, unsavePost, getSavedPosts, checkIfPostSaved } from "../controllers/savedPosts";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, savePost);
router.delete("/:postId", authMiddleware, unsavePost);
router.get("/", authMiddleware, getSavedPosts);
router.get("/check/:postId", authMiddleware, checkIfPostSaved);

export default router; 