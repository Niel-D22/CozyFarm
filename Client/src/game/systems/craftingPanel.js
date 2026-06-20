import GameState from "./GameState";

export function showCraftingPanel(scene) {
  if (scene.craftingPanel?.active) {
    return;
  }

  const farmScene = scene.scene.get("FarmScene");

  if (farmScene) {
    farmScene.movementLocked = true;
    farmScene.player.setVelocity(0, 0);
    farmScene.player.anims.play("idle-down");
  }

  const screenWidth = scene.scale.width;
  const screenHeight = scene.scale.height;

  const panel = scene.add
    .container(screenWidth / 2, screenHeight / 2)
    .setDepth(600);

  scene.craftingPanel = panel;

  const cover = scene.add
    .rectangle(
      -screenWidth / 2,
      -screenHeight / 2,
      screenWidth,
      screenHeight,
      0x000000,
      0.65,
    )
    .setOrigin(0)
    .setInteractive();

  panel.add(cover);

  const boxWidth = 480;
  const boxHeight = 390;

  const box = scene.add.graphics();

  box.fillStyle(0x0f172a, 0.98);
  box.fillRoundedRect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight, 16);

  box.lineStyle(3, 0xe8a838, 1);
  box.strokeRoundedRect(
    -boxWidth / 2,
    -boxHeight / 2,
    boxWidth,
    boxHeight,
    16,
  );

  panel.add(box);

  const titleText = scene.add
    .text(0, -boxHeight / 2 + 27, "🍳 Kitchen", {
      fontSize: "18px",
      fontFamily: "Arial",
      fontStyle: "bold",
      color: "#ffffff",
    })
    .setOrigin(0.5);

  panel.add(titleText);

  const closeBtn = scene.add
    .text(boxWidth / 2 - 30, -boxHeight / 2 + 27, "✕", {
      fontSize: "18px",
      fontFamily: "Arial",
      fontStyle: "bold",
      color: "#94a3b8",
    })
    .setOrigin(0.5)
    .setInteractive({
      useHandCursor: true,
    });

  panel.add(closeBtn);

  const divider = scene.add.graphics();

  divider.lineStyle(1, 0x334155, 1);
  divider.lineBetween(0, -125, 0, 160);

  panel.add(divider);

  const closePanel = () => {
    if (scene.craftListContainer) {
      scene.craftListContainer.destroy(true);
      scene.craftListContainer = null;
    }

    if (panel.active) {
      panel.destroy(true);
    }

    scene.craftingPanel = null;

    if (farmScene) {
      farmScene.movementLocked = false;
    }
  };

  closeBtn.on("pointerdown", closePanel);
  cover.on("pointerdown", closePanel);

  drawCraftingContent(scene, panel, boxWidth, boxHeight);
}

