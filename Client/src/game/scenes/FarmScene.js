import Phaser from "phaser";
import GameState from "../systems/GameState";
import { PLAYER_CONFIG } from "../config/assetConfig";
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  HOUSE_SCALE,
  TREE_SCALE,
  PLAYER_SCALE,
  FRIEND_SCALE,
  OBJECT_SCALE,
  TERRAIN_SCALE,
  BASE_WORLD_WIDTH,
  BASE_WORLD_HEIGHT,
} from "../config/layoutConfig";
import { createIsland } from "../world/createIsland";
import { createPond } from "../world/createPond";
import { createDecorations } from "../world/createDecorations";
import { createTrees } from "../world/createTrees";
import { createHouse } from "../world/createHouse";
import { createPath } from "../world/createPath";




function depthForY(y, bonus = 0) {
  return 200 + y * 0.1 + bonus;
}

// Helper pengganti Phaser.Geom.Point
function point(x, y) {
  return new Phaser.Math.Vector2(x, y);
}


export default class FarmScene extends Phaser.Scene {
  constructor() {
    super("FarmScene");
    this.player = null;
    this.friend = null;
    this.cursors = null;
    this.wasd = null;
    this.eKey = null;
    this.lastDir = "down";
    this.dialogOpen = false;
    this.movementLocked = false;
    this.plotGraphics = [];
    this.activePlantMenu = null;
    this.treeColliders = [];
    this.fenceColliders = [];
    this.environmentColliders = [];
    this.offsetX = 0;
    this.offsetY = 0;
  }

  /* |-------------------------------------------------------------------------- |
        | POSISI RESPONSIF
        |-------------------------------------------------------------------------- */
  worldX(value) {
    return value + this.offsetX;
  }
  worldY(value) {
    return value + this.offsetY;
  }

  /* |-------------------------------------------------------------------------- |
        | CREATE
        |-------------------------------------------------------------------------- */
  create() {
    this.cameras.main.fadeIn(600, 0, 0, 0);

    const worldWidth = WORLD_WIDTH;
    const worldHeight = WORLD_HEIGHT;
    this.offsetX = (worldWidth - BASE_WORLD_WIDTH) / 2;
    this.offsetY = (worldHeight - BASE_WORLD_HEIGHT) / 2;

    this.createWorldBackground(worldWidth, worldHeight);
    this.createIsland();
    this.createGrassAreas();
    this.createPond();
    this.createPath();
    this.createFarmArea();
    this.createFenceLayout();
    this.createTrees();
    this.createHouse();
    this.createDecorations();
    this.createFriend();
    this.createPlayer();
    this.createPlayerAnimations();
    this.createInput();
    this.createCollisions();

    /* |-------------------------------------------------------------------------- |
            | WORLD BOUNDS
            |-------------------------------------------------------------------------- */
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    /* |-------------------------------------------------------------------------- |
            | KAMERA TETAP
            |-------------------------------------------------------------------------- |
            | Seluruh map terlihat seperti diorama.
            */
    this.cameras.main.stopFollow();
    this.cameras.main.centerOn(worldWidth / 2, worldHeight / 2);
    this.cameras.main.setZoom(1);

    /* |-------------------------------------------------------------------------- |
            | HUD
            |-------------------------------------------------------------------------- */
    if (!this.scene.isActive("HUDScene")) {
      this.scene.launch("HUDScene");
    }
  }

  /* |-------------------------------------------------------------------------- |
        | BACKGROUND
        |-------------------------------------------------------------------------- */
  createWorldBackground(worldWidth, worldHeight) {
    this.cameras.main.setBackgroundColor("#6fae4a");
    this.add
      .rectangle(0, 0, worldWidth, worldHeight, 0x6fae4a)
      .setOrigin(0)
      .setDepth(0);
  }

  /* |-------------------------------------------------------------------------- |
        | PULAU
        |-------------------------------------------------------------------------- */
  createIsland() {
    createIsland(this);
  }

