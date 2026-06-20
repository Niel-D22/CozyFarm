import { motion } from "motion/react";
import React from "react";

export default function Features() {
  const features = [
    {
      title: "PLANT AND HARVEST",
      desc: "Plant 10+ types of crops. Water daily. Harvest and sell for gold coins.",
      accentClass: "border-[#4ECDC4] hover:shadow-[#4ECDC4]",
      accentBg: "bg-[#4ECDC4]/10",
      accentText: "text-[#4ECDC4]",
      icon: (
        <svg viewBox="0 0 16 16" className="w-16 h-16 pixelated inline-block drop-shadow-[2px_2px_0px_#1a2e0f]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stem & Leaves */}
          <rect x="7" y="5" width="2" height="7" fill="#4B8B3B" />
          <rect x="8" y="7" width="1" height="5" fill="#8DB87A" />
          <rect x="4" y="4" width="3" height="2" fill="#8DB87A" />
          <rect x="5" y="3" width="2" height="1" fill="#8DB87A" />
          <rect x="9" y="4" width="3" height="2" fill="#4B8B3B" />
          <rect x="9" y="3" width="2" height="1" fill="#4B8B3B" />
          {/* highlights */}
          <rect x="5" y="4" width="1" height="1" fill="#FDF6E3" />
          <rect x="10" y="4" width="1" height="1" fill="#4ECDC4" />
          {/* Ground Dirt */}
          <rect x="2" y="12" width="12" height="3" fill="#5c4033" />
          <rect x="3" y="11" width="10" height="1" fill="#8B5A2B" stroke="#1a2e0f" stroke-width="1" />
          {/* Spudder outline */}
          <rect x="7" y="3" width="2" height="1" fill="#1a2e0f" />
          <rect x="3" y="4" width="1" height="1" fill="#1a2e0f" />
          <rect x="12" y="4" width="1" height="1" fill="#1a2e0f" />
        </svg>
      )
    },
    {
      title: "COMPLETE QUESTS",
      desc: "Accept quests from villagers. Rare seeds and ancient secrets await you.",
      accentClass: "border-[#E8A838] hover:shadow-[#E8A838]",
      accentBg: "bg-[#E8A838]/10",
      accentText: "text-[#E8A838]",
      icon: (
        <svg viewBox="0 0 16 16" className="w-16 h-16 pixelated inline-block drop-shadow-[2px_2px_0px_#1a2e0f]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Scroll scroll-sheet */}
          <rect x="3" y="2" width="10" height="12" fill="#FDF6E3" />
          {/* borders */}
          <rect x="2" y="3" width="1" height="10" fill="#1a2e0f" />
          <rect x="13" y="3" width="1" height="10" fill="#1a2e0f" />
          <rect x="3" y="1" width="10" height="1" fill="#1a2e0f" />
          <rect x="3" y="14" width="10" height="1" fill="#1a2e0f" />
          {/* scroll roller ends */}
          <rect x="1" y="2" width="2" height="1" fill="#E8A838" />
          <rect x="13" y="2" width="2" height="1" fill="#E8A838" />
          <rect x="1" y="13" width="2" height="1" fill="#E8A838" />
          <rect x="13" y="13" width="2" height="1" fill="#E8A838" />
          {/* inline graphic details (writing checkmarks) */}
          <rect x="5" y="4" width="5" height="1" fill="#E8A838" />
          <rect x="5" y="7" width="6" height="1" fill="#1a2e0f" />
          <rect x="5" y="9" width="5" height="1" fill="#1a2e0f" />
          <rect x="5" y="11" width="3" height="1" fill="#4B8B3B" />
        </svg>
      )
    },
    {
      title: "RANK UP",
      desc: "Compete with other farmers on the leaderboard. The one with the most coins wins.",
      accentClass: "border-[#8DB87A] hover:shadow-[#8DB87A]",
      accentBg: "bg-[#8DB87A]/10",
      accentText: "text-[#8DB87A]",
      icon: (
        <svg viewBox="0 0 16 16" className="w-16 h-16 pixelated inline-block drop-shadow-[2px_2px_0px_#1a2e0f]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Gold Cup */}
          <rect x="4" y="2" width="8" height="6" fill="#E8A838" />
          {/* highlights */}
          <rect x="5" y="3" width="1" height="4" fill="#FDF6E3" />
          <rect x="6" y="2" width="4" height="1" fill="#FDF6E3" />
          {/* handles */}
          <rect x="3" y="3" width="1" height="3" fill="#E8A838" />
          <rect x="12" y="3" width="1" height="3" fill="#E8A838" />
          {/* Base stalk */}
          <rect x="7" y="8" width="2" height="4" fill="#E8A838" />
          <rect x="4" y="12" width="8" height="2" fill="#E8A838" />
          {/* black lines */}
          <rect x="3" y="2" width="10" height="1" fill="#1a2e0f" />
          <rect x="3" y="8" width="10" height="1" fill="#1a2e0f" />
          <rect x="2" y="3" width="1" height="4" fill="#1a2e0f" />
          <rect x="13" y="3" width="1" height="4" fill="#1a2e0f" />
          <rect x="6" y="9" width="1" height="3" fill="#1a2e0f" />
          <rect x="9" y="9" width="1" height="3" fill="#1a2e0f" />
          <rect x="3" y="12" width="10" height="1" fill="#1a2e0f" />
          <rect x="3" y="14" width="10" height="1" fill="#1a2e0f" />
        </svg>
      )
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-[#FDF6E3] border-b-4 border-[#1a2e0f] relative overflow-hidden select-none"
    >
      {/* Decorative leaf cluster top right */}
      <div className="absolute top-10 right-[5%] opacity-30 animate-float-slow pointer-events-none">
        <div className="pixel-leaf-css transform scale-[4]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title elements */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-pixel text-[10px] sm:text-[11px] text-[#2D4A1E] tracking-widest uppercase block mb-3 font-bold">
            ⚔️ GAME FEATURES ⚔️
          </span>
          <h2 className="font-pixel text-2xl sm:text-3xl text-[#1a2e0f] leading-normal uppercase">
            What can you do?
          </h2>
          <div className="w-32 h-1 bg-[#1a2e0f] mx-auto mt-4" />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, type: "spring" }}
              className={`bg-[#FDF6E3] border-4 border-[#1a2e0f] rounded-none p-8 flex flex-col justify-between relative group transition-pixel ${item.accentClass} hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_currentColor] shadow-[4px_4px_0px_rgba(26,46,15,1)]`}
            >
              {/* Card top banner accent */}
              <div className={`absolute top-0 left-0 right-0 h-2 ${item.accentBg} border-b-2 border-[#1a2e0f]/20`} />

              <div>
                {/* SVG Pixel Icon Container */}
                <div className="mb-6 flex justify-start items-center">
                  <div className={`p-3 border-2 border-[#1a2e0f] ${item.accentBg} inline-flex items-center justify-center`}>
                    {item.icon}
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="font-pixel text-sm sm:text-base text-[#1a2e0f] mb-4 tracking-wide">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="font-sans text-base text-[#1a2e0f]/80 leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </div>

              {/* Action badge link */}
              <div className="mt-8 pt-4 border-t-2 border-dashed border-[#1a2e0f]/10 flex justify-between items-center text-[#1a2e0f]">
                <span className="font-pixel text-[9px] tracking-wide group-hover:text-[#E8A838] transition-colors">
                  TRY BETA DEMO
                </span>
                <span className="font-pixel text-[11px] group-hover:translate-x-1 duration-150 transform">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
