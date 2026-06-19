// Untuk sekarang: validasi wallet address dari header
// Nanti bisa diganti signature verification Solana
export const requireWallet = (req, res, next) => {
  const wallet = req.headers["x-wallet-address"];
  if (!wallet || wallet.length < 32) {
    return res.status(401).json({ error: "Wallet address diperlukan" });
  }
  req.walletAddress = wallet;
  next();
};
