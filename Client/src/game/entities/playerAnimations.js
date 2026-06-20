import { PLAYER_CONFIG } from "../config/assetConfig";

export function createPlayerAnimations(scene) {
  if (scene.anims.exists("walk-down")) {
    scene.player.play("idle-down");
    return;
  }
  const frameRate = 8;
  const animations = PLAYER_CONFIG.anims;
  ["down", "left", "right", "up"].forEach((direction) => {
    scene.anims.create({
      key: `idle-${direction}`,
      frames: scene.anims.generateFrameNumbers("player-idle", {
        start: animations[direction][0],
        end: animations[direction][1],
      }),
      frameRate,
      repeat: -1,
    });
    scene.anims.create({
      key: `walk-${direction}`,
      frames: scene.anims.generateFrameNumbers("player-walk", {
        start: animations[direction][0],
        end: animations[direction][1],
      }),
      frameRate,
      repeat: -1,
    });
  });
  scene.player.play("idle-down");
}
