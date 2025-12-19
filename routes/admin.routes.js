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

// Search analytics logs
router.get("/search-logs", auth, adminOnly, getSearchLogs);

// Click analytics logs
router.get("/click-logs", auth, adminOnly, getClickLogs);

export default router;
