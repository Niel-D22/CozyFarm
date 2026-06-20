import GameState from "./GameState";

export function triggerSleep(scene) {
  GameState.day += 1;
  GameState.energy = 100;

  GameState.plots.forEach((plot) => {
    if (plot.state === "watered") {
      plot.daysGrown += 1;
      if (plot.daysGrown >= plot.growthDays[plot.crop]) {
        plot.state = "ready";
      } else {
        plot.state = "planted";
      }
    } else if (plot.state === "planted") {
      // Dry plot, does not grow today
    }
  });

  if (GameState.hasWateredToday) {
    GameState.wateredStreak += 1;
    GameState.addProgress(1, 1);
  } else {
    GameState.wateredStreak = 0;
  }
  GameState.hasWateredToday = false;

  const screenWidth = scene.scale.width;
  const screenHeight = scene.scale.height;

  const transitionBg = scene.add
    .rectangle(0, 0, screenWidth, screenHeight, 0x000000, 0)
    .setOrigin(0)
    .setDepth(500);

  const transitionText = scene.add
    .text(
      screenWidth / 2,
      screenHeight / 2,
      `☀ Day ${GameState.day} starts...`,
      {
        fontSize: "20px",
        fontFamily: "'Press Start 2P', monospace",
        color: "#ffffff",
      },
    )
    .setOrigin(0.5)
    .setDepth(501)
    .setAlpha(0);

  scene.tweens.add({
    targets: transitionBg,
    fillAlpha: 0.9,
    duration: 500,
    yoyo: true,
    hold: 1000,
    repeat: 0,
    onYoyo: () => {
      scene.updateHUDText();
      const farmScene = scene.scene.get("FarmScene");
      if (farmScene) {
        GameState.plots.forEach((plot) => {
          farmScene.updatePlotSprite(plot);
        });
        farmScene.cameras.main.fadeIn(600, 0, 0, 0);
        farmScene.showFloatingText(
          farmScene.player.x,
          farmScene.player.y - 30,
          `Day ${GameState.day}`,
          "#e8a838",
        );
      }
    },
    onComplete: () => {
      transitionBg.destroy();
    },
  });

  scene.tweens.add({
    targets: transitionText,
    alpha: 1,
    duration: 500,
    yoyo: true,
    hold: 1000,
    repeat: 0,
    onComplete: () => {
      transitionText.destroy();
    },
  });
}
