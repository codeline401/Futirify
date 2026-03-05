import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController";
import { requireAuth } from "@clerk/express";

const router = Router();

// GET - api/products => Get all products
router.get("/", getAllProducts);

// GET - api/products/my
router.get("/my", requireAuth(), getMyProducts);

// GET /api/products/:id - Get single product by ID
router.get("/:id", getProductById);

// POST - api/products => Create a new product (protected)
router.post("/", requireAuth(), createProduct);

// PUT - api/products:id - Update product (protected - owner only)
router.put("/:id", requireAuth(), updateProduct);

// DELETE - api/delete:id - Delete product
router.delete("/:id", requireAuth(), deleteProduct);

export default router;
