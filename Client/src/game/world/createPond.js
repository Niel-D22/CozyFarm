import { point } from "../helpers/geometry";

export function createPond(scene) {
  const pondSidePoints = [
    point(scene.worldX(815), scene.worldY(425)),
    point(scene.worldX(1015), scene.worldY(370)),
    point(scene.worldX(1125), scene.worldY(430)),
    point(scene.worldX(920), scene.worldY(515)),
  ];
  const pondWaterPoints = [
    point(scene.worldX(820), scene.worldY(410)),
    point(scene.worldX(1010), scene.worldY(360)),
    point(scene.worldX(1115), scene.worldY(415)),
    point(scene.worldX(920), scene.worldY(495)),
  ];
  const pondGraphics = scene.add.graphics().setDepth(4);
  pondGraphics.fillStyle(0x258dc6, 1);
  pondGraphics.fillPoints(pondSidePoints, true);
  pondGraphics.fillStyle(0x48d9ea, 1);
  pondGraphics.fillPoints(pondWaterPoints, true);
  pondGraphics.lineStyle(3, 0x1b9ec8, 1);
  pondGraphics.strokePoints(pondWaterPoints, true);

  /* DETAIL AIR */
  pondGraphics.lineStyle(2, 0xb6ffff, 0.85);
  pondGraphics.beginPath();
  pondGraphics.moveTo(scene.worldX(880), scene.worldY(420));
  pondGraphics.lineTo(scene.worldX(930), scene.worldY(407));
  pondGraphics.moveTo(scene.worldX(975), scene.worldY(450));
  pondGraphics.lineTo(scene.worldX(1025), scene.worldY(438));
  pondGraphics.strokePath();

  /* COLLISION KOLAM */
  const pondCollider = scene.add.zone(
    scene.worldX(970),
    scene.worldY(435),
    260,
    105,
  );
  scene.physics.add.existing(pondCollider, true);
  scene.environmentColliders.push(pondCollider);
}
