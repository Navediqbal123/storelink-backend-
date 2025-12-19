import express from "express";
import auth from "../middleware/auth.js";
import shopkeeperOnly from "../middleware/shopkeeper.js";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Add product (shopkeeper only)
router.post("/add", auth, shopkeeperOnly, addProduct);

// Get all products (public)
router.get("/", getProducts);

// Update product (own product only)
router.put("/:id", auth, shopkeeperOnly, updateProduct);

// Delete product (own product only)
router.delete("/:id", auth, shopkeeperOnly, deleteProduct);

export default router;
