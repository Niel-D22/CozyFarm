import supabase from "../config/supabase.js";

// GET /api/player/:wallet — load data pemain
export const getPlayer = async (req, res) => {
  const { wallet } = req.params;
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("wallet_address", wallet)
    .single();

  if (error && error.code === "PGRST116") {
    return res.json({ exists: false });
  }
  if (error) return res.status(500).json({ error: error.message });
  res.json({ exists: true, player: data });
};

// POST /api/player/create — buat pemain baru
export const createPlayer = async (req, res) => {
  const { wallet_address, username } = req.body;
  const { data, error } = await supabase
    .from("players")
    .insert([{ wallet_address, username, gold: 0, day: 1, energy: 100 }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ player: data });
};

// POST /api/player/save — simpan progress
export const savePlayer = async (req, res) => {
  const { wallet_address, gold, day, energy, inventory, quests } = req.body;
  const { data, error } = await supabase
    .from("players")
    .update({ gold, day, energy, inventory, quests, updated_at: new Date() })
    .eq("wallet_address", wallet_address)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ saved: true, player: data });
};
