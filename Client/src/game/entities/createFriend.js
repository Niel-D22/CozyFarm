import { FRIEND_SCALE } from "../config/layoutConfig";
import { depthForY } from "../helpers/depth";

export function createFriend(scene) {
  const friendX = scene.worldX(790);
  const friendY = scene.worldY(405);
  scene.friend = scene.physics.add
    .sprite(friendX, friendY, "fplayer-idle")
    .setScale(FRIEND_SCALE)
    .setDepth(depthForY(friendY))
    .setImmovable(true);
  scene.friend.body.setSize(16, 16);
  scene.friend.body.setOffset(16, 28);
  if (!scene.anims.exists("f-idle-down")) {
    scene.anims.create({
      key: "f-idle-down",
      frames: scene.anims.generateFrameNumbers("fplayer-idle", {
        start: 0,
        end: 3,
      }),
      frameRate: 6,
      repeat: -1,
    });
  }
  scene.friend.play("f-idle-down");
  scene.speechBubble = scene.add.graphics().setDepth(depthForY(friendY, 1));
  scene.drawSpeechBubble(scene.friend.x - 10, scene.friend.y - 66);
  scene.speechBubble.setVisible(false);
  if (scene.speechExcl) {
    scene.speechExcl.setVisible(false);
  }
}
