import { randomUUID } from "crypto";

// ===============================
// ADD PRODUCT (shopkeeper only)
// ===============================
export async function addProduct(req, res) {
  try {
    const { title, description, price } = req.body;
    const userId = req.user.id;

    if (!title || !price) {
      return res.status(400).json({ error: "Title and price required" });
    }

    const { error } = await req.supabase.from("products").insert([
      {
        id: randomUUID(),
        user_id: userId,
        title,
        description,
        price,
      },
    ]);

    if (error) return res.status(400).json({ error });

    res.json({ success: true, message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// ===============================
// GET ALL PRODUCTS (public)
// ===============================
export async function getProducts(req, res) {
  try {
    const { data, error } = await req.supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error });

    res.json({ success: true, products: data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// ===============================
// UPDATE PRODUCT (own product only)
// ===============================
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { title, price, description } = req.body;

    const { error } = await req.supabase
      .from("products")
      .update({ title, price, description })
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (error) return res.status(400).json({ error });

    res.json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// ===============================
// DELETE PRODUCT (own product only)
// ===============================
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const { error } = await req.supabase
      .from("products")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (error) return res.status(400).json({ error });

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
