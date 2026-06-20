import { WORLD_WIDTH, WORLD_HEIGHT } from "../config/layoutConfig";

export function createIsland(scene) {
  scene.add.rectangle(0, 0, WORLD_WIDTH, WORLD_HEIGHT, 0x6fae4a)
    .setOrigin(0, 0)
    .setDepth(0);
}

