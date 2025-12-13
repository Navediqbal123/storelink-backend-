import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

import authRoutes from "./routes/auth.routes.js";
import shopkeeperRoutes from "./routes/shopkeeper.routes.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

// --------------------
// Middlewares
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// Supabase Client (MISSING THA)
// --------------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Attach supabase to every request
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// --------------------
// Test Route
// --------------------
app.get("/", (req, res) => {
  res.send("Storelink Backend Running ✅");
});

// --------------------
// Routes
// --------------------
app.use("/auth", authRoutes);
app.use("/shopkeeper", shopkeeperRoutes);
app.use("/products", productRoutes);

// --------------------
// Server Start
// --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
