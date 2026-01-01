import { randomUUID } from "crypto";

// =====================================
// ADD PRODUCT (shopkeeper only + location)
// =====================================
export async function addProduct(req, res) {
  try {
    const {
      title,
      description,
      price,
      city,
      state,
      country,
      pincode,
    } = req.body;

    const userId = req.user.id;

    if (!title || !price || !city || !state) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const { error } = await req.supabase.from("products").insert([
      {
        id: randomUUID(),
        user_id: userId,
        title,
        description,
        price,
        city,
        state,
        country,
        pincode,
      },
    ]);

    if (error) return res.status(400).json({ error });

    res.json({ success: true, message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// =====================================
// GET PRODUCTS (location-based ranking)
// =====================================
export async function getProducts(req, res) {
  try {
    const { city, state, country } = req.query;

    let query = req.supabase.from("products").select("*");

    // 🔥 LOCATION PRIORITY LOGIC
    if (city) {
      query = query.eq("city", city);
    } else if (state) {
      query = query.eq("state", state);
    } else if (country) {
      query = query.eq("country", country);
    }

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) return res.status(400).json({ error });

    res.json({ success: true, products: data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// =====================================
// UPDATE PRODUCT (own product only)
// =====================================
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      city,
      state,
      country,
      pincode,
    } = req.body;

    const { error } = await req.supabase
      .from("products")
      .update({
        title,
        description,
        price,
        city,
        state,
        country,
        pincode,
      })
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (error) return res.status(400).json({ error });

    res.json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// =====================================
// DELETE PRODUCT (own product only)
// =====================================
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
