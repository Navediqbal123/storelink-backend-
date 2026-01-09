import express from "express";
import auth from "../middleware/auth.js";
import adminOnly from "../middleware/admin.js";

import {
  adminStats,
  getSearchLogs,
  getClickLogs,
  getSellerRequests,
  approveSeller,
  rejectSeller,
  blockSeller,
  unblockSeller,
  getAllSellers,
} from "../controllers/admin.controller.js";

const router = express.Router();

// ===============================
// ADMIN DASHBOARD
// ===============================
router.get("/stats", auth, adminOnly, adminStats);

// ===============================
// SELLER MANAGEMENT
// ===============================

// all seller requests (pending / approved / rejected)
router.get("/seller-requests", auth, adminOnly, getSellerRequests);

// approve seller
router.post("/approve-seller", auth, adminOnly, approveSeller);

// reject seller
router.post("/reject-seller", auth, adminOnly, rejectSeller);

// all approved sellers
router.get("/sellers", auth, adminOnly, getAllSellers);

// block / unblock seller
router.post("/block-seller", auth, adminOnly, blockSeller);
router.post("/unblock-seller", auth, adminOnly, unblockSeller);

// ===============================
// SEARCH ANALYTICS
// ===============================
router.get("/search-logs", auth, adminOnly, getSearchLogs);
router.get("/searches", auth, adminOnly, getSearchLogs);

// ===============================
// CLICK ANALYTICS
// ===============================
router.get("/click-logs", auth, adminOnly, getClickLogs);
router.get("/clicks", auth, adminOnly, getClickLogs);

export default router;
