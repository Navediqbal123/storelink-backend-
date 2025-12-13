export default async function shopkeeperOnly(req, res, next) {
  try {
    const userId = req.user.id;

    const { data, error } = await req.supabase
      .from("shopkeepers")
      .select("status")
      .eq("user_id", userId)
      .single();

    if (error || !data || data.status !== "approved") {
      return res.status(403).json({ error: "Access denied. Shopkeeper only." });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
