import { motion } from "motion/react";
import React from "react";

export default function HowToPlay() {
  const steps = [
    {
      step: 1,
      title: "Connect Wallet",
      desc: "Connect your Web3 wallet (Phantom or Solflare) to store asset data transparently.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-12 h-12 pixelated inline-block" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="12" height="10" fill="#E8A838" stroke="#1a2e0f" stroke-width="1" />
          <rect x="1" y="5" width="4" height="6" fill="#FDF6E3" stroke="#1a2e0f" stroke-width="1" />
          <rect x="9" y="7" width="4" height="2" fill="#4ECDC4" stroke="#1a2e0f" stroke-width="1" />
          <rect x="11" y="8" width="1" height="1" fill="#1a2e0f" />
        </svg>
      ),
    },
    {
      step: 2,
      title: "Buy & Plant Seeds",
      desc: "Use initial coins to buy carrot, tomato, or corn seeds at the market store.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-12 h-12 pixelated inline-block" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="2" width="8" height="1" fill="#1a2e0f" />
          <rect x="3" y="3" width="10" height="2" fill="#E8A838" stroke="#1a2e0f" stroke-width="1" />
          <rect x="2" y="5" width="12" height="9" fill="#2D4A1E" stroke="#1a2e0f" stroke-width="1" />
          <rect x="3" y="5" width="10" height="1" fill="#1a2e0f" />
          {/* Sprout decal */}
          <rect x="6" y="8" width="4" height="4" fill="#FDF6E3" />
          <rect x="7" y="9" width="2" height="2" fill="#8DB87A" />
        </svg>
      ),
    },
    {
      step: 3,
      title: "Harvest Daily",
      desc: "Water your fields so they don't wilt. Harvest crops after they mature on time.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-12 h-12 pixelated inline-block" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Handle */}
          <rect x="4" y="2" width="8" height="1" fill="#5c4033" />
          <path d="M4 2v6h1V2zm7 0v6h1V2z" fill="#1a2e0f" />
          {/* Basket body */}
          <rect x="2" y="7" width="12" height="7" fill="#E8A838" stroke="#1a2e0f" stroke-width="1" />
          {/* Weave squares */}
          <rect x="4" y="9" width="2" height="2" fill="#5c4033" />
          <rect x="10" y="9" width="2" height="2" fill="#5c4033" />
        </svg>
      ),
    },
    {
      step: 4,
      title: "Reach the Top Ranks",
      desc: "Sell rice and fruit to merchants, collect gold coins, and dominate the global leaderboard.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-12 h-12 pixelated inline-block" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Trophy */}
          <rect x="4" y="2" width="8" height="6" fill="#E8A838" />
          <rect x="5" y="3" width="1" height="4" fill="#FDF6E3" />
          <rect x="6" y="2" width="4" height="1" fill="#FDF6E3" />
          <rect x="3" y="3" width="1" height="3" fill="#E8A838" />
          <rect x="12" y="3" width="1" height="3" fill="#E8A838" />
          <rect x="7" y="8" width="2" height="4" fill="#E8A838" />
          <rect x="4" y="12" width="8" height="2" fill="#E8A838" />
          {/* Outlines */}
          <rect x="3" y="2" width="10" height="1" fill="#1a2e0f" />
          <rect x="3" y="8" width="10" height="1" fill="#1a2e0f" />
          <rect x="3" y="12" width="10" height="1" fill="#1a2e0f" />
          <rect x="3" y="14" width="10" height="1" fill="#1a2e0f" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="how-to-play"
      className="py-24 bg-[#FDF6E3] border-b-4 border-[#1a2e0f] relative select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-pixel text-[10px] text-[#8DB87A] tracking-wider uppercase block mb-3 font-bold">
            🌱 HOW TO PLAY 🌱
          </span>
          <h2 className="font-pixel text-2xl sm:text-3xl text-[#1a2e0f] uppercase leading-normal">
            START YOUR ADVENTURE
          </h2>
          <div className="w-24 h-1 bg-[#1a2e0f] mx-auto mt-4" />
        </div>

        {/* 4 Steps Row with connecting lines */}
        <div className="relative">

          {/* Horizontal connecting line for MD+ screens */}
          <div className="hidden md:block absolute top-[64px] left-[12%] right-[12%] h-1 bg-transparent border-t-4 border-dashed border-[#E8A838] pointer-events-none z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.12 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Circle Frame */}
                <div className="relative mb-6">
                  {/* Step Large Bubble Index indicator */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-none border-2 border-[#1a2e0f] bg-[#1a2e0f] text-[#FDF6E3] flex items-center justify-center font-pixel text-xs font-bold leading-none select-none z-20">
                    {item.step}
                  </div>

                  <div className="w-24 h-24 rounded-none bg-[#FDF6E3] border-4 border-[#1a2e0f] flex items-center justify-center p-4 shadow-[4px_4px_0px_#1a2e0f] transition-pixel group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_#1a2e0f] group-hover:bg-[#E8A838]/15">
                    {item.icon}
                  </div>
                </div>

                {/* Vertical Line on Mobile for separation */}
                {index < 3 && (
                  <div className="md:hidden w-1 h-8 bg-transparent border-l-4 border-dashed border-[#E8A838]" />
                )}

                {/* Step Content */}
                <h3 className="font-pixel text-xs text-[#1a2e0f] my-3 leading-snug font-bold">
                  {item.title}
                </h3>

                <p className="font-sans text-sm font-semibold text-[#1a2e0f]/80 max-w-[240px] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
