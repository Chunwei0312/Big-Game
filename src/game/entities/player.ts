import type { PlayerState, Vector2 } from "../../types/gameState";
import { createId } from "../../utils/id";

export function createPlayer(position: Vector2): PlayerState {
  return {
    id: createId("player"),
    position: { ...position },
    velocity: { x: 0, y: 0 },
    radius: 18,
    hp: 100,
    maxHp: 100,
    level: 1,
    exp: 0,
    expToNext: 18,
    fireCooldownMs: 0,
    invulnerabilityMs: 0,
    facing: { x: 1, y: 0 },
    stats: {
      moveSpeed: 280,
      attackDamage: 20,
      fireIntervalMs: 340,
      projectileSpeed: 760,
      projectileLifetimeMs: 720,
      projectileRadius: 6,
      pickupRadius: 40,
    },
    upgrades: [],
  };
}
