import supabase from "../supabase.js";

// --------------------
// SIGNUP
// --------------------
export const signup = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // IMPORTANT: session return karo
  res.json({
    session: data.session, // 👈 yahin access_token hota hai
    user: data.user,
  });
};

// --------------------
// LOGIN
// --------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  // ❌ jwt.sign HATA DIYA
  // ✅ Supabase session return

  res.json({
    session: data.session, // 👈 FRONTEND YAHIN SE access_token LEGA
    user: data.user,
  });
};
