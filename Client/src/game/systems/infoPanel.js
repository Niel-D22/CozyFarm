export function toggleInfoPanel(scene) {
  if (scene.infoPanelOpen) {
    scene.infoPanel.forEach((obj) => obj.destroy());
    scene.infoPanel = [];
    scene.infoPanelOpen = false;

    // Unlock FarmScene controls
    const farmScene = scene.scene.get("FarmScene");
    if (farmScene) farmScene.movementLocked = false;
    return;
  }

  scene.infoPanelOpen = true;
  scene.infoPanel = [];

  // Lock FarmScene controls while viewing panel
  const farmScene = scene.scene.get("FarmScene");
  if (farmScene) {
    farmScene.movementLocked = true;
    farmScene.player.setVelocity(0, 0);
    farmScene.player.anims.play("idle-down");
  }

  const sw = scene.cameras.main.width;
  const sh = scene.cameras.main.height;

  // Help panel background box
  const bg = scene.add.graphics().setScrollFactor(0).setDepth(150);
  bg.fillStyle(0x1a1a2e, 0.95);
  bg.fillRoundedRect(sw / 2 - 200, sh / 2 - 220, 400, 440, 16);
  bg.lineStyle(2, 0xe8a838);
  bg.strokeRoundedRect(sw / 2 - 200, sh / 2 - 220, 400, 440, 16);
  scene.infoPanel.push(bg);

  const title = scene.add
    .text(sw / 2, sh / 2 - 200, "📖 How to Play", {
      fontSize: "16px",
      fontStyle: "bold",
      color: "#f5c45e",
      fontFamily: "Arial",
    })
    .setOrigin(0.5)
    .setScrollFactor(0)
    .setDepth(151);
  scene.infoPanel.push(title);

  const lines = [
    "🕹️ CONTROLS",
    "WASD / ↑↓←→ : Move character",
    "E            : Interact / Speak",
    "",
    "🌱 HOW TO PLAY",
    "1. Approach brown plot → press E → choose seed",
    "2. Next day → press E → water crop",
    "3. When ripe → press E → harvest crop",
    "4. Click Cook to process harvest",
    "5. Talk to Friend for quests & rewards",
    "",
    "📋 QUESTS",
    "Complete 5 quests to win!",
    "",
    "💡 TIPS",
    "Click Sleep to go to the next day",
    "Out of energy? Sleep to recharge",
  ];

  lines.forEach((line, i) => {
    const color =
      line.startsWith("🕹️") ||
      line.startsWith("🌱") ||
      line.startsWith("📋") ||
      line.startsWith("💡")
        ? "#f5c45e"
        : "#ffffff";
    const bold = color !== "#ffffff";
    const txt = scene.add
      .text(sw / 2 - 175, sh / 2 - 165 + i * 22, line, {
        fontSize: "12px",
        color,
        fontFamily: "Arial",
        fontStyle: bold ? "bold" : "normal",
      })
      .setScrollFactor(0)
      .setDepth(151);
    scene.infoPanel.push(txt);
  });

  // Close button
  const closeBg = scene.add.graphics().setScrollFactor(0).setDepth(151);
  closeBg.fillStyle(0xe8a838);
  closeBg.fillRoundedRect(sw / 2 - 50, sh / 2 + 185, 100, 30, 8);
  scene.infoPanel.push(closeBg);

  const closeText = scene.add
    .text(sw / 2, sh / 2 + 200, "Close", {
      fontSize: "13px",
      color: "#ffffff",
      fontStyle: "bold",
      fontFamily: "Arial",
    })
    .setOrigin(0.5)
    .setScrollFactor(0)
    .setDepth(152);
  scene.infoPanel.push(closeText);

  const closeZone = scene.add
    .zone(sw / 2, sh / 2 + 200, 100, 30)
    .setScrollFactor(0)
    .setDepth(153)
    .setInteractive({ useHandCursor: true });
  closeZone.on("pointerup", () => toggleInfoPanel(scene));
  scene.infoPanel.push(closeZone);
}
