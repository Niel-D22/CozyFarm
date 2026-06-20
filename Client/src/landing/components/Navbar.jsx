import { Menu, X, MessageSquare, Wallet } from "lucide-react";
import React from "react";

export default function Navbar({ onConnectWallet }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
        ? "bg-[#2D4A1E] border-b-4 border-[#1a2e0f] py-2 shadow-md"
        : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img
              src="/assets/CozyPixel.png"
              alt="Cozy Pixel Farm Logo"
              referrerPolicy="no-referrer"
              className="h-14 sm:h-16 pixelated object-contain transition-transform hover:scale-105"
              onError={(e) => {
                // Return text logo fallback
                e.currentTarget.style.display = "none";
              }}
            />
            {/* Fallback text if logo fails to load */}
            <span className="font-pixel text-[10px] text-[#FDF6E3] ml-2 block sm:hidden">
              COZY PIXEL
            </span>
          </div>

          {/* Desktop Links (Center) */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => scrollToSection("how-to-play")}
              id="nav-btn-how-to-play"
              className="font-pixel text-[11px] text-[#FDF6E3] hover:text-[#E8A838] transition-colors relative py-1 group"
            >
              How to Play
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#E8A838] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left steps(4)" />
            </button>
            <button
              onClick={() => scrollToSection("features")}
              id="nav-btn-features"
              className="font-pixel text-[11px] text-[#FDF6E3] hover:text-[#E8A838] transition-colors relative py-1 group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#E8A838] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left steps(4)" />
            </button>
            <button
              onClick={() => scrollToSection("leaderboard")}
              id="nav-btn-leaderboard"
              className="font-pixel text-[11px] text-[#FDF6E3] hover:text-[#E8A838] transition-colors relative py-1 group"
            >
              Leaderboard
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#E8A838] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left steps(4)" />
            </button>
          </div>

          {/* Desktop Actions (Right) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Discord - Outlined Pixel Style */}
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-discord-link"
              className="flex items-center space-x-2 font-pixel text-[10px] py-2 px-3 border-2 border-[#FDF6E3] text-[#FDF6E3] hover:bg-[#FDF6E3] hover:text-[#1a2e0f] hover:scale-105 active:scale-95 transition-pixel"
            >
              <MessageSquare className="w-4 h-4" />
              <span>DISCORD</span>
            </a>

            {/* Hubungkan Dompet - Filled golden green with offset shadow */}
            <button
              onClick={onConnectWallet}
              id="nav-connect-wallet-btn"
              className="flex items-center space-x-2 font-pixel text-[10px] py-2 px-4 bg-[#E8A838] text-[#1a2e0f] border-2 border-[#1a2e0f] shadow-[3px_3px_0px_#1a2e0f] hover:bg-[#4ECDC4] hover:shadow-[1px_1px_0px_#1a2e0f] hover:translate-x-[2px] hover:translate-y-[2px] transition-pixel active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              <Wallet className="w-4 h-4" />
              <span>CONNECT WALLET</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="nav-hamburger-toggle"
              className="p-2 border-2 border-[#FDF6E3] text-[#FDF6E3] bg-[#1a2e0f]/50 hover:bg-[#E8A838] hover:text-[#1a2e0f] transition-pixel"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Pixel Menu overlay) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1a2e0f] border-b-4 border-[#E8A838] p-4 absolute top-20 left-0 right-0 shadow-lg">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("how-to-play")}
              id="mobile-nav-btn-how-to-play"
              className="text-left font-pixel text-xs text-[#FDF6E3] py-2 border-b-2 border-dashed border-[#FDF6E3]/20 hover:text-[#E8A838]"
            >
              How to Play
            </button>
            <button
              onClick={() => scrollToSection("features")}
              id="mobile-nav-btn-features"
              className="text-left font-pixel text-xs text-[#FDF6E3] py-2 border-b-2 border-dashed border-[#FDF6E3]/20 hover:text-[#E8A838]"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("leaderboard")}
              id="mobile-nav-btn-leaderboard"
              className="text-left font-pixel text-xs text-[#FDF6E3] py-2 border-b-2 border-dashed border-[#FDF6E3]/20 hover:text-[#E8A838]"
            >
              Leaderboard
            </button>

            <div className="flex flex-col space-y-3 pt-2">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                id="mobile-discord-link"
                className="flex items-center justify-center space-x-2 font-pixel text-[11px] py-3 px-4 border-2 border-[#FDF6E3] text-[#FDF6E3]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>DISCORD</span>
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onConnectWallet();
                }}
                id="mobile-connect-wallet-btn"
                className="flex items-center justify-center space-x-2 font-pixel text-[11px] py-3 px-4 bg-[#E8A838] text-[#1a2e0f] border-2 border-[#1a2e0f]"
              >
                <Wallet className="w-4 h-4" />
                <span>CONNECT WALLET</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
