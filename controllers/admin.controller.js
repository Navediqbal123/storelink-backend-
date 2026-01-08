// controllers/admin.controller.js

// ===============================
// ADMIN DASHBOARD STATS
// ===============================
export const adminStats = async (req, res) => {
  try {
    const users = await req.supabase
      .from("profiles")
      .select("id", { count: "exact" });

    const sellers = await req.supabase
      .from("user_roles")
      .select("id", { count: "exact" })
      .eq("role", "shopkeeper");

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
      totalSellers: sellers.count,
      totalProducts: products.count,
      totalSearches: searches.count,
      totalClicks: clicks.count,
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// SELLER REQUESTS (ADMIN)
// ===============================
export const getSellerRequests = async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from("seller_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// APPROVE SELLER (ADMIN)
// ===============================
export const approveSeller = async (req, res) => {
  try {
    const { user_id } = req.body;

    // 1️⃣ approve request
    await req.supabase
      .from("seller_requests")
      .update({ status: "approved" })
      .eq("user_id", user_id);

    // 2️⃣ update role
    await req.supabase
      .from("user_roles")
      .update({ role: "shopkeeper" })
      .eq("user_id", user_id);

    res.json({ success: true, message: "Seller approved" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// BLOCK SELLER
// ===============================
export const blockSeller = async (req, res) => {
  try {
    const { user_id } = req.body;

    await req.supabase
      .from("profiles")
      .update({ is_active: false })
      .eq("user_id", user_id);

    res.json({ success: true, message: "Seller blocked" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// UNBLOCK SELLER
// ===============================
export const unblockSeller = async (req, res) => {
  try {
    const { user_id } = req.body;

    await req.supabase
      .from("profiles")
      .update({ is_active: true })
      .eq("user_id", user_id);

    res.json({ success: true, message: "Seller unblocked" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// GET ALL SELLERS (ADMIN)
// ===============================
export const getAllSellers = async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from("seller_requests")
      .select("*")
      .eq("status", "approved");

    if (error) return res.status(400).json({ error });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// GET SEARCH LOGS
// ===============================
export const getSearchLogs = async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from("search_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// GET CLICK LOGS
// ===============================
export const getClickLogs = async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from("click_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};