  /* |-------------------------------------------------------------------------- |
        | AREA RUMPUT
        |-------------------------------------------------------------------------- */
  createGrassAreas() {
    /* DEKORASI RUMPUT DARI ASSET */
    const wisps = [
      [210, 252, "grass_wisp_9"],
      [350, 210, "grass_wisp_10"],
      [590, 195, "grass_wisp_11"],
      [930, 185, "grass_wisp_14"],
      [1010, 390, "grass_wisp_10"],
      [900, 485, "grass_wisp_9"],
      [500, 560, "grass_wisp_11"],
    ];
    wisps.forEach(([x, y, frame]) => {
      this.add
        .image(this.worldX(x), this.worldY(y), "terrain", frame)
        .setOrigin(0.5, 1)
        .setScale(TERRAIN_SCALE)
        .setDepth(4);
    });
  }

  /* |-------------------------------------------------------------------------- |
        | KOLAM
        |-------------------------------------------------------------------------- */
  createPond() {
    createPond(this);
  }

  /* |-------------------------------------------------------------------------- |
        | JALAN
        |-------------------------------------------------------------------------- */
  createPath() {
    createPath(this);
  }

  /* |-------------------------------------------------------------------------- |
        | AREA KEBUN
        |-------------------------------------------------------------------------- */
  /* |-------------------------------------------------------------------------- |
        | AREA KEBUN
        |-------------------------------------------------------------------------- */
  createFarmArea() {
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
      x: this.worldX(x),
      y: this.worldY(y),
      state: "empty",
      crop: null,
      daysGrown: 0,
      growthDays: { turnip: 2, potato: 3 },
      sprite: null,
      groundSprite: null,
    }));

    this.createFarmPlots();
  }

  /* |-------------------------------------------------------------------------- |
        | PAGAR
        |-------------------------------------------------------------------------- */
  createFenceLayout() {
    this.fenceColliders = [];

    /*
            ==========================================================
            PAGAR KEBUN (FARM FENCE)
            Membentuk sudut 'L' yang rapi mengelilingi sisi kiri dan bawah area tanam.
            Menggunakan rasio isometrik ketat (dx: 40, dy: 20 untuk tiang).
            ==========================================================
            */
    /*
        ==========================================================
        PAGAR KEBUN (FARM FENCE) - UPDATE
        Menyesuaikan dengan posisi tanah yang baru (X:370 - X:450)
        ==========================================================
        */
    const farmFence = [
      /*
            |--------------------------------------------------------------------------
            | SISI BELAKANG KEBUN
            |--------------------------------------------------------------------------
            */

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

      /*
            |--------------------------------------------------------------------------
            | SISI KIRI KEBUN
            |--------------------------------------------------------------------------
            */

      [430, 255, "log_diag_2"],
      [410, 265, "post_single"],
      [390, 275, "log_diag_2"],
      [370, 285, "post_single"],
      [350, 295, "log_diag_2"],
      [330, 305, "post_single"],
      [310, 315, "log_diag_2"],
      [290, 325, "post_single"],

      /*
            |--------------------------------------------------------------------------
            | SISI DEPAN KEBUN
            |--------------------------------------------------------------------------
            */

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

      /*
            |--------------------------------------------------------------------------
            | SISI KANAN KEBUN
            |--------------------------------------------------------------------------
            */

      [670, 375, "log_diag_2"],
      [650, 385, "post_single"],
      [630, 395, "log_diag_2"],
      [610, 405, "post_single"],

      // Celah masuk kebun

      [570, 425, "post_single"],
      [550, 435, "log_diag_2"],
      [530, 445, "post_single"],
    ];

    const leftTopFence = [
      /*
            |--------------------------------------------------------------------------
            | PAGAR AREA RUMPUT KIRI ATAS
            |--------------------------------------------------------------------------
            */

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
      this.createFencePiece(x, y, frameName);
    });

    allFences.forEach(([x, y, frameName]) => {
      this.createFencePiece(x, y, frameName);
    });
  }

  createFencePiece(x, y, frameName, collision = true) {
    const worldX = this.worldX(x);
    const worldY = this.worldY(y);

    this.add
      .image(worldX, worldY, "objects", frameName)
      .setOrigin(0.5, 1)
      .setScale(OBJECT_SCALE)
      .setDepth(depthForY(worldY, 0.1));

    if (!collision) return;

    const collider = this.add.zone(worldX, worldY - 6, 18, 12);

    this.physics.add.existing(collider, true);
    this.fenceColliders.push(collider);
  }

  /* |-------------------------------------------------------------------------- |
        | POHON
        |-------------------------------------------------------------------------- */
  createTrees() {
    createTrees(this);
  }

  /* |-------------------------------------------------------------------------- |
        | RUMAH
        |-------------------------------------------------------------------------- */
  createHouse() {
    createHouse(this);
  }

  /* |-------------------------------------------------------------------------- |
        | DEKORASI
        |-------------------------------------------------------------------------- */
  createDecorations() {
    createDecorations(this);
  }

  /* |-------------------------------------------------------------------------- |
     | TEMAN
     |-------------------------------------------------------------------------- */
  createFriend() {
    const friendX = this.worldX(790);
    const friendY = this.worldY(405);
    this.friend = this.physics.add
      .sprite(friendX, friendY, "fplayer-idle")
      .setScale(FRIEND_SCALE)
      .setDepth(depthForY(friendY))
      .setImmovable(true);
    this.friend.body.setSize(16, 16);
    this.friend.body.setOffset(16, 28);
    if (!this.anims.exists("f-idle-down")) {
      this.anims.create({
        key: "f-idle-down",
        frames: this.anims.generateFrameNumbers("fplayer-idle", {
          start: 0,
          end: 3,
        }),
        frameRate: 6,
        repeat: -1,
      });
    }
    this.friend.play("f-idle-down");
    this.speechBubble = this.add.graphics().setDepth(depthForY(friendY, 1));
    this.drawSpeechBubble(this.friend.x - 10, this.friend.y - 66);
    this.speechBubble.setVisible(false);
    if (this.speechExcl) {
      this.speechExcl.setVisible(false);
    }
  }

  /* |-------------------------------------------------------------------------- |
     | PLAYER
     |-------------------------------------------------------------------------- */
  createPlayer() {
    const playerX = this.worldX(650);
    const playerY = this.worldY(430);
    this.player = this.physics.add
      .sprite(playerX, playerY, "player-idle")
      .setScale(PLAYER_SCALE)
      .setCollideWorldBounds(true)
      .setDepth(depthForY(playerY));
    this.player.body.setSize(16, 16);
    this.player.body.setOffset(16, 28);
  }

  /* |-------------------------------------------------------------------------- |
     | COLLISION
     |-------------------------------------------------------------------------- */
  createCollisions() {
    this.physics.add.collider(this.player, this.houseCollider);
    this.physics.add.collider(this.player, this.friend);
    this.treeColliders.forEach((collider) => {
      this.physics.add.collider(this.player, collider);
    });
    this.fenceColliders.forEach((collider) => {
      this.physics.add.collider(this.player, collider);
    });
    this.environmentColliders.forEach((collider) => {
      this.physics.add.collider(this.player, collider);
    });
  }

  /* |-------------------------------------------------------------------------- |
     | INPUT
     |-------------------------------------------------------------------------- */
  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.eKey.on("down", () => {
      if (this.dialogOpen) {
        this.events.emit("advance-dialog");
      } else {
        this.handleInteract();
      }
    });
  }

  /* |-------------------------------------------------------------------------- |
     | ANIMASI PLAYER
     |-------------------------------------------------------------------------- */
  createPlayerAnimations() {
    if (this.anims.exists("walk-down")) {
      this.player.play("idle-down");
      return;
    }
    const frameRate = 8;
    const animations = PLAYER_CONFIG.anims;
    ["down", "left", "right", "up"].forEach((direction) => {
      this.anims.create({
        key: `idle-${direction}`,
        frames: this.anims.generateFrameNumbers("player-idle", {
          start: animations[direction][0],
          end: animations[direction][1],
        }),
        frameRate,
        repeat: -1,
      });
      this.anims.create({
        key: `walk-${direction}`,
        frames: this.anims.generateFrameNumbers("player-walk", {
          start: animations[direction][0],
          end: animations[direction][1],
        }),
        frameRate,
        repeat: -1,
      });
    });
    this.player.play("idle-down");
  }

  /* |-------------------------------------------------------------------------- |
     | FARM PLOTS
     |-------------------------------------------------------------------------- */
  createFarmPlots() {
    this.plotGraphics = [];
    GameState.plots.forEach((plot) => {
      plot.groundSprite = this.add
        .image(plot.x, plot.y, "terrain", "soil_orange")
        .setOrigin(0.5, 1)
        .setScale(TERRAIN_SCALE)
        .setDepth(6);
      this.plotGraphics[plot.id] = plot.groundSprite;
      this.updatePlotSprite(plot);
    });
  }
  drawPlotGraphics(graphics, plot) {
    if (!graphics) {
      return;
    }
    graphics.setTexture(
      "terrain",
      plot.state === "watered" ? "soil_brown" : "soil_orange",
    );
  }
  updatePlotSprite(plot) {
    if (plot.groundSprite) {
      plot.groundSprite.setFrame(
        plot.state === "watered" ? "soil_brown" : "soil_orange",
      );
    }
    if (plot.sprite) {
      plot.sprite.destroy();
      plot.sprite = null;
    }
    let frame = null;
    if (plot.state === "planted") {
      frame = "crop_stage_1";
    } else if (plot.state === "watered") {
      frame = "crop_stage_2";
    } else if (plot.state === "ready") {
      frame = "crop_stage_4";
    }
    if (!frame) {
      return;
    }
    plot.sprite = this.add
      .image(plot.x, plot.y - 13, "terrain", frame)
      .setOrigin(0.5, 1)
      .setScale(TERRAIN_SCALE)
      .setDepth(depthForY(plot.y, 0.1));
  }

  /* |-------------------------------------------------------------------------- |
     | SPEECH BUBBLE
     |-------------------------------------------------------------------------- */
  drawSpeechBubble(x, y) {
    this.speechBubble.clear();
    this.speechBubble.fillStyle(0xffffff, 1);
    this.speechBubble.fillRoundedRect(x, y, 20, 20, 5);
    this.speechBubble.lineStyle(1.5, 0x000000, 1);
    this.speechBubble.strokeRoundedRect(x, y, 20, 20, 5);
    if (this.speechExcl) {
      this.speechExcl.destroy();
    }
    this.speechExcl = this.add
      .text(x + 10, y + 10, "!", {
        fontSize: "12px",
        fontStyle: "bold",
        color: "#000000",
      })
      .setOrigin(0.5)
      .setDepth(this.speechBubble.depth + 1);
  }

  /* |-------------------------------------------------------------------------- |
     | INTERAKSI
     |-------------------------------------------------------------------------- */
  handleInteract() {
    if (this.dialogOpen) {
      return;
    }
    const distanceToFriend = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.friend.x,
      this.friend.y,
    );
    if (distanceToFriend < 65) {
      this.showDialog();
      return;
    }
    for (const plot of GameState.plots) {
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        plot.x,
        plot.y - 13,
      );
      if (distance < 48) {
        this.handlePlotInteraction(plot);
        return;
      }
    }
  }

  /* |-------------------------------------------------------------------------- |
     | DIALOG
     |-------------------------------------------------------------------------- */
  showDialog() {
    if (this.dialogOpen) {
      return;
    }
    this.dialogOpen = true;
    this.movementLocked = true;
    this.player.setVelocity(0, 0);
    this.player.anims.play(`idle-${this.lastDir}`);
    GameState.addProgress(4);

    const lines = [
      "Hey, you finally arrived. This farm needs a little attention.",
      "Start by planting some seeds in the available plots.",
      "If you need any help, just come see me again.",
    ];
    let lineIndex = 0;
    const camera = this.cameras.main;
    const screenWidth = camera.width;
    const screenHeight = camera.height;
    const dialogWidth = Math.min(screenWidth - 80, 720);
    const dialogHeight = 140;
    const dialogX = screenWidth / 2 - dialogWidth / 2;
    const dialogY = screenHeight * 0.72 - dialogHeight / 2;

    const dialogBackground = this.add
      .graphics()
      .setScrollFactor(0)
      .setDepth(20000);
    dialogBackground.fillStyle(0x0f172a, 0.97);
    dialogBackground.fillRoundedRect(
      dialogX,
      dialogY,
      dialogWidth,
      dialogHeight,
      16,
    );
    dialogBackground.lineStyle(2.5, 0xe8a838, 1);
    dialogBackground.strokeRoundedRect(
      dialogX,
      dialogY,
      dialogWidth,
      dialogHeight,
      16,
    );

    const nameText = this.add
      .text(dialogX + 24, dialogY + 18, "Friend", {
        fontSize: "15px",
        fontStyle: "bold",
        color: "#f5c45e",
        fontFamily: "Arial",
      })
      .setScrollFactor(0)
      .setDepth(20001);

    const dialogText = this.add
      .text(dialogX + 24, dialogY + 50, "", {
        fontSize: "13px",
        color: "#ffffff",
        fontFamily: "Arial",
        wordWrap: { width: dialogWidth - 170, useAdvancedWrap: true },
        lineSpacing: 5,
      })
      .setScrollFactor(0)
      .setDepth(20001);

    const buttonWidth = 110;
    const buttonHeight = 28;
    const buttonX = dialogX + dialogWidth - buttonWidth - 24;
    const buttonY = dialogY + dialogHeight - buttonHeight - 16;

    const buttonBackground = this.add
      .graphics()
      .setScrollFactor(0)
      .setDepth(20002);
    buttonBackground.fillStyle(0xe8a838, 1);
    buttonBackground.fillRoundedRect(
      buttonX,
      buttonY,
      buttonWidth,
      buttonHeight,
      8,
    );

    const buttonText = this.add
      .text(buttonX + buttonWidth / 2, buttonY + buttonHeight / 2, "Next", {
        fontSize: "11px",
        color: "#ffffff",
        fontStyle: "bold",
        fontFamily: "Arial",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(20003);

    const hintText = this.add
      .text(dialogX + 24, dialogY + dialogHeight - 28, "Press E to continue", {
        fontSize: "11px",
        color: "#94a3b8",
        fontFamily: "Arial",
        fontStyle: "italic",
      })
      .setScrollFactor(0)
      .setDepth(20001);

    let typeTimer = null;
    const typewriteLine = (text) => {
      dialogText.setText("");
      let characterIndex = 0;
      if (typeTimer) {
        typeTimer.remove();
      }
      typeTimer = this.time.addEvent({
        delay: 28,
        repeat: text.length - 1,
        callback: () => {
          dialogText.setText(text.substring(0, characterIndex + 1));
          characterIndex += 1;
        },
      });
    };
    typewriteLine(lines[0]);

    const buttonZone = this.add
      .zone(
        buttonX + buttonWidth / 2,
        buttonY + buttonHeight / 2,
        buttonWidth,
        buttonHeight,
      )
      .setScrollFactor(0)
      .setDepth(20004)
      .setInteractive({ useHandCursor: true });

    const advanceDialogue = () => {
      lineIndex += 1;
      if (lineIndex < lines.length) {
        typewriteLine(lines[lineIndex]);
        if (lineIndex === lines.length - 1) {
          buttonText.setText("Close");
        }
        return;
      }
      if (typeTimer) {
        typeTimer.remove();
      }
      dialogBackground.destroy();
      nameText.destroy();
      dialogText.destroy();
      buttonBackground.destroy();
      buttonText.destroy();
      buttonZone.destroy();
      hintText.destroy();
      this.events.off("advance-dialog", advanceDialogue);
      this.time.delayedCall(100, () => {
        this.dialogOpen = false;
        this.movementLocked = false;
      });
      GameState.inventory.turnip_seed += 3;
      this.showFloatingText(
        this.friend.x,
        this.friend.y - 40,
        "+3 Turnip Seeds",
        "#f5c45e",
      );
    };
    buttonZone.on("pointerup", advanceDialogue);
    this.events.on("advance-dialog", advanceDialogue);
  }

  /* |-------------------------------------------------------------------------- |
     | INTERAKSI PLOT
     |-------------------------------------------------------------------------- */
  handlePlotInteraction(plot) {
    const cropY = plot.y - 13;
    if (plot.state === "empty") {
      const turnipSeed = GameState.inventory.turnip_seed;
      const potatoSeed = GameState.inventory.potato_seed;
      if (turnipSeed === 0 && potatoSeed === 0) {
        this.showFloatingText(
          this.player.x,
          this.player.y - 20,
          "No seeds!",
          "#ef4444",
        );
        return;
      }
      this.showPlantMenu(plot);
      return;
    }
    if (plot.state === "planted") {
      if (GameState.energy < 5) {
        this.showFloatingText(
          this.player.x,
          this.player.y - 20,
          "Out of energy!",
          "#ef4444",
        );
        return;
      }
      plot.state = "watered";
      GameState.energy -= 5;
      GameState.hasWateredToday = true;
      this.updatePlotSprite(plot);
      const splash = this.add
        .circle(plot.x, cropY, 12, 0x3b82f6, 0.7)
        .setDepth(depthForY(plot.y, 0.2));
      this.tweens.add({
        targets: splash,
        scaleX: 2,
        scaleY: 2,
        alpha: 0,
        duration: 400,
        onComplete: () => {
          splash.destroy();
        },
      });
      this.showFloatingText(plot.x, cropY - 15, "Watered", "#60a5fa");
      return;
    }
    if (plot.state === "ready") {
      const crop = plot.crop;
      GameState.inventory[crop] += 1;
      plot.state = "empty";
      plot.crop = null;
      plot.daysGrown = 0;
      this.updatePlotSprite(plot);
      GameState.addProgress(2, 1);
      const cropName = crop === "turnip" ? "Turnip" : "Potato";
      this.showFloatingText(plot.x, cropY - 15, `+1 ${cropName}`, "#4ade80");
      for (let index = 0; index < 5; index += 1) {
        const sparkle = this.add
          .circle(plot.x, cropY, 3, 0xfef08a, 0.9)
          .setDepth(depthForY(plot.y, 0.2));
        const randomX = Phaser.Math.Between(-40, 40);
        const randomY = Phaser.Math.Between(-40, 40);
        this.tweens.add({
          targets: sparkle,
          x: plot.x + randomX,
          y: cropY + randomY,
          alpha: 0,
          duration: 500,
          onComplete: () => {
            sparkle.destroy();
          },
        });
      }
    }
  }

  /* |-------------------------------------------------------------------------- |
     | MENU TANAM
     |-------------------------------------------------------------------------- */
  showPlantMenu(plot) {
    this.movementLocked = true;
    this.player.setVelocity(0, 0);
    this.player.anims.play(`idle-${this.lastDir}`);

    const menu = this.add.container(plot.x, plot.y - 45).setDepth(300);
    this.activePlantMenu = menu;

    const background = this.add.graphics();
    background.fillStyle(0x0f172a, 0.96);
    background.fillRoundedRect(-75, -30, 150, 60, 8);
    background.lineStyle(1.5, 0x475569, 1);
    background.strokeRoundedRect(-75, -30, 150, 60, 8);
    menu.add(background);

    const turnipSeed = GameState.inventory.turnip_seed;
    const potatoSeed = GameState.inventory.potato_seed;

    const turnipText = this.add
      .text(0, -15, `1: Turnip (${turnipSeed})`, {
        fontSize: "9px",
        fontFamily: "Arial",
        color: turnipSeed > 0 ? "#ffffff" : "#64748b",
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: turnipSeed > 0 });

    const potatoText = this.add
      .text(0, 12, `2: Potato (${potatoSeed})`, {
        fontSize: "9px",
        fontFamily: "Arial",
        color: potatoSeed > 0 ? "#ffffff" : "#64748b",
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: potatoSeed > 0 });

    menu.add([turnipText, potatoText]);

    const closeMenu = () => {
      this.movementLocked = false;
      this.activePlantMenu = null;
      menu.destroy();
      this.input.keyboard.off("keydown-ONE");
      this.input.keyboard.off("keydown-TWO");
    };
    const plantCrop = (crop) => {
      plot.state = "planted";
      plot.crop = crop;
      plot.daysGrown = 0;
      GameState.inventory[`${crop}_seed`] -= 1;
      this.updatePlotSprite(plot);
      GameState.addProgress(0, 1);
      const cropName = crop === "turnip" ? "Turnip" : "Potato";
      this.showFloatingText(
        plot.x,
        plot.y - 30,
        `${cropName} planted!`,
        "#cbd5e1",
      );
      closeMenu();
    };
    if (turnipSeed > 0) {
      turnipText.on("pointerdown", () => {
        plantCrop("turnip");
      });
    }
    if (potatoSeed > 0) {
      potatoText.on("pointerdown", () => {
        plantCrop("potato");
      });
    }
    this.input.keyboard.once("keydown-ONE", () => {
      if (turnipSeed > 0) {
        plantCrop("turnip");
      }
    });
    this.input.keyboard.once("keydown-TWO", () => {
      if (potatoSeed > 0) {
        plantCrop("potato");
      }
    });
    this.input.once("pointerdown", (pointer) => {
      const distance = Phaser.Math.Distance.Between(
        pointer.worldX,
        pointer.worldY,
        plot.x,
        plot.y,
      );
      if (distance > 45 && this.activePlantMenu === menu) {
        closeMenu();
      }
    });
  }

  /* |-------------------------------------------------------------------------- |
     | UPDATE
     |-------------------------------------------------------------------------- */
  update() {
    if (!this.player || !this.friend) {
      return;
    }
    if (this.movementLocked) {
      this.player.setVelocity(0, 0);
      return;
    }
    const speed = 180;
    const left = this.cursors.left.isDown || this.wasd.left.isDown;
    const right = this.cursors.right.isDown || this.wasd.right.isDown;
    const up = this.cursors.up.isDown || this.wasd.up.isDown;
    const down = this.cursors.down.isDown || this.wasd.down.isDown;

    let velocityX = (right ? speed : 0) - (left ? speed : 0);
    let velocityY = (down ? speed : 0) - (up ? speed : 0);

    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= 0.707;
      velocityY *= 0.707;
    }

    this.player.setVelocity(velocityX, velocityY);

    if (velocityX !== 0 || velocityY !== 0) {
      if (Math.abs(velocityX) >= Math.abs(velocityY)) {
        this.lastDir = velocityX < 0 ? "left" : "right";
      } else {
        this.lastDir = velocityY < 0 ? "up" : "down";
      }
      this.player.anims.play(`walk-${this.lastDir}`, true);
    } else {
      this.player.setVelocity(0, 0);
      this.player.anims.play(`idle-${this.lastDir}`, true);
    }

    this.player.setDepth(depthForY(this.player.y));
    this.friend.setDepth(depthForY(this.friend.y));

    const distanceToFriend = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.friend.x,
      this.friend.y,
    );
    const showBubble = distanceToFriend < 80 && !this.dialogOpen;
    this.speechBubble.setVisible(showBubble);
    if (this.speechExcl) {
      this.speechExcl.setVisible(showBubble);
    }
  }

  /* |-------------------------------------------------------------------------- |
     | FLOATING TEXT
     |-------------------------------------------------------------------------- */
  showFloatingText(x, y, text, color = "#ffffff") {
    const floatingText = this.add
      .text(x, y, text, {
        fontSize: "12px",
        color,
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 3,
      })
      .setOrigin(0.5)
      .setDepth(1000);
    this.tweens.add({
      targets: floatingText,
      y: y - 30,
      alpha: 0,
      duration: 1200,
      ease: "Power2",
      onComplete: () => {
        floatingText.destroy();
      },
    });
  }
}
