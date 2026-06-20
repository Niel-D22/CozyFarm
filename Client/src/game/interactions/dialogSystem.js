import GameState from "../systems/GameState";

export function showDialog(scene) {
  if (scene.dialogOpen) {
    return;
  }
  scene.dialogOpen = true;
  scene.movementLocked = true;
  scene.player.setVelocity(0, 0);
  scene.player.anims.play(`idle-${scene.lastDir}`);
  GameState.addProgress(4);

  const lines = [
    "Hey, you finally arrived. This farm needs a little attention.",
    "Start by planting some seeds in the available plots.",
    "If you need any help, just come see me again.",
  ];
  let lineIndex = 0;
  const camera = scene.cameras.main;
  const screenWidth = camera.width;
  const screenHeight = camera.height;
  const dialogWidth = Math.min(screenWidth - 80, 720);
  const dialogHeight = 140;
  const dialogX = screenWidth / 2 - dialogWidth / 2;
  const dialogY = screenHeight * 0.72 - dialogHeight / 2;

  const dialogBackground = scene.add
    .graphics()
    .setScrollFactor(0)
    .setDepth(20000);
  dialogBackground.fillStyle(0x0f172a, 0.97);
  dialogBackground.fillRoundedRect(
    dialogX,
    dialogY,
    dialogWidth,
    dialogHeight,
    16,
  );
  dialogBackground.lineStyle(2.5, 0xe8a838, 1);
  dialogBackground.strokeRoundedRect(
    dialogX,
    dialogY,
    dialogWidth,
    dialogHeight,
    16,
  );

  const nameText = scene.add
    .text(dialogX + 24, dialogY + 18, "Friend", {
      fontSize: "15px",
      fontStyle: "bold",
      color: "#f5c45e",
      fontFamily: "Arial",
    })
    .setScrollFactor(0)
    .setDepth(20001);

  const dialogText = scene.add
    .text(dialogX + 24, dialogY + 50, "", {
      fontSize: "13px",
      color: "#ffffff",
      fontFamily: "Arial",
      wordWrap: { width: dialogWidth - 170, useAdvancedWrap: true },
      lineSpacing: 5,
    })
    .setScrollFactor(0)
    .setDepth(20001);

  const buttonWidth = 110;
  const buttonHeight = 28;
  const buttonX = dialogX + dialogWidth - buttonWidth - 24;
  const buttonY = dialogY + dialogHeight - buttonHeight - 16;

  const buttonBackground = scene.add
    .graphics()
    .setScrollFactor(0)
    .setDepth(20002);
  buttonBackground.fillStyle(0xe8a838, 1);
  buttonBackground.fillRoundedRect(
    buttonX,
    buttonY,
    buttonWidth,
    buttonHeight,
    8,
  );

  const buttonText = scene.add
    .text(buttonX + buttonWidth / 2, buttonY + buttonHeight / 2, "Next", {
      fontSize: "11px",
      color: "#ffffff",
      fontStyle: "bold",
      fontFamily: "Arial",
    })
    .setOrigin(0.5)
    .setScrollFactor(0)
    .setDepth(20003);

  const hintText = scene.add
    .text(dialogX + 24, dialogY + dialogHeight - 28, "Press E to continue", {
      fontSize: "11px",
      color: "#94a3b8",
      fontFamily: "Arial",
      fontStyle: "italic",
    })
    .setScrollFactor(0)
    .setDepth(20001);

  let typeTimer = null;
  const typewriteLine = (text) => {
    dialogText.setText("");
    let characterIndex = 0;
    if (typeTimer) {
      typeTimer.remove();
    }
    typeTimer = scene.time.addEvent({
      delay: 28,
      repeat: text.length - 1,
      callback: () => {
        dialogText.setText(text.substring(0, characterIndex + 1));
        characterIndex += 1;
      },
    });
  };
  typewriteLine(lines[0]);

  const buttonZone = scene.add
    .zone(
      buttonX + buttonWidth / 2,
      buttonY + buttonHeight / 2,
      buttonWidth,
      buttonHeight,
    )
    .setScrollFactor(0)
    .setDepth(20004)
    .setInteractive({ useHandCursor: true });

  const advanceDialogue = () => {
    lineIndex += 1;
    if (lineIndex < lines.length) {
      typewriteLine(lines[lineIndex]);
      if (lineIndex === lines.length - 1) {
        buttonText.setText("Close");
      }
      return;
    }
    if (typeTimer) {
      typeTimer.remove();
    }
    dialogBackground.destroy();
    nameText.destroy();
    dialogText.destroy();
    buttonBackground.destroy();
    buttonText.destroy();
    buttonZone.destroy();
    hintText.destroy();
    scene.events.off("advance-dialog", advanceDialogue);
    scene.time.delayedCall(100, () => {
      scene.dialogOpen = false;
      scene.movementLocked = false;
    });
    GameState.inventory.turnip_seed += 3;
    scene.showFloatingText(
      scene.friend.x,
      scene.friend.y - 40,
      "+3 Turnip Seeds",
      "#f5c45e",
    );
  };
  buttonZone.on("pointerup", advanceDialogue);
  scene.events.on("advance-dialog", advanceDialogue);
}
