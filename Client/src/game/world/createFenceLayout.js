import { OBJECT_SCALE } from "../config/layoutConfig";
import { depthForY } from "../helpers/depth";

export function createFenceLayout(scene) {
  scene.fenceColliders = [];

  const farmFence = [
    [450, 245, "post_single"],
    [470, 255, "log_diag_1"],
    [490, 265, "post_single"],
    [510, 275, "log_diag_1"],
    [530, 285, "post_single"],
    [550, 295, "log_diag_1"],
    [570, 305, "post_single"],
    [590, 315, "log_diag_1"],
    [610, 325, "post_single"],
    [630, 335, "log_diag_1"],
    [650, 345, "post_single"],
    [670, 355, "log_diag_1"],
    [690, 365, "post_single"],

    [430, 255, "log_diag_2"],
    [410, 265, "post_single"],
    [390, 275, "log_diag_2"],
    [370, 285, "post_single"],
    [350, 295, "log_diag_2"],
    [330, 305, "post_single"],
    [310, 315, "log_diag_2"],
    [290, 325, "post_single"],

    [310, 335, "log_diag_1"],
    [330, 345, "post_single"],
    [350, 355, "log_diag_1"],
    [370, 365, "post_single"],
    [390, 375, "log_diag_1"],
    [410, 385, "post_single"],
    [430, 395, "log_diag_1"],
    [450, 405, "post_single"],
    [470, 415, "log_diag_1"],
    [490, 425, "post_single"],
    [510, 435, "log_diag_1"],
    [530, 445, "post_single"],

    [670, 375, "log_diag_2"],
    [650, 385, "post_single"],
    [630, 395, "log_diag_2"],
    [610, 405, "post_single"],

    [570, 425, "post_single"],
    [550, 435, "log_diag_2"],
    [530, 445, "post_single"],
  ];

  const leftTopFence = [
    [170, 255, "post_single"],
    [190, 265, "log_diag_1"],
    [210, 275, "post_single"],
    [230, 285, "log_diag_1"],
    [250, 295, "post_single"],
  ];

  const farmFenceShifted = farmFence.map(([x, y, frameName]) => [
    x,
    y + 20,
    frameName,
  ]);

  const allFences = [...leftTopFence, ...farmFenceShifted];

  allFences.forEach(([x, y, frameName]) => {
    createFencePiece(scene, x, y, frameName);
  });
}

function createFencePiece(scene, x, y, frameName, collision = true) {
  const worldX = scene.worldX(x);
  const worldY = scene.worldY(y);

  scene.add
    .image(worldX, worldY, "objects", frameName)
    .setOrigin(0.5, 1)
    .setScale(OBJECT_SCALE)
    .setDepth(depthForY(worldY, 0.1));

  if (!collision) return;

  const collider = scene.add.zone(worldX, worldY - 6, 18, 12);

  scene.physics.add.existing(collider, true);
  scene.fenceColliders.push(collider);
}
