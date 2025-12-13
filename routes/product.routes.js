import express from "express";
import auth from "../middleware/auth.js";
import shopkeeperOnly from "../middleware/shopkeeper.js";
import { addProduct, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/add", auth, shopkeeperOnly, addProduct);
router.get("/", getProducts);

export default router;
