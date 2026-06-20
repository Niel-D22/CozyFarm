import { motion } from "motion/react";
import React from "react";

export default function Hero({ onExplore }) {
  return (
    <section className="relative min-h-screen bg-[#2D4A1E] text-[#FDF6E3] overflow-hidden flex flex-col justify-between pt-24 pb-8 select-none">
      {/* Pixel Grid Pattern */}
      <div className="absolute inset-0 pixel-grid-light opacity-6 pointer-events-none" />

      {/* Floating Pixel Elements Around the viewport */}
      <div className="absolute top-[20%] left-[8%] animate-float-gentle pointer-events-none">
        <div className="pixel-leaf-css transform scale-[3]" />
      </div>
      <div className="absolute top-[15%] right-[12%] animate-float-slow pointer-events-none">
        <div className="pixel-star-css animate-twinkle transform scale-[3]" />
      </div>
      <div className="absolute bottom-[35%] left-[10%] animate-float-reverse pointer-events-none">
        <div className="pixel-coin-css animate-pixel-spin transform scale-[3]" />
      </div>
      <div className="absolute bottom-[25%] right-[15%] animate-float pointer-events-none">
        <div className="pixel-seed-css transform scale-[3]" />
      </div>

      {/* Hero Outer Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Headline - Overlapping & Big Text */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center">
            {/* Tagline label */}
            <div className="inline-block py-1 px-3 bg-[#4ECDC4] text-[#1a2e0f] border-2 border-[#1a2e0f] pixel-shadow-dark mb-6 text-center transform -rotate-1">
              <span className="font-pixel text-[9px] sm:text-[10px] tracking-wider uppercase font-bold">
                pixel farming game • browser based • free
              </span>
            </div>

            {/* Giant Stacked Title */}
            <div className="font-pixel text-left select-text relative">
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black leading-[1.1] text-[#FDF6E3] tracking-normal">
                <span className="block drop-shadow-[6px_6px_0px_#1a2e0f]">BUILD</span>
                <span className="block text-[#E8A838] drop-shadow-[6px_6px_0px_#1a2e0f] py-1 my-1">
                  YOUR
                </span>
                <span className="block drop-shadow-[6px_6px_0px_#1a2e0f] text-[#4ECDC4]">
                  DREAM FARM
                </span>
              </h1>
            </div>

            {/* Mini Description */}
            <p className="mt-8 text-lg sm:text-xl font-bold text-[#FDF6E3]/90 max-w-xl font-sans leading-relaxed select-text">
              Enter a captivating pixel art world. Plant crops, nurture rare plants, befriend villagers, and show the world who the best farmer is on the Leaderboard!
            </p>

            {/* CTA action handles */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onExplore}
                id="hero-play-now-btn"
                className="font-pixel text-xs sm:text-sm py-4 px-8 bg-[#E8A838] text-[#1a2e0f] border-4 border-[#1a2e0f] shadow-[6px_6px_0px_#1a2e0f] hover:bg-[#4ECDC4] hover:shadow-[2px_2px_0px_#1a2e0f] hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-pixel"
              >
                ▶ PLAY NOW
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("features");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                id="hero-learn-more-btn"
                className="font-pixel text-xs sm:text-sm py-4 px-8 bg-transparent text-[#FDF6E3] border-4 border-[#FDF6E3] shadow-[6px_6px_0px_rgba(253,246,227,0.2)] hover:bg-[#FDF6E3] hover:text-[#1a2e0f] hover:shadow-[2px_2px_0px_#1a2e0f] hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-pixel"
              >
                LEARN FEATURES
              </button>
            </div>
          </div>

          {/* Interactive Walking Sprite & Overlay Centerpiece */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[350px] lg:min-h-[450px]">
            {/* Sun-ray background effect radiating around character */}
            <div className="absolute w-[280px] h-[280px] sm:w-[385px] sm:h-[385px] bg-[#E8A838]/10 rounded-full border-4 border-dashed border-[#E8A838]/20 flex items-center justify-center animate-spin [animation-duration:40s]" />
            <div className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] bg-[#4ECDC4]/5 rounded-full border-4 border-dotted border-[#4ECDC4]/25" />

            {/* Central Stage Card */}
            <div className="relative z-10 flex flex-col items-center">

              {/* Floating Leaf in stage front */}
              <div className="absolute -top-12 left-10 animate-float pointer-events-none z-25">
                <div className="pixel-seed-css transform scale-[4]" />
              </div>

              {/* Character Base & Walking Element */}
              <div className="relative w-[190px] h-[220px] sm:w-[240px] sm:h-[260px] flex flex-col items-center justify-end">
                {/* Custom Oval Shadow underneath character */}
                <div className="absolute bottom-1 w-[124px] h-[12px] sm:w-[150px] sm:h-[16px] bg-[#1a2e0f]/60 rounded-full blur-[2px]" />

                {/* Walking Sprite Animating Step CSS */}
                <div className="relative pb-4 animate-float">
                  <div className="pixel-sprite-walk-down pixelated transform scale-[5] sm:scale-[6]" />
                </div>
              </div>

              {/* Floating elements inside wrapper */}
              <div className="absolute top-24 -right-10 animate-float-reverse pointer-events-none z-20">
                <div className="pixel-coin-css animate-pixel-spin transform scale-[3.5]" />
              </div>

              <div className="absolute bottom-8 -left-6 animate-float-slow pointer-events-none z-20">
                <div className="pixel-star-css animate-twinkle transform scale-[4]" />
              </div>

              {/* Tag below Character */}
              <div className="mt-8 bg-[#1a2e0f] text-[#FDF6E3] font-pixel text-[10px] py-2 px-4 border-2 border-[#E8A838] shadow-[4px_4px_0px_rgba(232,168,56,0.3)]">
                NAME: PIXEL FARMER (LV. 42)
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bouncing Scroll Down Indicator */}
      <div className="w-full flex justify-center items-center mt-6 z-10">
        <button
          onClick={() => {
            const el = document.getElementById("stats-row");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          id="hero-scroll-down-indicator"
          className="flex flex-col items-center space-y-2 group"
          title="Scroll Down"
        >
          <span className="font-pixel text-[10px] tracking-widest text-[#FDF6E3]/70 group-hover:text-[#E8A838]">
            SCROLL ↓
          </span>
          <div className="flex flex-col items-center justify-center animate-bounce-arrow">
            {/* Pure CSS pixelated arrow point pointing down */}
            <div className="w-4 h-4 bg-transparent flex flex-col items-center">
              <div className="w-1 h-3 bg-[#E8A838]" />
              <div className="w-3 h-1 bg-[#E8A838]" />
              <div className="w-5 h-1 bg-[#E8A838] mt-[1px]" />
            </div>
          </div>
        </button>
      </div>

    </section>
  );
}
