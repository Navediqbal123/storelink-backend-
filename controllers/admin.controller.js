// controllers/admin.controller.js

// ===============================
// ADMIN DASHBOARD STATS
// ===============================
export const adminStats = async (req, res) => {
  try {
    const users = await req.supabase
      .from("profiles")
      .select("id", { count: "exact" });

    const products = await req.supabase
      .from("products")
      .select("id", { count: "exact" });

    const searches = await req.supabase
      .from("search_logs")
      .select("id", { count: "exact" });

    const clicks = await req.supabase
      .from("click_logs")
      .select("id", { count: "exact" });

    res.json({
      totalUsers: users.count,
      totalProducts: products.count,
      totalSearches: searches.count,
      totalClicks: clicks.count,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// GET SEARCH LOGS (ADMIN ONLY)
// ===============================
export const getSearchLogs = async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from("search_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// GET CLICK LOGS (ADMIN ONLY)
// ===============================
export const getClickLogs = async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from("click_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
