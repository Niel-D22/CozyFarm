import Phaser from "phaser";
import GameState from "../systems/GameState";
import { showQuestCompleteBanner } from "../systems/questUI";
import { triggerSleep } from "../systems/daySystem";
import { showCraftingPanel } from "../systems/craftingPanel";
import { toggleInfoPanel } from "../systems/infoPanel";

export default class HUDScene extends Phaser.Scene {
  constructor() {
    super("HUDScene");
    this.infoPanelOpen = false;
    this.infoPanel = [];
    this.craftListContainer = null;
  }

  create() {
    this.infoPanelOpen = false;
    this.infoPanel = [];

    this.updateHUDText();

    this.hudTimer = this.time.addEvent({
      delay: 500,
      callback: this.updateHUDText,
      callbackScope: this,
      loop: true,
    });

    GameState.onQuestComplete = (title) => {
      showQuestCompleteBanner(this, title);
    };

    this.input.keyboard.on("keydown-ESC", () => {
      this.scene.stop("HUDScene");
      this.scene.stop("FarmScene");
      window.dispatchEvent(new CustomEvent("exit-to-menu"));
    });
  }

  updateHUDText() {
    const width = this.scale.width;
    const height = this.scale.height;

    if (!this.dayText) {
      this.dayText = this.add
        .text(32, 32, "", {
          fontSize: "14px",
          fontFamily: "Arial",
          fontStyle: "bold",
          color: "#ffffff",
        })
        .setDepth(100);

      this.energyLabel = this.add
        .text(32, 54, "⚡ Energy", {
          fontSize: "12px",
          fontFamily: "Arial",
          color: "#ffffff",
        })
        .setDepth(100);

      this.energyBg = this.add.graphics().setDepth(99);
      this.energyFill = this.add.graphics().setDepth(100);

      this.goldText = this.add
        .text(width - 32, 32, "", {
          fontSize: "14px",
          fontFamily: "Arial",
          fontStyle: "bold",
          color: "#f5c45e",
        })
        .setOrigin(1, 0)
        .setDepth(100);

      this.inventoryText = this.add
        .text(width - 32, 54, "", {
          fontSize: "12px",
          fontFamily: "Arial",
          color: "#cbd5e1",
        })
        .setOrigin(1, 0)
        .setDepth(100);

      this.questBox = this.add.graphics().setDepth(90);

      this.questTitle = this.add
        .text(width - 172, height - 134, "", {
          fontSize: "12px",
          fontFamily: "Arial",
          fontStyle: "bold",
          color: "#ffffff",
        })
        .setOrigin(0.5)
        .setDepth(91);

      this.questProgress = this.add
        .text(width - 172, height - 112, "", {
          fontSize: "11px",
          fontFamily: "Arial",
          color: "#94a3b8",
        })
        .setOrigin(0.5)
        .setDepth(91);

      this.controlsHint = this.add
        .text(width - 32, height - 32, "E — Interact   ESC — Menu", {
          fontSize: "11px",
          fontFamily: "Arial",
          color: "#888888",
        })
        .setOrigin(1, 0.5)
        .setDepth(100);

      this.sleepBtn = this.add
        .text(32, height - 48, "💤 Sleep", {
          fontSize: "13px",
          fontFamily: "Arial",
          fontStyle: "bold",
          backgroundColor: "#1e293b",
          padding: { x: 12, y: 6 },
          color: "#ffffff",
        })
        .setOrigin(0, 0.5)
        .setInteractive({ useHandCursor: true })
        .setDepth(100);

      this.sleepBtn.on("pointerdown", () => triggerSleep(this));
      this.sleepBtn.on("pointerover", () =>
        this.sleepBtn.setStyle({ backgroundColor: "#334155" }),
      );
      this.sleepBtn.on("pointerout", () =>
        this.sleepBtn.setStyle({ backgroundColor: "#1e293b" }),
      );

      this.craftBtn = this.add
        .text(32, height - 88, "🍳 Cook", {
          fontSize: "13px",
          fontFamily: "Arial",
          fontStyle: "bold",
          backgroundColor: "#1e293b",
          padding: { x: 12, y: 6 },
          color: "#ffffff",
        })
        .setOrigin(0, 0.5)
        .setInteractive({ useHandCursor: true })
        .setDepth(100);

      this.craftBtn.on("pointerdown", () => showCraftingPanel(this));
      this.craftBtn.on("pointerover", () =>
        this.craftBtn.setStyle({ backgroundColor: "#334155" }),
      );
      this.craftBtn.on("pointerout", () =>
        this.craftBtn.setStyle({ backgroundColor: "#1e293b" }),
      );

      this.infoBtnBg = this.add.graphics().setScrollFactor(0).setDepth(100);
      this.infoBtnBg.fillStyle(0x3b82f6, 1);
      this.infoBtnBg.fillCircle(width - 200, 36, 16);

      this.infoBtnText = this.add
        .text(width - 200, 36, "?", {
          fontSize: "16px",
          fontStyle: "bold",
          color: "#ffffff",
          fontFamily: "Arial",
        })
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(101);

      this.infoBtnZone = this.add
        .zone(width - 200, 36, 32, 32)
        .setScrollFactor(0)
        .setDepth(102)
        .setInteractive({ useHandCursor: true });

      this.infoBtnZone.on("pointerup", () => toggleInfoPanel(this));
    }

    this.goldText.setX(width - 32);
    this.inventoryText.setX(width - 32);
    this.controlsHint.setPosition(width - 32, height - 32);
    this.sleepBtn.setY(height - 48);
    this.craftBtn.setY(height - 88);

    this.infoBtnBg.clear();
    this.infoBtnBg.fillStyle(0x3b82f6, 1);
    this.infoBtnBg.fillCircle(width - 200, 36, 16);
    this.infoBtnText.setPosition(width - 200, 36);
    this.infoBtnZone.setPosition(width - 200, 36);

    this.dayText.setText(`☀ Day ${GameState.day}`);
    this.goldText.setText(`🪙 ${GameState.gold} Coins`);

    this.energyFill.clear();
    this.energyBg.clear();

    this.energyBg.fillStyle(0x1e293b, 1);
    this.energyBg.fillRoundedRect(32, 70, 150, 12, 3);

    const energyPct = Math.max(
      0,
      Math.min(1, GameState.energy / GameState.maxEnergy),
    );
    if (energyPct > 0) {
      this.energyFill.fillStyle(0x4ade80, 1);
      this.energyFill.fillRoundedRect(32, 70, 150 * energyPct, 12, 3);
    }

    let invItems = [];
    if (GameState.inventory.turnip_seed > 0)
      invItems.push(`🌱 Turnip Seed x${GameState.inventory.turnip_seed}`);
    if (GameState.inventory.potato_seed > 0)
      invItems.push(`🥔 Potato Seed x${GameState.inventory.potato_seed}`);
    if (GameState.inventory.turnip > 0)
      invItems.push(`🥗 Turnip x${GameState.inventory.turnip}`);
    if (GameState.inventory.potato > 0)
      invItems.push(`🥔 Potato x${GameState.inventory.potato}`);
    if (GameState.inventory.salad > 0)
      invItems.push(`🥗 Fresh Salad x${GameState.inventory.salad}`);
    if (GameState.inventory.mashed_potato > 0)
      invItems.push(`🍳 Mashed Potato x${GameState.inventory.mashed_potato}`);

    this.inventoryText.setText(
      invItems.length > 0 ? invItems.join("  ") : "(Empty Bag)",
    );

    this.questBox.clear();
    const boxW = 280;
    const boxH = 60;
    const boxX = width - boxW - 32;
    const boxY = height - boxH - 60;
    this.questBox.fillStyle(0x000000, 0.75);
    this.questBox.fillRoundedRect(boxX, boxY, boxW, boxH, 8);
    this.questBox.lineStyle(1, 0x334155, 1);
    this.questBox.strokeRoundedRect(boxX, boxY, boxW, boxH, 8);

    this.questTitle.setX(boxX + boxW / 2).setY(boxY + 18);
    this.questProgress.setX(boxX + boxW / 2).setY(boxY + 40);

    if (GameState.activeQuest < GameState.quests.length) {
      const q = GameState.quests[GameState.activeQuest];
      this.questTitle.setText(`📋 Active Quest: ${q.title}`);
      this.questProgress.setText(q.desc);
    } else {
      this.questTitle.setText(" All quests completed!");
      this.questProgress.setText("You are a legendary pixel farmer!");
    }
  }

  showFloatingText(x, y, text, color = "#ffffff") {
    const t = this.add.text(x, y, text, {
      fontSize: "14px",
      color,
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 3,
    });
    t.setDepth(1000);
    this.tweens.add({
      targets: t,
      y: y - 60,
      alpha: 0,
      duration: 1200,
      ease: "Power2",
      onComplete: () => t.destroy(),
    });
  }
}
