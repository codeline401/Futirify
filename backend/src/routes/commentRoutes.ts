import { requireAuth } from "@clerk/express";
import { Router } from "express";
import { addComment, deleteComment } from "../controllers/commentController";

const router = Router();

// POST api/comments/:productId - Add comments to product (protected)
router.post("/:productId", requireAuth(), addComment);

router.delete("/:commentId", requireAuth(), deleteComment);

export default router;
