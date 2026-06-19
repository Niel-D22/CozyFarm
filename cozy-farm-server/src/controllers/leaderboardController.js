import supabase from "../config/supabase.js";

// GET /api/leaderboard — top 10 pemain berdasarkan gold
export const getLeaderboard = async (req, res) => {
  const { data, error } = await supabase
    .from("players")
    .select("username, gold, day, wallet_address")
    .order("gold", { ascending: false })
    .limit(10);

  if (error) return res.status(500).json({ error: error.message });
  // Sensor wallet address (tampilkan hanya 4 char pertama dan 4 terakhir)
  const safe = data.map((p, i) => ({
    rank: i + 1,
    username: p.username,
    gold: p.gold,
    day: p.day,
    wallet: `${p.wallet_address.slice(0,4)}...${p.wallet_address.slice(-4)}`
  }));
  res.json({ leaderboard: safe });
};
