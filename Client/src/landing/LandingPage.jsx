import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsRow from "./components/StatsRow";
import Features from "./components/Features";
import HowToPlay from "./components/HowToPlay";
import Leaderboard from "./components/Leaderboard";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import WalletModal from "./components/WalletModal";
import { useNavigate } from "react-router-dom";
import "./landing.css";

export default function LandingPage() {
  const [isWalletModalOpen, setIsWalletModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = React.useState(false);

  // Global Scroll Reveal observer
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const revealElements = document.querySelectorAll(".reveal-section");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handlePlayNow = () => {
    setIsExiting(true);
    // Wait for fade-out animation (500ms) before navigation
    setTimeout(() => {
      navigate("/game");
    }, 500);
  };

  return (
    <div className={`min-h-screen bg-[#FDF6E3] overflow-x-hidden selection:bg-[#E8A838] selection:text-[#1a2e0f] ${isExiting ? 'fade-out' : ''}`}>
      
      {/* 1. Header & Navigation */}
      <Navbar onConnectWallet={() => setIsWalletModalOpen(true)} />

      {/* 2. Hero Section */}
      <Hero onExplore={handlePlayNow} />

      {/* 3. Real-time Status Panel */}
      <div className="reveal-section reveal-hidden">
        <StatsRow />
      </div>

      {/* 4. Gamified Features */}
      <div className="reveal-section reveal-hidden">
        <Features />
      </div>

      {/* 5. How To Play Onboarding Guide */}
      <div className="reveal-section reveal-hidden">
        <HowToPlay />
      </div>

      {/* 6. High-Contrast Leaderboard table preview */}
      <div className="reveal-section reveal-hidden">
        <Leaderboard />
      </div>

      {/* 7. Call To Action container panel */}
      <div className="reveal-section reveal-hidden">
        <CTA onPlayNow={handlePlayNow} />
      </div>

      {/* 8. Footer Section */}
      <Footer />

      {/* 9. Interactive Web3 Wallet Alert overlay */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

    </div>
  );
}

