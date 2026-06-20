import Phaser from "phaser";
import GameState from "../systems/GameState";

export function showPlantMenu(scene, plot) {
  scene.movementLocked = true;
  scene.player.setVelocity(0, 0);
  scene.player.anims.play(`idle-${scene.lastDir}`);

  const menu = scene.add.container(plot.x, plot.y - 45).setDepth(300);
  scene.activePlantMenu = menu;

  const background = scene.add.graphics();
  background.fillStyle(0x0f172a, 0.96);
  background.fillRoundedRect(-75, -30, 150, 60, 8);
  background.lineStyle(1.5, 0x475569, 1);
  background.strokeRoundedRect(-75, -30, 150, 60, 8);
  menu.add(background);

  const turnipSeed = GameState.inventory.turnip_seed;
  const potatoSeed = GameState.inventory.potato_seed;

  const turnipText = scene.add
    .text(0, -15, `1: Lobak (${turnipSeed})`, {
      fontSize: "9px",
      fontFamily: "Arial",
      color: turnipSeed > 0 ? "#ffffff" : "#64748b",
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: turnipSeed > 0 });

  const potatoText = scene.add
    .text(0, 12, `2: Kentang (${potatoSeed})`, {
      fontSize: "9px",
      fontFamily: "Arial",
      color: potatoSeed > 0 ? "#ffffff" : "#64748b",
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: potatoSeed > 0 });

  menu.add([turnipText, potatoText]);

  const closeMenu = () => {
    scene.movementLocked = false;
    scene.activePlantMenu = null;
    menu.destroy();
    scene.input.keyboard.off("keydown-ONE");
    scene.input.keyboard.off("keydown-TWO");
  };
  const plantCrop = (crop) => {
    plot.state = "planted";
    plot.crop = crop;
    plot.daysGrown = 0;
    GameState.inventory[`${crop}_seed`] -= 1;
    scene.updatePlotSprite(plot);
    GameState.addProgress(0, 1);
    const cropName = crop === "turnip" ? "Lobak" : "Kentang";
    scene.showFloatingText(
      plot.x,
      plot.y - 30,
      `${cropName} ditanam!`,
      "#cbd5e1",
    );
    closeMenu();
  };
  if (turnipSeed > 0) {
    turnipText.on("pointerdown", () => {
      plantCrop("turnip");
    });
  }
  if (potatoSeed > 0) {
    potatoText.on("pointerdown", () => {
      plantCrop("potato");
    });
  }
  scene.input.keyboard.once("keydown-ONE", () => {
    if (turnipSeed > 0) {
      plantCrop("turnip");
    }
  });
  scene.input.keyboard.once("keydown-TWO", () => {
    if (potatoSeed > 0) {
      plantCrop("potato");
    }
  });
  scene.input.once("pointerdown", (pointer) => {
    const distance = Phaser.Math.Distance.Between(
      pointer.worldX,
      pointer.worldY,
      plot.x,
      plot.y,
    );
    if (distance > 45 && scene.activePlantMenu === menu) {
      closeMenu();
    }
  });
}
