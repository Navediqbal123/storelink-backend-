export const adminStats = async (req, res) => {
  const users = await req.supabase.from("profiles").select("id", { count: "exact" });
  const products = await req.supabase.from("products").select("id", { count: "exact" });

  res.json({
    totalUsers: users.count,
    totalProducts: products.count
  });
};
