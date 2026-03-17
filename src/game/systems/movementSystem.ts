import type { GameSnapshot, InputSnapshot, Rect, Size, Vector2 } from "../../types/gameState";
import { resolveCircleRectCollision } from "../../utils/collision";
import { clamp, normalizeVector, scaleVector } from "../../utils/math";

function resolveObstacles(position: Vector2, radius: number, obstacles: Rect[]): Vector2 {
  let resolved = position;

  for (const obstacle of obstacles) {
    resolved = resolveCircleRectCollision(resolved, radius, obstacle);
  }

  return resolved;
}

function clampToWorld(position: Vector2, radius: number, world: Size): Vector2 {
  return {
    x: clamp(position.x, radius, world.width - radius),
    y: clamp(position.y, radius, world.height - radius),
  };
}

export function moveEntityWithCollisions(
  position: Vector2,
  delta: Vector2,
  radius: number,
  obstacles: Rect[],
  world: Size
): Vector2 {
  let next = {
    x: position.x + delta.x,
    y: position.y,
  };
  next = clampToWorld(next, radius, world);
  next = resolveObstacles(next, radius, obstacles);

  next = {
    x: next.x,
    y: next.y + delta.y,
  };
  next = clampToWorld(next, radius, world);
  next = resolveObstacles(next, radius, obstacles);

  return next;
}

export function updateMovementSystem(snapshot: GameSnapshot, input: InputSnapshot, deltaMs: number): void {
  const direction = normalizeVector(input.movement);
  const moveStep = scaleVector(direction, snapshot.player.stats.moveSpeed * (deltaMs / 1000));

  snapshot.player.position = moveEntityWithCollisions(
    snapshot.player.position,
    moveStep,
    snapshot.player.radius,
    snapshot.obstacles,
    snapshot.world
  );
  snapshot.player.velocity = scaleVector(direction, snapshot.player.stats.moveSpeed);
  snapshot.player.invulnerabilityMs = Math.max(0, snapshot.player.invulnerabilityMs - deltaMs);

  if (direction.x !== 0 || direction.y !== 0) {
    snapshot.player.facing = direction;
  }
}
