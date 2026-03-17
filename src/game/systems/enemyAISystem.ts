import type { EnemyState, GameSnapshot, Vector2 } from "../../types/gameState";
import { addVectors, distance, normalizeVector, scaleVector, subtractVectors } from "../../utils/math";
import { moveEntityWithCollisions } from "./movementSystem";

function getSeparationForce(enemy: EnemyState, enemies: EnemyState[]): Vector2 {
  let separation = { x: 0, y: 0 };

  for (const other of enemies) {
    if (other.id === enemy.id) {
      continue;
    }

    const gap = distance(enemy.position, other.position);
    const minGap = enemy.radius + other.radius + 20;

    if (gap > 0 && gap < minGap) {
      const away = normalizeVector(subtractVectors(enemy.position, other.position));
      separation = addVectors(separation, scaleVector(away, (minGap - gap) / minGap));
    }
  }

  return separation;
}

export function updateEnemyAISystem(snapshot: GameSnapshot, deltaMs: number): void {
  const moveAmount = deltaMs / 1000;

  for (const enemy of snapshot.enemies) {
    const chaseDirection = normalizeVector(subtractVectors(snapshot.player.position, enemy.position));
    const separation = getSeparationForce(enemy, snapshot.enemies);
    const steering = normalizeVector(addVectors(chaseDirection, scaleVector(separation, 1.6)));
    const velocity = scaleVector(steering, enemy.speed);
    const movement = scaleVector(velocity, moveAmount);

    enemy.position = moveEntityWithCollisions(
      enemy.position,
      movement,
      enemy.radius,
      snapshot.obstacles,
      snapshot.world
    );
    enemy.velocity = velocity;
    enemy.touchCooldownMs = Math.max(0, enemy.touchCooldownMs - deltaMs);
  }
}
