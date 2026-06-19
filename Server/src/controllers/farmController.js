import supabase from "../config/supabase.js";

// GET /api/farm/:wallet — load status plot lahan
export const getPlots = async (req, res) => {
  const { wallet } = req.params;
  const { data, error } = await supabase
    .from("plots")
    .select("*")
    .eq("wallet_address", wallet)
    .order("plot_id");

  if (error) return res.status(500).json({ error: error.message });
  res.json({ plots: data || [] });
};

// POST /api/farm/plots — simpan semua plot
export const savePlots = async (req, res) => {
  const { wallet_address, plots } = req.body;
  // Hapus plot lama lalu insert baru (upsert per plot_id)
  const rows = plots.map(p => ({ ...p, wallet_address }));
  const { error } = await supabase
    .from("plots")
    .upsert(rows, { onConflict: "wallet_address,plot_id" });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ saved: true });
};
