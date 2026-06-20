import { PLAYER_SCALE } from "../config/layoutConfig";
import { depthForY } from "../helpers/depth";

export function createPlayer(scene) {
  const playerX = scene.worldX(650);
  const playerY = scene.worldY(430);
  scene.player = scene.physics.add
    .sprite(playerX, playerY, "player-idle")
    .setScale(PLAYER_SCALE)
    .setCollideWorldBounds(true)
    .setDepth(depthForY(playerY));
  scene.player.body.setSize(16, 16);
  scene.player.body.setOffset(16, 28);
}
