import express from "express";
import auth from "../middleware/auth.js";
import shopkeeperOnly from "../middleware/shopkeeper.js";
import { addProduct, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

// Add product (only logged-in shopkeeper)
router.post("/add", auth, shopkeeperOnly, addProduct);

// Get all products (public)
router.get("/", getProducts);

export default router;
