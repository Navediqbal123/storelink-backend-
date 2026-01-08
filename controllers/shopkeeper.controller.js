import { randomUUID } from "crypto";

// ===============================
// START SELLING ON SELLORA
// AUTO APPROVE SELLER
// ===============================
export async function becomeShopkeeper(req, res) {
  try {
    const user = req.user;
    const {
      shop_name,
      owner_name,
      phone,
      address,
      city,
      state,
      pincode,
      business_type
    } = req.body;

    // ✅ All required check
    if (
      !shop_name ||
      !owner_name ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !business_type
    ) {
      return res.status(400).json({ error: "All fields required" });
    }

    // 1️⃣ Save seller request (AUTO APPROVED)
    const { error: requestError } = await req.supabase
      .from("seller_requests")
      .insert([
        {
          id: randomUUID(),
          user_id: user.id,
          shop_name,
          owner_name,
          phone,
          address,
          city,
          state,
          pincode,
          business_type,
          status: "approved", // ✅ AUTO APPROVE
        },
      ]);

    if (requestError) {
      return res.status(400).json({ error: requestError });
    }

    // 2️⃣ Update user role → shopkeeper
    const { error: roleError } = await req.supabase
      .from("user_roles")
      .update({ role: "shopkeeper" })
      .eq("user_id", user.id);

    if (roleError) {
      return res.status(400).json({ error: roleError });
    }

    res.json({
      success: true,
      message: "Seller approved & dashboard unlocked",
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// ===============================
// SHOPKEEPER DASHBOARD
// ===============================
export async function shopkeeperDashboard(req, res) {
  try {
    res.json({
      success: true,
      message: "Shopkeeper dashboard working",
      user: req.user,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
