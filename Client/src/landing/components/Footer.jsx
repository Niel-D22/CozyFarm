import { MessageSquare, Twitter, ArrowUp, Instagram } from "lucide-react";
import React from "react";

export default function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#1a2e0f] border-t-4 border-[#E8A838] py-16 text-[#FDF6E3] relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b-2 border-dashed border-[#FDF6E3]/15">

          {/* Left Column: Logo & Tagline */}
          <div className="md:col-span-5 flex flex-col items-start space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <img
                src="/assets/CozyPixel.png"
                alt="Cozy Pixel Farm Logo"
                referrerPolicy="no-referrer"
                className="h-14 pixelated object-contain transform hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="font-pixel text-[11px] text-[#FDF6E3] ml-2 block">
                COZY PIXEL
              </span>
            </div>
            <p className="font-sans text-base text-[#FDF6E3]/80 leading-relaxed font-bold max-w-sm">
              Indonesian-made pixel farming 🇮🇩. Grow your fields, collect coins, and compete with farmers around the world right from your browser for free!
            </p>
          </div>

          {/* Center Column: Sitemap Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-3">
              <span className="font-pixel text-[9px] text-[#E8A838] tracking-widest uppercase mb-1 font-bold">
                Navigation
              </span>
              <button
                onClick={() => scrollToSection("how-to-play")}
                id="footer-nav-how-to-play"
                className="text-left font-sans text-sm font-semibold text-[#FDF6E3]/80 hover:text-[#50e6db]"
              >
                How to Play
              </button>
              <button
                onClick={() => scrollToSection("features")}
                id="footer-nav-features"
                className="text-left font-sans text-sm font-semibold text-[#FDF6E3]/80 hover:text-[#50e6db]"
              >
                Game Features
              </button>
              <button
                onClick={() => scrollToSection("leaderboard")}
                id="footer-nav-leaderboard"
                className="text-left font-sans text-sm font-semibold text-[#FDF6E3]/80 hover:text-[#50e6db]"
              >
                Leaderboard
              </button>
            </div>

            <div className="flex flex-col space-y-3">
              <span className="font-pixel text-[9px] text-[#E8A838] tracking-widest uppercase mb-1 font-bold">
                Community
              </span>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-community-discord"
                className="text-left font-sans text-sm font-semibold text-[#FDF6E3]/80 hover:text-[#50e6db]"
              >
                Discord
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-community-twitter"
                className="text-left font-sans text-sm font-semibold text-[#FDF6E3]/80 hover:text-[#50e6db]"
              >
                Twitter / X
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-community-instagram"
                className="text-left font-sans text-sm font-semibold text-[#FDF6E3]/80 hover:text-[#50e6db]"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Right Column: Social Button Handles */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end space-y-4">
            <span className="font-pixel text-[9px] text-[#E8A838] tracking-widest uppercase mb-1 font-bold">
              Contact Us
            </span>
            <div className="flex space-x-3">
              {/* Discord */}
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-discord"
                className="w-10 h-10 bg-[#1a2e0f] border-2 border-[#FDF6E3] hover:bg-[#E8A838] hover:text-[#1a2e0f] hover:border-[#1a2e0f] flex items-center justify-center transition-pixel shadow-[3px_3px_0px_rgba(253,246,227,0.1)] active:translate-y-0.5"
                title="Discord"
              >
                <MessageSquare className="w-5 h-5" />
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-twitter"
                className="w-10 h-10 bg-[#1a2e0f] border-2 border-[#FDF6E3] hover:bg-[#E8A838] hover:text-[#1a2e0f] hover:border-[#1a2e0f] flex items-center justify-center transition-pixel shadow-[3px_3px_0px_rgba(253,246,227,0.1)] active:translate-y-0.5"
                title="Twitter / X"
              >
                <Twitter className="w-5 h-5" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-instagram"
                className="w-10 h-10 bg-[#1a2e0f] border-2 border-[#FDF6E3] hover:bg-[#E8A838] hover:text-[#1a2e0f] hover:border-[#1a2e0f] flex items-center justify-center transition-pixel shadow-[3px_3px_0px_rgba(253,246,227,0.1)] active:translate-y-0.5"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Back to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              id="footer-back-to-top-btn"
              className="mt-4 font-pixel text-[8px] py-2 px-3 border-2 border-[#FDF6E3]/40 hover:border-[#E8A838] flex items-center space-x-1 hover:text-[#E8A838] active:translate-y-[1px]"
            >
              <ArrowUp className="w-3 h-3" />
              <span>BACK TO TOP</span>
            </button>
          </div>

        </div>

        {/* Lower footer row info */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#FDF6E3]/60 font-medium">
          <p className="text-center sm:text-left mb-4 sm:mb-0">
            © {new Date().getFullYear()} Cozy Pixel Farm. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <span className="hover:text-[#E8A838] cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-[#E8A838] cursor-pointer">Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
