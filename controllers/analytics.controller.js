export const logClick = async (req, res) => {
  const { product_id, action } = req.body;

  // IP se location fetch karo
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  
  let country = null;
  let state = null;
  let currency_code = null;

  try {
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();
    country = geoData.country_name || null;
    state = geoData.region || null;
    currency_code = geoData.currency || null;
  } catch (e) {
    console.error("Geo fetch failed:", e);
  }

  await req.supabase.from("click_logs").insert({
    user_id: req.user?.id || null,
    product_id,
    action: action || "click",
    country,
    currency_code,
    ip_address: ip,
  });

  res.json({ success: true });
};
