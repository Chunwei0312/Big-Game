import type { EnemyState, GameSnapshot, InputSnapshot, Vector2 } from "../../types/gameState";
import { distance, normalizeVector, scaleVector, subtractVectors } from "../../utils/math";
import { createProjectile } from "../entities/projectile";

function getNearestEnemy(snapshot: GameSnapshot): EnemyState | null {
  let nearest: EnemyState | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const enemy of snapshot.enemies) {
    const currentDistance = distance(snapshot.player.position, enemy.position);

    if (currentDistance < nearestDistance) {
      nearest = enemy;
      nearestDistance = currentDistance;
    }
  }

  return nearest;
}

function getAimDirection(snapshot: GameSnapshot, input: InputSnapshot): Vector2 | null {
  if (input.pointerActive) {
    const pointerDirection = subtractVectors(snapshot.cursorWorld, snapshot.player.position);

    if (distance(snapshot.cursorWorld, snapshot.player.position) > 16) {
      return normalizeVector(pointerDirection);
    }
  }

  const nearestEnemy = getNearestEnemy(snapshot);

  if (nearestEnemy) {
    return normalizeVector(subtractVectors(nearestEnemy.position, snapshot.player.position));
  }

  if (snapshot.player.facing.x !== 0 || snapshot.player.facing.y !== 0) {
    return snapshot.player.facing;
  }

  return null;
}

export function updateCombatSystem(snapshot: GameSnapshot, input: InputSnapshot, deltaMs: number): void {
  snapshot.player.fireCooldownMs = Math.max(0, snapshot.player.fireCooldownMs - deltaMs);

  if (snapshot.player.fireCooldownMs === 0) {
    const aimDirection = getAimDirection(snapshot, input);

    if (aimDirection) {
      snapshot.projectiles.push(createProjectile(snapshot.player.position, aimDirection, snapshot.player));
      snapshot.player.fireCooldownMs = snapshot.player.stats.fireIntervalMs;
    }
  }

  snapshot.projectiles = snapshot.projectiles
    .map((projectile) => ({
      ...projectile,
      position: {
        x: projectile.position.x + projectile.velocity.x * (deltaMs / 1000),
        y: projectile.position.y + projectile.velocity.y * (deltaMs / 1000),
      },
      velocity: scaleVector(projectile.velocity, 1),
      lifetimeMs: projectile.lifetimeMs - deltaMs,
    }))
    .filter(
      (projectile) =>
        projectile.lifetimeMs > 0 &&
        projectile.position.x >= -64 &&
        projectile.position.y >= -64 &&
        projectile.position.x <= snapshot.world.width + 64 &&
        projectile.position.y <= snapshot.world.height + 64
    );
}
