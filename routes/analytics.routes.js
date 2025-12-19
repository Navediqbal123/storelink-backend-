// routes/analytics.routes.js
import express from "express";
import auth from "../middleware/auth.js";
import { logSearch, logClick } from "../controllers/analytics.controller.js";

const router = express.Router();

router.post("/search", auth, logSearch);
router.post("/click", auth, logClick);

export default router;
