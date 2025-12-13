import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import shopkeeperRoutes from "./routes/shopkeeper.routes.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Storelink Backend Running ✅");
});

// routes
app.use("/auth", authRoutes);
app.use("/shopkeeper", shopkeeperRoutes);
app.use("/products", productRoutes);

// server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