export function drawCraftingContent(scene, panel, boxWidth, boxHeight) {
  if (scene.craftListContainer) {
    scene.craftListContainer.destroy(true);
  }

  scene.craftListContainer = scene.add.container(0, 0);
  panel.add(scene.craftListContainer);

  const addText = (x, y, text, style, originX = 0.5, originY = 0.5) => {
    const object = scene.add
      .text(x, y, text, style)
      .setOrigin(originX, originY);

    scene.craftListContainer.add(object);

    return object;
  };

  addText(-125, -boxHeight / 2 + 70, "Recipes", {
    fontSize: "14px",
    fontFamily: "Arial",
    fontStyle: "bold",
    color: "#f5c45e",
  });

  addText(125, -boxHeight / 2 + 70, "Sell Items", {
    fontSize: "14px",
    fontFamily: "Arial",
    fontStyle: "bold",
    color: "#f5c45e",
  });

  const turnips = GameState.inventory.turnip;
  const canCookSalad = turnips >= 2;

  addText(
    -125,
    -boxHeight / 2 + 115,
    `🥗 Fresh Salad\nNeeds 2 Turnips (${turnips}/2)`,
    {
      fontSize: "11px",
      fontFamily: "Arial",
      color: "#cbd5e1",
      align: "center",
      lineSpacing: 4,
    },
  );

  const saladCookBtn = addText(
    -125,
    -boxHeight / 2 + 160,
    canCookSalad ? "Cook Salad" : "Not enough ingredients",
    {
      fontSize: "11px",
      fontFamily: "Arial",
      fontStyle: "bold",
      backgroundColor: canCookSalad ? "#10b981" : "#475569",
      padding: {
        x: 10,
        y: 6,
      },
      color: "#ffffff",
    },
  );

  if (canCookSalad) {
    saladCookBtn
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        GameState.inventory.turnip -= 2;
        GameState.inventory.salad += 1;

        GameState.addProgress(3, 1);

        scene.showFloatingText(
          scene.scale.width / 2,
          scene.scale.height / 2 - 150,
          "+1 Fresh Salad",
          "#10b981",
        );

        scene.updateHUDText();

        drawCraftingContent(scene, panel, boxWidth, boxHeight);
      });
  }

  const potatoes = GameState.inventory.potato;
  const canCookMashed = potatoes >= 2;

  addText(
    -125,
    -boxHeight / 2 + 225,
    `🥔 Mashed Potato\nNeeds 2 Potatoes (${potatoes}/2)`,
    {
      fontSize: "11px",
      fontFamily: "Arial",
      color: "#cbd5e1",
      align: "center",
      lineSpacing: 4,
    },
  );

  const mashedCookBtn = addText(
    -125,
    -boxHeight / 2 + 270,
    canCookMashed ? "Cook Potato" : "Not enough ingredients",
    {
      fontSize: "11px",
      fontFamily: "Arial",
      fontStyle: "bold",
      backgroundColor: canCookMashed ? "#10b981" : "#475569",
      padding: {
        x: 10,
        y: 6,
      },
      color: "#ffffff",
    },
  );

  if (canCookMashed) {
    mashedCookBtn
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        GameState.inventory.potato -= 2;
        GameState.inventory.mashed_potato += 1;

        GameState.addProgress(3, 1);

        scene.showFloatingText(
          scene.scale.width / 2,
          scene.scale.height / 2 - 150,
          "+1 Mashed Potato",
          "#10b981",
        );

        scene.updateHUDText();

        drawCraftingContent(scene, panel, boxWidth, boxHeight);
      });
  }

  const createSellItem = ({ y, label, inventoryKey, price }) => {
    const quantity = GameState.inventory[inventoryKey] ?? 0;

    const canSell = quantity > 0;

    addText(125, y, `${label}: ${quantity}\nPrice ${price} Coins`, {
      fontSize: "11px",
      fontFamily: "Arial",
      color: "#cbd5e1",
      align: "center",
      lineSpacing: 3,
    });

    const sellButton = addText(125, y + 35, canSell ? "Sell 1" : "Empty", {
      fontSize: "10px",
      fontFamily: "Arial",
      fontStyle: "bold",
      backgroundColor: canSell ? "#e8a838" : "#475569",
      padding: {
        x: 9,
        y: 5,
      },
      color: "#ffffff",
    });

    if (!canSell) {
      return;
    }

    sellButton
      .setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        GameState.inventory[inventoryKey] -= 1;
        GameState.gold += price;

        scene.showFloatingText(
          scene.scale.width / 2,
          scene.scale.height / 2 - 150,
          `+${price} Coins`,
          "#f5c45e",
        );

        scene.updateHUDText();

        drawCraftingContent(scene, panel, boxWidth, boxHeight);
      });
  };

  createSellItem({
    y: -boxHeight / 2 + 110,
    label: "Turnip",
    inventoryKey: "turnip",
    price: 10,
  });

  createSellItem({
    y: -boxHeight / 2 + 180,
    label: "Potato",
    inventoryKey: "potato",
    price: 15,
  });

  createSellItem({
    y: -boxHeight / 2 + 250,
    label: "Fresh Salad",
    inventoryKey: "salad",
    price: 35,
  });

  createSellItem({
    y: -boxHeight / 2 + 320,
    label: "Mashed Potato",
    inventoryKey: "mashed_potato",
    price: 45,
  });
}
