import { describe, expect, it } from "vitest";
import { createEmptySnapshot, type ProjectileState } from "../../types/gameState";
import { updateCollisionSystem } from "./collisionSystem";

function createTestProjectile(position: ProjectileState["position"]): ProjectileState {
  return {
    id: "projectile-test",
    position,
    velocity: { x: 0, y: 0 },
    radius: 6,
    damage: 10,
    lifetimeMs: 500,
    color: "#ffe066",
  };
}

describe("updateCollisionSystem", () => {
  it("removes projectiles that hit obstacles", () => {
    const snapshot = createEmptySnapshot();
    snapshot.obstacles = [
      {
        id: "wall",
        x: 90,
        y: 90,
        width: 80,
        height: 80,
        color: "#222",
      },
    ];
    snapshot.projectiles = [createTestProjectile({ x: 100, y: 100 })];

    updateCollisionSystem(snapshot, 16);

    expect(snapshot.projectiles).toHaveLength(0);
  });
});
