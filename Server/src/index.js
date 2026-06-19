import express from "express";
import cors from "cors";
import "dotenv/config";
import playerRoutes      from "./routes/player.js";
import farmRoutes        from "./routes/farm.js";
import leaderboardRoutes from "./routes/leaderboard.js";

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok", game: "Cozy Pixel Farm" }));

app.use("/api/player",      playerRoutes);
app.use("/api/farm",        farmRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
