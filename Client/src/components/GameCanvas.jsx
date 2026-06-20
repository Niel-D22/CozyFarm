import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import BootScene from "../game/scenes/BootScene";
import MenuScene from "../game/scenes/MenuScene";
import FarmScene from "../game/scenes/FarmScene";
import HUDScene from "../game/scenes/HUDScene";
import UIScene from "../game/scenes/UIScene";

export default function GameCanvas() {
  const containerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) {
      return;
    }

    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: containerRef.current,
      pixelArt: true,
      roundPixels: true,
      backgroundColor: "#2d5a1b",
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      // Load all scenes into the global SceneManager
      scene: [BootScene, MenuScene, FarmScene, HUDScene, UIScene],
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    // Window resize handler
    const handleResize = () => {
      if (gameRef.current) {
        gameRef.current.scale.resize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
      id="phaser-game-container"
    />
  );
}
