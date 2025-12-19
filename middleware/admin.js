export default async function adminOnly(req, res, next) {
  const { data, error } = await req.supabase
    .from("profiles")
    .select("role")
    .eq("user_id", req.user.id)
    .single();

  if (error || data.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }

  next();
}
