import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const centerX = width / 2;
    const centerY = height / 2;
    // GANTI bagian "1. Tiled green grass background" di awal create() dengan ini:
    this.add.rectangle(0, 0, width, height, 0x3f7a3a).setOrigin(0).setScrollFactor(0);
    const vignette = this.add.graphics().setScrollFactor(0);
    vignette.fillStyle(0x000000, 0.25);
    vignette.fillRect(0, 0, width, height);
    // Dark semi-transparent overlay
    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.35)
      .setOrigin(0)
      .setScrollFactor(0);

    // 2. Floating particles (ambient animation)
    for (let i = 0; i < 12; i++) {
      const rx = Phaser.Math.Between(50, width - 50);
      const ry = Phaser.Math.Between(50, height - 50);

      const particle = this.add.circle(rx, ry, 3, 0xf5c45e, 0.6);
      particle.setScrollFactor(0);

      // Slow upward floating tween
      this.tweens.add({
        targets: particle,
        y: ry - 80,
        alpha: { from: 0.8, to: 0 },
        duration: Phaser.Math.Between(3000, 5000),
        delay: Phaser.Math.Between(0, 4000),
        repeat: -1,
        yoyo: false
      });
    }

    // 3. Title Text with Bounce
    const titleText = this.add.text(centerX, centerY - 120, "🌾 Cozy Pixel Farm", {
      fontSize: "36px", // Reduced size slightly so it fits small mobile/browser windows safely
      fontFamily: "'Press Start 2P', monospace",
      color: "#ffffff",
      stroke: "#2d5a1b",
      strokeThickness: 6,
      shadow: {
        offsetX: 3,
        offsetY: 3,
        color: "#000000",
        blur: 0,
        fill: true
      }
    }).setOrigin(0.5).setScrollFactor(0);

    // Bouncing tween
    this.tweens.add({
      targets: titleText,
      y: centerY - 112,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });

    // 4. Subtitle Text
    this.add.text(centerX, centerY - 55, "A fun farming adventure", {
      fontSize: "14px",
      fontFamily: "Arial",
      color: "#d4f5a0",
    }).setOrigin(0.5).setScrollFactor(0).setAlpha(0.9);

    // 5. Interactive Play Button (Container wrapper)
    const playContainer = this.add.container(centerX, centerY + 30);
    playContainer.setScrollFactor(0);

    const btnBg = this.add.graphics();
    // Local coordinates centered around (0,0)
    btnBg.fillStyle(0xe8a838, 1);
    btnBg.fillRoundedRect(-110, -30, 220, 60, 16);
    btnBg.lineStyle(3, 0xffffff, 1);
    btnBg.strokeRoundedRect(-110, -30, 220, 60, 16);

    const playText = this.add.text(0, 0, "▶ Start Playing", {
      fontSize: "20px",
      fontFamily: "Arial",
      fontStyle: "bold",
      color: "#ffffff"
    }).setOrigin(0.5);

    playContainer.add([btnBg, playText]);
    playContainer.setSize(220, 60);
    playContainer.setInteractive({ useHandCursor: true });

    // Hover, Click, and Unhover Tweens
    playContainer.on('pointerover', () => {
      this.tweens.add({
        targets: playContainer,
        scaleX: 1.08,
        scaleY: 1.08,
        duration: 150,
        ease: 'Power1'
      });
      // Change background fill color to light warm yellow
      btnBg.clear();
      btnBg.fillStyle(0xf5c45e, 1);
      btnBg.fillRoundedRect(-110, -30, 220, 60, 16);
      btnBg.lineStyle(3, 0xffffff, 1);
      btnBg.strokeRoundedRect(-110, -30, 220, 60, 16);
    });

    playContainer.on('pointerout', () => {
      this.tweens.add({
        targets: playContainer,
        scaleX: 1.0,
        scaleY: 1.0,
        duration: 150,
        ease: 'Power1'
      });
      // Restore standard color
      btnBg.clear();
      btnBg.fillStyle(0xe8a838, 1);
      btnBg.fillRoundedRect(-110, -30, 220, 60, 16);
      btnBg.lineStyle(3, 0xffffff, 1);
      btnBg.strokeRoundedRect(-110, -30, 220, 60, 16);
    });

    playContainer.on('pointerdown', () => {
      this.tweens.add({
        targets: playContainer,
        scaleX: 0.95,
        scaleY: 0.95,
        duration: 80,
        ease: 'Power1'
      });
    });

    playContainer.on('pointerup', () => {
      // Fade out transition (400ms black)
      this.cameras.main.fadeOut(400, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('FarmScene');
      });
    });

    // 6. Controls Hint (bottom of screen)
    this.add.text(centerX, height - 40, "WASD or Arrow Keys to move", {
      fontSize: "12px",
      fontFamily: "Arial",
      color: "#aaaaaa"
    }).setOrigin(0.5).setScrollFactor(0);
  }
}
