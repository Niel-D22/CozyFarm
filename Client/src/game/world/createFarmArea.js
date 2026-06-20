import GameState from "../systems/GameState";

export function createFarmArea(scene) {
  const plotPositions = [];

  // Jarak jaring isometrik yang akurat agar tanah pas berdempetan
  const tileW = 32;
  const tileH = 16;

  const startX1 = 450;
  const startY1 = 300;

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 6; col++) {
      const x = startX1 + col * tileW - row * tileW;
      const y = startY1 + col * tileH + row * tileH;
      plotPositions.push([x, y]);
    }
  }

  const startX2 = 370;
  const startY2 = 340;

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 6; col++) {
      const x = startX2 + col * tileW - row * tileW;
      const y = startY2 + col * tileH + row * tileH;
      plotPositions.push([x, y]);
    }
  }

  GameState.plots = plotPositions.map(([x, y], index) => ({
    id: index,
    x: scene.worldX(x),
    y: scene.worldY(y),
    state: "empty",
    crop: null,
    daysGrown: 0,
    growthDays: { turnip: 2, potato: 3 },
    sprite: null,
    groundSprite: null,
  }));

  scene.createFarmPlots();
}
