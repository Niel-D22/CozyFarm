import { HOUSE_SCALE } from "../config/layoutConfig";
import { depthForY } from "../helpers/depth";

export function createHouse(scene) {
  const houseX = scene.worldX(745);
  const houseY = scene.worldY(300);

  scene.house = scene.add
    .image(houseX, houseY, "house")
    .setOrigin(0.5, 1)
    .setScale(HOUSE_SCALE)
    .setDepth(depthForY(houseY, -0.2));

  scene.houseCollider = scene.add.zone(houseX, houseY - 30, 150, 48);
  scene.physics.add.existing(scene.houseCollider, true);
}

