import { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

// POST - (protected)
export const addComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return res.status(401).json({ error: "Need access to add comment" });

    const { productId } = req.params;
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Comment content is required" });
    }

    // verify product exists
    const product = await queries.getProductById(productId as string);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const comment = await queries.createComments({
      content,
      userId,
      productId: productId as string,
    });
    res.status(200).json(comment);
  } catch (error) {
    console.error("Error to add comment", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { commentId } = req.params;
    const existingComments = await queries.getCommentById(commentId as string);
    if (!existingComments || existingComments.length === 0) {
      res.status(401).json({ error: "Comment not found" });
    }

    const existingComment = existingComments[0];
    if ((existingComment.userId as string) !== userId) {
      res.status(404).json({ error: "You can only delete your own comment" });
    }

    await queries.deleteComments(commentId as string);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error to delete comment", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
