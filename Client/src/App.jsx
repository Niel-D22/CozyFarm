import { useEffect, useState } from "react";
import GameCanvas from "./components/GameCanvas";
import FloatingMenu from "./components/ui/FloatingMenu";
import GuidePanel from "./components/ui/GuidePanel";
import SettingsPanel from "./components/ui/SettingsPanel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./landing/LandingPage";

function Game() {
  const [activePanel, setActivePanel] = useState(null);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("game-volume");
    return savedVolume ? Number(savedVolume) : 80;
  });
  const [sfxEnabled, setSfxEnabled] = useState(() => {
    const savedSfx = localStorage.getItem("game-sfx");
    return savedSfx !== "false";
  });

  useEffect(() => {
    function closeOverlay() {
      setActivePanel(null);
    }

    function handleKeyboard(event) {
      // ESC key closes overlay if open
      if (event.key === "Escape") {
        closeOverlay();
      }
    }

    window.addEventListener("close-game-overlay", closeOverlay);
    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("close-game-overlay", closeOverlay);
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("game-volume", String(volume));
    localStorage.setItem("game-sfx", String(sfxEnabled));
    window.dispatchEvent(
      new CustomEvent("game-audio-settings", {
        detail: {
          volume: volume / 100,
          sfxEnabled,
        },
      }),
    );
  }, [volume, sfxEnabled]);

  const closePanel = () => setActivePanel(null);
  const openGuide = () => setActivePanel("guide");
  const openSettings = () => setActivePanel("settings");

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-emerald-950 text-white">
      {/* Game langsung berjalan */}
      <div className="absolute inset-0">
        <GameCanvas />
      </div>

      <FloatingMenu openGuide={openGuide} />

      {/* Overlay gelap */}
      {activePanel && (
        <div
          className="absolute inset-0 z-[200] flex items-center justify-center bg-slate-950/75 p-5 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePanel();
            }
          }}
        >
          {activePanel === "guide" && <GuidePanel closePanel={closePanel} />}
          {activePanel === "settings" && (
            <SettingsPanel
              closePanel={closePanel}
              volume={volume}
              setVolume={setVolume}
              sfxEnabled={sfxEnabled}
              setSfxEnabled={setSfxEnabled}
            />
          )}
        </div>
      )}
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}
