import type { PlayerState, ProjectileState, Vector2 } from "../../types/gameState";
import { createId } from "../../utils/id";
import { normalizeVector, scaleVector } from "../../utils/math";

export function createProjectile(origin: Vector2, direction: Vector2, player: PlayerState): ProjectileState {
  const normalizedDirection = normalizeVector(direction);

  return {
    id: createId("projectile"),
    position: { ...origin },
    velocity: scaleVector(normalizedDirection, player.stats.projectileSpeed),
    radius: player.stats.projectileRadius,
    damage: player.stats.attackDamage,
    lifetimeMs: player.stats.projectileLifetimeMs,
    color: "#ffe066",
  };
}
