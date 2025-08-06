import express from "express";
import { createComment, getPostComments, deleteComment } from "../controllers/comments";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createComment);
router.get("/:postId", getPostComments);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
