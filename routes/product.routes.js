import express from "express";
import shopkeeperOnly from "../middleware/shopkeeper.js";
import { addProduct, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/add-product", shopkeeperOnly, addProduct);
router.get("/products", getProducts);

export default router;
