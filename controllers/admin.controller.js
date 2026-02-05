// controllers/admin.controller.js

// ===============================
// SELLER REQUESTS (PENDING ONLY)
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

    // Update sellers table
    await req.supabase
      .from("sellers")
      .update({ status: "approved" })
      .eq("user_id", user_id);

    // Promote role
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
