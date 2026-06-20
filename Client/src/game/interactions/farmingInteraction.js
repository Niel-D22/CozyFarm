import Phaser from "phaser";
import GameState from "../systems/GameState";
import { showPlantMenu } from "./plantMenu";
import { depthForY } from "../helpers/depth";

export function handlePlotInteraction(scene, plot) {
  const cropY = plot.y - 13;
  if (plot.state === "empty") {
    const turnipSeed = GameState.inventory.turnip_seed;
    const potatoSeed = GameState.inventory.potato_seed;
    if (turnipSeed === 0 && potatoSeed === 0) {
      scene.showFloatingText(
        scene.player.x,
        scene.player.y - 20,
        "Tidak ada benih!",
        "#ef4444",
      );
      return;
    }
    showPlantMenu(scene, plot);
    return;
  }
  if (plot.state === "planted") {
    if (GameState.energy < 5) {
      scene.showFloatingText(
        scene.player.x,
        scene.player.y - 20,
        "Tenaga habis!",
        "#ef4444",
      );
      return;
    }
    plot.state = "watered";
    GameState.energy -= 5;
    GameState.hasWateredToday = true;
    scene.updatePlotSprite(plot);
    const splash = scene.add
      .circle(plot.x, cropY, 12, 0x3b82f6, 0.7)
      .setDepth(depthForY(plot.y, 0.2));
    scene.tweens.add({
      targets: splash,
      scaleX: 2,
      scaleY: 2,
      alpha: 0,
      duration: 400,
      onComplete: () => {
        splash.destroy();
      },
    });
    scene.showFloatingText(plot.x, cropY - 15, "Disiram", "#60a5fa");
    return;
  }
  if (plot.state === "ready") {
    const crop = plot.crop;
    GameState.inventory[crop] += 1;
    plot.state = "empty";
    plot.crop = null;
    plot.daysGrown = 0;
    scene.updatePlotSprite(plot);
    GameState.addProgress(2, 1);
    const cropName = crop === "turnip" ? "Lobak" : "Kentang";
    scene.showFloatingText(plot.x, cropY - 15, `+1 ${cropName}`, "#4ade80");
    for (let index = 0; index < 5; index += 1) {
      const sparkle = scene.add
        .circle(plot.x, cropY, 3, 0xfef08a, 0.9)
        .setDepth(depthForY(plot.y, 0.2));
      const randomX = Phaser.Math.Between(-40, 40);
      const randomY = Phaser.Math.Between(-40, 40);
      scene.tweens.add({
        targets: sparkle,
        x: plot.x + randomX,
        y: cropY + randomY,
        alpha: 0,
        duration: 500,
        onComplete: () => {
          sparkle.destroy();
        },
      });
    }
  }
}
