import jwt from "jsonwebtoken";
import supabase from "../supabase.js";

export default function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    req.supabase = supabase; // ✅ MISSING LINE ADDED
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
