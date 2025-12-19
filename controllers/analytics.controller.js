// controllers/analytics.controller.js

export const logSearch = async (req, res) => {
  const { query } = req.body;

  await req.supabase.from("search_logs").insert({
    user_id: req.user?.id || null,
    query,
  });

  res.json({ success: true });
};

export const logClick = async (req, res) => {
  const { product_id, page } = req.body;

  await req.supabase.from("click_logs").insert({
    user_id: req.user?.id || null,
    product_id,
    page,
  });

  res.json({ success: true });
};
