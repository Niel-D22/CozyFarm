import Phaser from "phaser";

// Helper pengganti Phaser.Geom.Point
export function point(x, y) {
  return new Phaser.Math.Vector2(x, y);
}
