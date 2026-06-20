export function createPath(scene) {
  const pathGraphics = scene.add.graphics().setDepth(5);
  const pathPoints = [
    [650, 310],
    [620, 350],
    [585, 390],
    [555, 430],
    [520, 470],
  ];
  pathPoints.forEach(([x, y], index) => {
    pathGraphics.fillStyle(index % 2 === 0 ? 0xe5b96d : 0xdba75c, 0.85);
    pathGraphics.fillEllipse(scene.worldX(x), scene.worldY(y), 75, 31);
  });
}
