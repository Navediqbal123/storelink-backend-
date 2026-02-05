// controllers/admin.controller.js

// ===============================
// ADMIN DASHBOARD STATS
// ===============================
export const adminStats = async (req, res) => {
  try {
    const { count: totalUsers } = await req.supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    const { count: totalSellers } = await req.supabase
      .from("sellers")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved");

    const { count: totalProducts } = await req.supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    res.json({
      totalUsers: totalUsers || 0,
      totalSellers: totalSellers || 0,
      totalProducts: totalProducts || 0,
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// SELLER REQUESTS (PENDING)
// ===============================
export const getSellerRequests = async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from("sellers")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// APPROVE SELLER
// ===============================
export const approveSeller = async (req, res) => {
  try {
    const { user_id } = req.body;

    await req.supabase
      .from("sellers")
      .update({ status: "approved" })
      .eq("user_id", user_id);

    await req.supabase
      .from("user_roles")
      .update({ role: "shopkeeper" })
      .eq("user_id", user_id);

    res.json({ success: true, message: "Seller approved" });
  } catch {
    res.status(500).json({ error: "Approve failed" });
  }
};

// ===============================
// REJECT SELLER
// ===============================
export const rejectSeller = async (req, res) => {
  try {
    const { user_id } = req.body;

    await req.supabase
      .from("sellers")
      .update({ status: "rejected" })
      .eq("user_id", user_id);

    res.json({ success: true, message: "Seller rejected" });
  } catch {
    res.status(500).json({ error: "Reject failed" });
  }
};

// ===============================
// GET APPROVED SELLERS
// ===============================
export const getAllSellers = async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from("sellers")
      .select("*")
      .eq("status", "approved");

    if (error) return res.status(400).json({ error });
    res.json(data);
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
      .eq("id", user_id);

    res.json({ success: true, message: "Seller blocked" });
  } catch {
    res.status(500).json({ error: "Block failed" });
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
      .eq("id", user_id);

    res.json({ success: true, message: "Seller unblocked" });
  } catch {
    res.status(500).json({ error: "Unblock failed" });
  }
};

// ===============================
// SEARCH LOGS
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
// CLICK LOGS
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
