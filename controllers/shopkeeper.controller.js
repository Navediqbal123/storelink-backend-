import { randomUUID } from "crypto";

export async function becomeShopkeeper(req, res) {
  try {
    const user = req.user;
    const { shop_name, address, phone } = req.body;

    if (!shop_name || !address || !phone) {
      return res.status(400).json({ error: "All fields required" });
    }

    const { error } = await req.supabase
      .from("shopkeepers")
      .insert([
        {
          id: randomUUID(),        // ✅ ADDED
          user_id: user.id,
          shop_name,
          address,
          phone,
          status: "pending",
        },
      ]);

    if (error) return res.status(400).json({ error });

    res.json({
      success: true,
      message: "Shopkeeper request submitted",
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

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
