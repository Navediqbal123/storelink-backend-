import express from "express";
import auth from "../middleware/auth.js";
import adminOnly from "../middleware/admin.js";
import {
  adminStats,
  getSearchLogs,
  getClickLogs,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Admin dashboard stats
router.get("/stats", auth, adminOnly, adminStats);

// Search analytics logs (2 aliases, jo chaaho use karo)
router.get("/search-logs", auth, adminOnly, getSearchLogs);
router.get("/searches", auth, adminOnly, getSearchLogs);

// Click analytics logs (2 aliases)
router.get("/click-logs", auth, adminOnly, getClickLogs);
router.get("/clicks", auth, adminOnly, getClickLogs);

export default router;
