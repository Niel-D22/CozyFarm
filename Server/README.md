# Cozy Pixel Farm Backend

Express.js server for storing player statistics, inventory, quests, and plot data in Supabase.

## Database Schema (Run in Supabase SQL Editor)

```sql
-- Tabel pemain
CREATE TABLE players (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address  TEXT UNIQUE NOT NULL,
  username        TEXT NOT NULL,
  gold            INTEGER DEFAULT 0,
  day             INTEGER DEFAULT 1,
  energy          INTEGER DEFAULT 100,
  inventory       JSONB DEFAULT '{"turnip_seed":5,"potato_seed":3,"turnip":0,"potato":0,"salad":0}',
  quests          JSONB DEFAULT '[]',
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

-- Tabel plot lahan
CREATE TABLE plots (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address  TEXT NOT NULL REFERENCES players(wallet_address) ON DELETE CASCADE,
  plot_id         INTEGER NOT NULL,
  state           TEXT DEFAULT 'empty',
  crop            TEXT,
  days_grown      INTEGER DEFAULT 0,
  UNIQUE(wallet_address, plot_id)
);

-- Tabel leaderboard snapshot (opsional, untuk caching)
CREATE TABLE leaderboard_cache (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data       JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index untuk performa
CREATE INDEX idx_players_wallet ON players(wallet_address);
CREATE INDEX idx_players_gold   ON players(gold DESC);
CREATE INDEX idx_plots_wallet   ON plots(wallet_address);
```

## How to Setup and Run

1. Create a project on [supabase.com](https://supabase.com) (free tier).
2. Copy the `SUPABASE_URL` and `SUPABASE_ANON_KEY` from Settings > API.
3. Run the SQL schema above in the SQL Editor in Supabase.
4. Copy the `.env.example` file to `.env` in this directory:
   ```bash
   cp .env.example .env
   ```
5. Populate the `.env` file with your credentials:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
6. Install dependencies:
   ```bash
   npm install
   ```
7. Start the development server:
   ```bash
   npm run dev
   ```
8. Verify server is running by accessing:
   [http://localhost:3001/health](http://localhost:3001/health)
