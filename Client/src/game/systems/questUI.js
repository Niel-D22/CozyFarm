export function showQuestCompleteBanner(scene, title) {
  const screenWidth = scene.scale.width;
  const banner = scene.add.container(screenWidth / 2, -60).setDepth(800);

  const bg = scene.add.graphics();
  bg.fillStyle(0xf5c45e, 1);
  bg.fillRoundedRect(-180, -25, 360, 52, 8);
  bg.lineStyle(2, 0x78350f, 1);
  bg.strokeRoundedRect(-180, -25, 360, 52, 8);
  banner.add(bg);

  const checkText = scene.add
    .text(0, -10, "✅ Quest Completed!", {
      fontSize: "11px",
      fontFamily: "'Press Start 2P', monospace",
      color: "#78350f",
      fontStyle: "bold",
    })
    .setOrigin(0.5);

  const titleText = scene.add
    .text(0, 11, title, {
      fontSize: "12px",
      fontFamily: "Arial",
      color: "#000000",
      fontStyle: "bold",
    })
    .setOrigin(0.5);

  banner.add([checkText, titleText]);

  scene.tweens.add({
    targets: banner,
    y: 50,
    duration: 500,
    ease: "Back.easeOut",
    onComplete: () => {
      scene.time.delayedCall(2500, () => {
        if (banner) {
          scene.tweens.add({
            targets: banner,
            y: -60,
            duration: 400,
            ease: "Power1",
            onComplete: () => {
              banner.destroy();
            },
          });
        }
      });
    },
  });
}
