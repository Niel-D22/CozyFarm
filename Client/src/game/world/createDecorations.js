import { OBJECT_SCALE, TERRAIN_SCALE } from "../config/layoutConfig";
import { depthForY } from "../helpers/depth";

export function createDecorations(scene) {
  // Existing decorations
  placeDecorAt(scene, 205, 255, "bush_green", 0.82);
  placeDecorAt(scene, 350, 250, "crystal_teal", 0.68);

  placeDecorAt(scene, 245, 500, "log_small", 0.9);
  placeDecorAt(scene, 290, 525, "bush_green", 0.72);
  placeDecorAt(scene, 620, 490, "leaf_plant", 0.68);

  placeDecorAt(scene, 565, 245, "leaf_plant", 0.78);
  placeDecorAt(scene, 885, 315, "bush_green", 0.82);
  placeDecorAt(scene, 915, 330, "stone_small", 0.72);

  placeDecorAt(scene, 845, 385, "leaf_plant", 0.78);
  placeDecorAt(scene, 1080, 360, "crystal_teal", 0.75);

  placeDecorAt(scene, 1100, 405, "stone_large", 0.85);
  placeDecorAt(scene, 1120, 430, "stone_small", 0.78);

  placeDecorAt(scene, 900, 505, "bush_green", 0.82);

  placeDecorAt(scene, 500, 555, "bush_green", 0.68);
  placeDecorAt(scene, 745, 555, "leaf_plant", 0.68);

  // New decorations to utilize unused assets
  // 1. Fruits under trees
  placeFruitAt(scene, 150, 420, "fruit_small");
  placeFruitAt(scene, 280, 230, "fruit_medium");
  placeFruitAt(scene, 950, 250, "fruit_large");
  placeFruitAt(scene, 100, 310, "fruit_small");
  placeFruitAt(scene, 1120, 270, "fruit_medium");

  // 2. Unused Grass Wisps
  placeFruitAt(scene, 300, 150, "grass_wisp_1");
  placeFruitAt(scene, 400, 120, "grass_wisp_2");
  placeFruitAt(scene, 800, 130, "grass_wisp_3");
  placeFruitAt(scene, 1000, 160, "grass_wisp_4");
  placeFruitAt(scene, 150, 550, "grass_wisp_5");
  placeFruitAt(scene, 350, 600, "grass_wisp_6");
  placeFruitAt(scene, 850, 620, "grass_wisp_7");
  placeFruitAt(scene, 1050, 580, "grass_wisp_8");
  placeFruitAt(scene, 600, 650, "grass_wisp_12");
  placeFruitAt(scene, 480, 620, "grass_wisp_13");

  // 3. Wood fence decorative corner/t-junction (bottom right, below pond)
  placeDecorAt(scene, 1050, 620, "fence_corner_a", 1);
  placeDecorAt(scene, 1080, 620, "fence_wood", 1);
  placeDecorAt(scene, 1110, 620, "fence_t", 1);
  placeDecorAt(scene, 1140, 620, "fence_corner_b", 1);

  // 4. Stone fence decorative section (bottom left, below farm)
  placeDecorAt(scene, 150, 600, "fence_stone", 1);
  placeDecorAt(scene, 180, 600, "fence_stone", 1);
}

function placeDecorAt(scene, x, y, frameName, scale = 1) {
  const worldX = scene.worldX(x);
  const worldY = scene.worldY(y);
  return scene.add
    .image(worldX, worldY, "objects", frameName)
    .setOrigin(0.5, 1)
    .setScale(OBJECT_SCALE * scale)
    .setDepth(depthForY(worldY));
}

function placeFruitAt(scene, x, y, frameName) {
  const worldX = scene.worldX(x);
  const worldY = scene.worldY(y);
  return scene.add
    .image(worldX, worldY, "terrain", frameName)
    .setOrigin(0.5, 1)
    .setScale(TERRAIN_SCALE)
    .setDepth(depthForY(worldY));
}

