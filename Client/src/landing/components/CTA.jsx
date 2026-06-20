import { motion } from "motion/react";
import React from "react";

export default function CTA({ onPlayNow }) {
  return (
    <section className="bg-[#4ECDC4] border-b-4 border-[#1a2e0f] py-24 select-none relative overflow-hidden">
      {/* Background Pixel Grid Pattern */}
      <div className="absolute inset-0 pixel-grid opacity-6 pointer-events-none" />

      {/* Floating Leaves & Stars around CTA wrapper */}
      <div className="absolute top-10 left-[10%] animate-float pointer-events-none">
        <div className="pixel-star-css animate-twinkle transform scale-[3] bg-[#1a2e0f]" />
      </div>
      <div className="absolute bottom-10 right-[12%] animate-float-reverse pointer-events-none">
        <div className="pixel-leaf-css transform scale-[3]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Decorative Badge */}
        <div className="inline-block py-1 px-4 bg-[#E8A838] text-[#1a2e0f] border-2 border-[#1a2e0f] font-pixel text-[8px] sm:text-[9px] mb-6 shadow-[3px_3px_0px_#1a2e0f] uppercase font-bold transform rotate-1">
          Early Access Open
        </div>

        {/* Giant text */}
        <h2 className="font-pixel text-4xl sm:text-5xl lg:text-6xl text-[#1a2e0f] leading-none mb-6 drop-shadow-[4px_4px_0px_#FDF6E3]">
          READY TO FARM?
        </h2>

        {/* Subtext */}
        <p className="font-sans font-black text-[#1a2e0f]/90 text-lg sm:text-xl lg:text-2xl mb-12 uppercase tracking-wide">
          Free. In browser. Start now.
        </p>

        {/* Play Now Giant Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onPlayNow}
            id="cta-play-now-giant-btn"
            className="font-pixel text-[11px] sm:text-[14px] font-bold py-5 px-10 bg-[#1a2e0f] text-[#FDF6E3] border-4 border-[#1a2e0f] shadow-[7px_7px_0px_#FDF6E3] transition-pixel hover:bg-[#2D4A1E] hover:shadow-[3px_3px_0px_#FDF6E3]"
          >
            ▶ PLAY NOW
          </motion.button>
        </div>

        {/* Additional information link */}
        <div className="mt-8 font-pixel text-[8px] text-[#1a2e0f]/60 uppercase tracking-widest leading-relaxed">
          Full support for keyboard ⌨️ & mobile touch screen 📱 active.
        </div>

      </div>
    </section>
  );
}
