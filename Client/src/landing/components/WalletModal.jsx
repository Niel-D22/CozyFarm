import { motion, AnimatePresence } from "motion/react";
import React from "react";

export default function WalletModal({ isOpen, onClose }) {
  // Prevent backgrounds scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1a2e0f]/80 backdrop-blur-xs cursor-zoom-out"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md bg-[#FDF6E3] border-4 border-[#1a2e0f] pixel-shadow-dark p-6 text-center select-none z-10"
          >
            {/* Close button top right */}
            <button
              onClick={onClose}
              id="close-wallet-modal-btn"
              className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 font-pixel text-sm bg-[#E8A838] border-2 border-[#1a2e0f] text-[#1a2e0f] hover:bg-[#4ECDC4] active:translate-y-0.5 transition-pixel"
              title="Close"
            >
              X
            </button>

            {/* CozyPixel Logo in Modal */}
            <div className="flex justify-center mb-4 mt-2">
              <img
                src="/assets/CozyPixel.png"
                alt="Cozy Pixel Farm Logo"
                referrerPolicy="no-referrer"
                className="pixelated object-contain max-h-16"
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <h3 className="font-pixel text-lg text-[#1a2e0f] leading-snug mb-3 tracking-wide">
              CONNECT WALLET
            </h3>

            {/* Construction Sign Area */}
            <div className="bg-[#8DB87A]/30 border-2 border-dashed border-[#1a2e0f] p-4 my-4 flex flex-col items-center">
              <span className="text-4xl mb-2 animate-bounce">🚧</span>
              <p className="font-sans font-bold text-base text-[#1a2e0f]">
                Phantom and Solflare wallet support coming soon!
              </p>
            </div>

            <p className="font-sans text-[#1a2e0f]/80 text-sm mb-6 leading-relaxed">
              Stay tuned to our Discord for the latest blockchain updates & beta tester airdrop surprises.
            </p>

            {/* Close action */}
            <button
              onClick={onClose}
              id="close-wallet-modal-primary-btn"
              className="w-full font-pixel text-xs py-3 px-4 bg-[#1a2e0f] text-[#FDF6E3] border-2 border-[#1a2e0f] hover:bg-[#2D4A1E] transition-pixel active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              CLOSE
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
