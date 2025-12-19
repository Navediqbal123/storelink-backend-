import supabase from "../supabase.js";

export default async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data || !data.user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // ✅ authenticated user
    req.user = data.user;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Auth failed" });
  }
}
