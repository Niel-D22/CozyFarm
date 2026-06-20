export function startBackgroundMusic(scene) {
  if (!scene.cache.audio.exists("farm-music")) {
    console.warn('"farm-music" audio not in cache.');
    return;
  }

  let backgroundMusic = scene.registry.get("farm-background-music");

  if (!backgroundMusic) {
    backgroundMusic = scene.sound.add("farm-music", {
      loop: true,
      volume: 1,
    });

    scene.registry.set("farm-background-music", backgroundMusic);
  }

  const playMusic = async () => {
    try {
      const context = scene.sound.context;

      if (context && context.state === "suspended") {
        await context.resume();
      }

      if (!backgroundMusic.isPlaying) {
        backgroundMusic.play();
      }
    } catch (error) {
      console.warn("Failed to play music:", error);
    }
  };

  window.addEventListener("pointerdown", playMusic);
  window.addEventListener("touchstart", playMusic);
  window.addEventListener("keydown", playMusic);
  window.addEventListener("unlock-game-audio", playMusic);

  if (scene.sound.context?.state === "running") {
    playMusic();
  }

  scene.events.once("shutdown", () => {
    window.removeEventListener("pointerdown", playMusic);
    window.removeEventListener("touchstart", playMusic);
    window.removeEventListener("keydown", playMusic);
    window.removeEventListener("unlock-game-audio", playMusic);
  });
}
