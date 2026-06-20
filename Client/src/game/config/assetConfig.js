// Hanya konfigurasi sprite sheet karakter yang dipakai sekarang.
// Frame tileset/objects sudah dipindah ke BootScene.js sebagai koordinat
// pixel hasil pengukuran langsung dari file PNG (lihat TERRAIN_FRAMES /
// OBJECT_FRAMES di sana) -- bukan tebakan grid lagi.
export const PLAYER_CONFIG = {
  frameWidth: 48,
  frameHeight: 48,
  anims: {
    down: [0, 3],
    left: [4, 7],
    right: [8, 11],
    up: [12, 15]
  }
};