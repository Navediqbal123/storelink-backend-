import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

/* --------------------- ENV ---------------------- */
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
};

/* ---------------- SUPABASE HELPERS ---------------- */
async function sbGet(table, query = "") {
  return (await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, { headers })).json();
}
async function sbPost(table, body) {
  return (
    await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
  ).json();
}
async function sbPatch(table, query, body) {
  return (
    await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    })
  ).json();
}

/* -------------------- AUTH -------------------- */
function token(id) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
}

function auth(req, res, next) {
  const t = req.headers.authorization?.split(" ")[1];
  if (!t) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = jwt.verify(t, JWT_SECRET);
    req.userId = user.id;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

/* ------------------ ROLE CHECK ------------------- */
async function isAdmin(id) {
  const u = await sbGet("users", `?id=eq.${id}&select=role`);
  return u[0]?.role === "admin";
}
async function isOwner(id) {
  const u = await sbGet("users", `?id=eq.${id}&select=role`);
  return u[0]?.role === "owner";
}

/* -------------------- ROOT --------------------- */
app.get("/", (req, res) => res.send("Brush Backend Running 🔥"));

/* ---------------- SIGNUP ---------------- */
app.post("/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await sbGet("users", `?email=eq.${email}&select=id`);
  if (exist.length) return res.status(400).json({ error: "Email exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await sbPost("users", {
    name,
    email,
    password: hashed,
    role: "user", // default
    created_at: new Date().toISOString(),
  });

  res.json({ token: token(user[0].id), user: user[0] });
});

/* ---------------- LOGIN ---------------- */
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const rows = await sbGet("users", `?email=eq.${email}&select=*`);
  if (!rows.length) return res.status(400).json({ error: "User not found" });

  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) return res.status(400).json({ error: "Wrong password" });

  delete user.password;
  res.json({ token: token(user.id), user });
});

/* ---------------- PROFILE ---------------- */
app.get("/auth/me", auth, async (req, res) => {
  const rows = await sbGet("users", `?id=eq.${req.userId}&select=*`);
  const user = rows[0];
  delete user.password;
  res.json(user);
});

/* -------------------------------------------------
  ADMIN FEATURES
---------------------------------------------------*/

/* ----- GET ALL USERS ----- */
app.get("/admin/users", auth, async (req, res) => {
  if (!(await isAdmin(req.userId)))
    return res.status(403).json({ error: "Admin only" });

  const users = await sbGet("users", "?select=*");
  res.json(users);
});

/* ----- MAKE OWNER ----- */
app.post("/admin/make-owner/:id", auth, async (req, res) => {
  if (!(await isAdmin(req.userId)))
    return res.status(403).json({ error: "Admin only" });

  const out = await sbPatch(
    "users",
    `?id=eq.${req.params.id}`,
    { role: "owner" }
  );

  res.json(out);
});

/* ----- REMOVE OWNER ----- */
app.post("/admin/remove-owner/:id", auth, async (req, res) => {
  if (!(await isAdmin(req.userId)))
    return res.status(403).json({ error: "Admin only" });

  const out = await sbPatch(
    "users",
    `?id=eq.${req.params.id}`,
    { role: "user" }
  );

  res.json(out);
});

/* ----- ADMIN PANEL STATS ----- */
app.get("/admin/stats", auth, async (req, res) => {
  if (!(await isAdmin(req.userId)))
    return res.status(403).json({ error: "Admin only" });

  const users = await sbGet("users", "?select=id");
  const owners = await sbGet("users", "?role=eq.owner");

  res.json({
    total_users: users.length,
    owners: owners.length,
  });
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🔥 Brush Backend Live on ${PORT}`));
