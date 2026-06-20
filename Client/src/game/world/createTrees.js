import { TREE_SCALE } from "../config/layoutConfig";
import { depthForY } from "../helpers/depth";

export function createTrees(scene) {
  // KIRI ATAS
  placeTreeAt(scene, 125, 415, 1.08);
  placeTreeAt(scene, 265, 220, 0.78);

  // KANAN AREA RUMAH
  placeTreeAt(scene, 930, 245, 0.98);
  placeTreeAt(scene, 1090, 290, 0.88);
  placeTreeAt(scene, 1150, 310, 0.72);
}

function placeTreeAt(scene, x, y, scale = 1) {
  const worldX = scene.worldX(x);
  const worldY = scene.worldY(y);
  const tree = scene.add
    .image(worldX, worldY, "terrain", "tree_full")
    .setOrigin(0.5, 1)
    .setScale(TREE_SCALE * scale)
    .setDepth(depthForY(worldY, 0.05));
  const collider = scene.add.zone(worldX, worldY - 9, 35, 20);
  scene.physics.add.existing(collider, true);
  scene.treeColliders.push(collider);
  return tree;
}
