import type { GameSnapshot, Rect, Vector2 } from "../../types/gameState";

function toScreen(position: Vector2, camera: Vector2): Vector2 {
  return {
    x: position.x - camera.x,
    y: position.y - camera.y,
  };
}

function drawObstacle(context: CanvasRenderingContext2D, obstacle: Rect, camera: Vector2): void {
  const screen = toScreen({ x: obstacle.x, y: obstacle.y }, camera);

  context.fillStyle = obstacle.color;
  context.strokeStyle = "rgba(255, 255, 255, 0.08)";
  context.lineWidth = 2;
  context.fillRect(screen.x, screen.y, obstacle.width, obstacle.height);
  context.strokeRect(screen.x, screen.y, obstacle.width, obstacle.height);
}

function drawHitbox(
  context: CanvasRenderingContext2D,
  position: Vector2,
  radius: number,
  camera: Vector2,
  color: string
): void {
  const screen = toScreen(position, camera);

  context.save();
  context.strokeStyle = color;
  context.lineWidth = 1.5;
  context.beginPath();
  context.arc(screen.x, screen.y, radius, 0, Math.PI * 2);
  context.stroke();
  context.restore();
}

export function renderGame(
  context: CanvasRenderingContext2D,
  snapshot: GameSnapshot,
  options: { showHitboxes: boolean }
): void {
  const { width, height } = snapshot.arena;

  context.clearRect(0, 0, width, height);

  const background = context.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, "#120d1b");
  background.addColorStop(1, "#24141b");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  context.save();
  context.strokeStyle = "rgba(255, 255, 255, 0.04)";
  context.lineWidth = 1;

  const gridSize = 80;
  const startX = -((snapshot.camera.x % gridSize) + gridSize);
  const startY = -((snapshot.camera.y % gridSize) + gridSize);

  for (let x = startX; x < width + gridSize; x += gridSize) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = startY; y < height + gridSize; y += gridSize) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  context.restore();

  for (const obstacle of snapshot.obstacles) {
    drawObstacle(context, obstacle, snapshot.camera);
  }

  for (const item of snapshot.items) {
    const screen = toScreen(item.position, snapshot.camera);
    context.save();
    context.shadowColor = item.color;
    context.shadowBlur = 14;
    context.fillStyle = item.color;
    context.beginPath();
    context.arc(screen.x, screen.y, item.radius, 0, Math.PI * 2);
    context.fill();
    context.restore();

    if (options.showHitboxes) {
      drawHitbox(context, item.position, item.radius, snapshot.camera, "#9bf6ff");
    }
  }

  for (const projectile of snapshot.projectiles) {
    const screen = toScreen(projectile.position, snapshot.camera);
    context.save();
    context.fillStyle = projectile.color;
    context.shadowColor = projectile.color;
    context.shadowBlur = 10;
    context.beginPath();
    context.arc(screen.x, screen.y, projectile.radius, 0, Math.PI * 2);
    context.fill();
    context.restore();

    if (options.showHitboxes) {
      drawHitbox(context, projectile.position, projectile.radius, snapshot.camera, "#ffe066");
    }
  }

  for (const enemy of snapshot.enemies) {
    const screen = toScreen(enemy.position, snapshot.camera);
    context.save();
    context.fillStyle = enemy.color;
    context.shadowColor = enemy.color;
    context.shadowBlur = 16;
    context.beginPath();
    context.arc(screen.x, screen.y, enemy.radius, 0, Math.PI * 2);
    context.fill();
    context.restore();

    const hpRatio = enemy.hp / enemy.maxHp;
    context.fillStyle = "rgba(0, 0, 0, 0.4)";
    context.fillRect(screen.x - 18, screen.y - enemy.radius - 14, 36, 5);
    context.fillStyle = "#80ed99";
    context.fillRect(screen.x - 18, screen.y - enemy.radius - 14, 36 * hpRatio, 5);

    if (options.showHitboxes) {
      drawHitbox(context, enemy.position, enemy.radius, snapshot.camera, "#ffadad");
    }
  }

  const playerScreen = toScreen(snapshot.player.position, snapshot.camera);
  context.save();
  context.fillStyle = snapshot.player.invulnerabilityMs > 0 ? "#ffd6a5" : "#f4a261";
  context.shadowColor = "#f4a261";
  context.shadowBlur = 20;
  context.beginPath();
  context.arc(playerScreen.x, playerScreen.y, snapshot.player.radius, 0, Math.PI * 2);
  context.fill();
  context.restore();

  context.strokeStyle = "#fff1c8";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(playerScreen.x, playerScreen.y);
  context.lineTo(
    playerScreen.x + snapshot.player.facing.x * 22,
    playerScreen.y + snapshot.player.facing.y * 22
  );
  context.stroke();

  if (options.showHitboxes) {
    drawHitbox(context, snapshot.player.position, snapshot.player.radius, snapshot.camera, "#f4a261");
  }

  const cursor = toScreen(snapshot.cursorWorld, snapshot.camera);
  context.save();
  context.strokeStyle = "rgba(255, 230, 109, 0.9)";
  context.lineWidth = 2;
  context.beginPath();
  context.arc(cursor.x, cursor.y, 10, 0, Math.PI * 2);
  context.moveTo(cursor.x - 14, cursor.y);
  context.lineTo(cursor.x + 14, cursor.y);
  context.moveTo(cursor.x, cursor.y - 14);
  context.lineTo(cursor.x, cursor.y + 14);
  context.stroke();
  context.restore();

  context.fillStyle = "rgba(255, 255, 255, 0.06)";
  context.fillRect(0, 0, width, height);
}
