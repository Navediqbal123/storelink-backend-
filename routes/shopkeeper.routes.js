import express from "express";
import authMiddleware from "../middleware/auth.js";
import shopkeeperOnly from "../middleware/shopkeeper.js";
import {
  becomeShopkeeper,
  shopkeeperDashboard,
} from "../controllers/shopkeeper.controller.js";

const router = express.Router();

// ✅ AUTH REQUIRED
router.post("/become-shopkeeper", authMiddleware, becomeShopkeeper);

// ✅ AUTH + SHOPKEEPER ONLY
router.get("/dashboard", authMiddleware, shopkeeperOnly, shopkeeperDashboard);

export default router;
