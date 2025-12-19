import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import supabase from "./supabase.js";

import authRoutes from "./routes/auth.routes.js";
import shopkeeperRoutes from "./routes/shopkeeper.routes.js";
import productRoutes from "./routes/product.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();

// ====================
// Global Middlewares
// ====================
app.use(cors());
app.use(express.json());

// ====================
// Attach Supabase Client
// ====================
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// ====================
// Health / Test Route
// ====================
app.get("/", (req, res) => {
  res.send("Storelink Backend Running ✅");
});

// ====================
// API Routes
// ====================
app.use("/auth", authRoutes);
app.use("/shopkeeper", shopkeeperRoutes);
app.use("/products", productRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/admin", adminRoutes);

// ====================
// 404 Handler (optional but good)
// ====================
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ====================
// Global Error Handler
// ====================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// ====================
// Server Start
// ====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
