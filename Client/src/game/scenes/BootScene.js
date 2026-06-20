import Phaser from "phaser";

// === KOORDINAT INI HASIL PENGUKURAN LANGSUNG DARI PIXEL PNG ===
// Bukan tebakan. Setiap entri: [x, y, width, height] dalam pixel asli.
export const TERRAIN_FRAMES = {
  cliff_block: [0, 0, 128, 96], // dekorasi tebing/elevasi (satu chunk utuh)
  soil_orange: [129, 16, 30, 16], // diamond tanah terang (untuk lahan tanam)
  soil_brown: [129, 48, 30, 16], // diamond tanah gelap/basah
  tree_full: [6, 161, 84, 95], // POHON UTUH satu sprite (jangan dipotong lagi)
  crop_stage_1: [12, 115, 8, 6], // tunas kecil
  crop_stage_2: [41, 114, 14, 7], // tunas sedang
  crop_stage_3: [73, 110, 14, 12], // tanaman muda
  crop_stage_4: [104, 108, 15, 14], // tanaman siap panen
  fruit_small: [76, 146, 8, 8],
  fruit_medium: [42, 142, 12, 12],
  fruit_large: [8, 140, 16, 15],
  grass_wisp_1: [160, 16, 96, 16], // aksen rumput dekoratif (TIDAK untuk fill lantai)
  grass_wisp_2: [259, 16, 29, 16],
  grass_wisp_3: [160, 48, 125, 16],
  grass_wisp_4: [160, 80, 55, 16],
  grass_wisp_5: [233, 84, 55, 12],
  grass_wisp_6: [160, 112, 22, 16],
  grass_wisp_7: [202, 112, 45, 16],
  grass_wisp_8: [270, 112, 18, 12],
  grass_wisp_9: [234, 144, 12, 4],
  grass_wisp_10: [184, 149, 16, 6],
  grass_wisp_11: [266, 156, 12, 4],
  grass_wisp_12: [160, 176, 22, 12],
  grass_wisp_13: [202, 176, 40, 12],
  grass_wisp_14: [265, 183, 23, 9],
};
export const OBJECT_FRAMES = {
  fence_wood: [0, 0, 32, 32],
  fence_stone: [96, 0, 32, 32],

  // Tangga turun ke depan kiri
  stairs_front: [128, 0, 32, 32],

  // Arah kebalikannya
  stairs_front_alt: [160, 0, 32, 32],

  post_single: [11, 38, 10, 22],
  fence_corner_a: [43, 38, 19, 22],
  fence_corner_b: [66, 38, 19, 22],
  fence_t: [98, 38, 28, 22],
  log_diag_1: [129, 40, 29, 19],
  log_diag_2: [162, 40, 29, 19],
  log_small: [5, 77, 21, 15],
  stone_small: [40, 80, 16, 13],
  stone_large: [67, 73, 24, 21],
  crystal_teal: [99, 76, 26, 19],
  leaf_plant: [131, 76, 26, 19],
  bush_green: [162, 69, 28, 26],
};

function defineFrames(scene, textureKey, frameMap) {
  const tex = scene.textures.get(textureKey);
  Object.entries(frameMap).forEach(([name, [x, y, w, h]]) => {
    if (!tex.has(name)) {
      tex.add(name, 0, x, y, w, h);
    }
  });
}

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.audio("farm-music", ["/assets/audio/farm-theme.mp3"]);
    this.cameras.main.setBackgroundColor("#000000");
    const width = this.scale.width;
    const height = this.scale.height;

    const loadingText = this.make
      .text({
        x: width / 2,
        y: height / 2 - 40,
        text: "Loading...",
        style: { font: "24px monospace", fill: "#ffffff" },
      })
      .setOrigin(0.5);

    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRoundedRect(width / 2 - 160, height / 2 - 10, 320, 20, 4);

    const percentText = this.make
      .text({
        x: width / 2,
        y: height / 2 + 30,
        text: "0%",
        style: { font: "16px monospace", fill: "#aaaaaa" },
      })
      .setOrigin(0.5);

    this.load.on("progress", (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRoundedRect(
        width / 2 - 155,
        height / 2 - 5,
        310 * value,
        10,
        2,
      );
      percentText.setText(`${Math.floor(value * 100)}%`);
    });

    this.load.on("loaderror", (fileObj) => {
      console.error(
        `[Error Loading Asset] Path: "${fileObj.src}" for key: "${fileObj.key}"`,
      );
    });

    this.load.on("complete", () => {
      // Iris sub-region bernama dari dua sheet mentah, sekarang teksturnya
      // sudah ada di memori. Koordinat ini hasil ukur langsung, bukan tebakan.
      defineFrames(this, "terrain", TERRAIN_FRAMES);
      defineFrames(this, "objects", OBJECT_FRAMES);

      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      this.scene.start("MenuScene");
    });

    this.load.image("game-logo", "/CozyPixel.png");
    this.load.image("terrain", "/assets/farm/Free ver.png");
    this.load.image("house", "/assets/farm/House.png");
    this.load.image("objects", "/assets/farm/Objects.png");

    this.load.spritesheet(
      "player-idle",
      "/assets/farm/Player/MPlayer 1 idle.png",
      { frameWidth: 48, frameHeight: 48 },
    );
    this.load.spritesheet(
      "player-walk",
      "/assets/farm/Player/MPlayer 1 walking.png",
      { frameWidth: 48, frameHeight: 48 },
    );
    this.load.spritesheet(
      "fplayer-idle",
      "/assets/farm/Player/FPlayer 1 idle.png",
      { frameWidth: 48, frameHeight: 48 },
    );
    this.load.spritesheet(
      "fplayer-walk",
      "/assets/farm/Player/FPlayer 1 walking.png",
      { frameWidth: 48, frameHeight: 48 },
    );
  }
}
