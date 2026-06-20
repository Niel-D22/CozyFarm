import { motion } from "motion/react";
import React from "react";

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const originalLeaderboard = [
    { rank: 1, name: "PixelFarmer", coins: 9820, days: 42, highlightClass: "border-[#E8A838] bg-[#E8A838]/5" },
    { rank: 2, name: "CozyGrower", coins: 7450, days: 38, highlightClass: "border-[#4ECDC4] bg-[#4ECDC4]/5" },
    { rank: 3, name: "FarmHero", coins: 6100, days: 35, highlightClass: "border-[#4ECDC4] bg-[#4ECDC4]/5" },
    { rank: 4, name: "HarvestMaster", coins: 5900, days: 31, highlightClass: "border-[#1a2e0f]/50 opacity-90" },
    { rank: 5, name: "TomatoKing", coins: 4850, days: 28, highlightClass: "border-[#1a2e0f]/50 opacity-90" }
  ];

  const filteredLeaderboard = originalLeaderboard.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      id="leaderboard"
      className="py-24 bg-[#2D4A1E] border-b-4 border-[#1a2e0f] relative overflow-hidden select-none"
    >
      {/* Pixel Grid Pattern (Light style on dark background) */}
      <div className="absolute inset-0 pixel-grid-light opacity-6 pointer-events-none" />

      {/* Floating Sparkles decorative */}
      <div className="absolute bottom-[10%] left-[8%] animate-twinkle opacity-30 pointer-events-none">
        <div className="pixel-star-css transform scale-[3]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-pixel text-[10px] text-[#4ECDC4] tracking-widest uppercase block mb-3 font-bold">
            🏆 HALL OF FAME 🏆
          </span>
          <h2 className="font-pixel text-2xl sm:text-3xl text-[#FDF6E3] uppercase leading-normal">
            Leaderboard
          </h2>
          <div className="w-24 h-1 bg-[#4ECDC4] mx-auto mt-4" />
        </div>

        {/* Search Input Box */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="SEARCH FARMER NAME..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="leaderboard-search-input"
              className="w-full font-pixel text-[9px] sm:text-[10px] py-3.5 px-4 bg-[#1a2e0f] text-[#FDF6E3] border-4 border-[#E8A838] shadow-[4px_4px_0px_#1a2e0f] focus:outline-none focus:border-[#4ECDC4] placeholder-[#FDF6E3]/40"
            />
            {/* Magnifying Glass Retro Icon */}
            <div className="absolute right-4 top-4 text-[#E8A838]">
              🔍
            </div>
          </div>
        </div>

        {/* Main Score Board Board */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#1a2e0f] border-4 border-[#E8A838] p-4 sm:p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] relative"
        >
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-2 pb-4 border-b-4 border-[#E8A838] font-pixel text-[9px] sm:text-[11px] text-[#4ECDC4] mb-4 uppercase">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-4 pl-2">Farmer Name</div>
            <div className="col-span-3 text-right">Coins</div>
            <div className="col-span-3 text-right pr-2">Days</div>
          </div>

          {/* Table Data Rows */}
          <div className="flex flex-col space-y-3">
            {filteredLeaderboard.length > 0 ? (
              filteredLeaderboard.map((player) => (
                <div
                  key={player.rank}
                  className={`grid grid-cols-12 gap-2 items-center py-3.5 px-2 sm:px-4 border-4 rounded-none text-sm font-semibold transition-pixel ${player.highlightClass
                    } hover:scale-[1.02] hover:-translate-y-[1px] hover:bg-white/10`}
                >
                  {/* Rank Cell */}
                  <div className="col-span-2 flex justify-center items-center">
                    <span
                      className={`font-pixel text-[10px] sm:text-[12px] flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 border-2 ${player.rank === 1
                        ? "bg-[#E8A838] border-[#1a2e0f] text-[#1a2e0f] animate-pulse"
                        : player.rank === 2 || player.rank === 3
                          ? "bg-[#4ECDC4] border-[#1a2e0f] text-[#1a2e0f]"
                          : "bg-[#1a2e0f] border-[#FDF6E3]/30 text-[#FDF6E3]"
                        }`}
                    >
                      {player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : player.rank === 3 ? "🥉" : player.rank}
                    </span>
                  </div>

                  {/* Name cell with tiny green plant icon */}
                  <div className="col-span-4 pl-2 font-pixel text-[9px] sm:text-[11px] text-[#FDF6E3] overflow-hidden truncate">
                    {player.name}
                  </div>

                  {/* Coins Cell */}
                  <div className="col-span-3 text-right font-pixel text-[9px] sm:text-[11px] text-[#E8A838]">
                    💰 {player.coins.toLocaleString()}
                  </div>

                  {/* Days Active cell */}
                  <div className="col-span-3 text-right pr-2 font-pixel text-[9px] sm:text-[11px] text-[#8DB87A]">
                    {player.days} Days
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 font-pixel text-[10px] text-[#FDF6E3]/40">
                NO FARMER FOUND WITH THAT NAME 🚧
              </div>
            )}
          </div>
        </motion.div>

        {/* Global Action Trigger below */}
        <div className="mt-12 text-center">
          <button
            onClick={() => alert("Full leaderboard will be connected to the game server on v1.0 release!")}
            id="leaderboard-full-view-btn"
            className="font-pixel text-[9px] sm:text-[11px] py-3.5 px-8 bg-[#E8A838] text-[#1a2e0f] border-4 border-[#1a2e0f] shadow-[4px_4px_0px_#1a2e0f] hover:bg-[#4ECDC4] transition-pixel active:translate-y-1 active:shadow-none"
          >
            VIEW FULL RANKINGS
          </button>
        </div>

      </div>
    </section>
  );
}
