import type { GameSnapshot, ItemState, Vector2 } from "../../types/gameState";
import { circleIntersectsRect, circlesOverlap } from "../../utils/collision";
import { distance, normalizeVector, scaleVector, subtractVectors } from "../../utils/math";
import { createItem } from "../entities/item";
import { moveEntityWithCollisions } from "./movementSystem";

function dropRewards(snapshot: GameSnapshot, position: Vector2, expReward: number): void {
  snapshot.items.push(createItem("xp-shard", position, expReward));

  if (snapshot.player.hp < snapshot.player.maxHp * 0.5 && snapshot.kills > 0 && snapshot.kills % 8 === 0) {
    snapshot.items.push(createItem("medkit", position, 20));
  }
}

function collectItem(snapshot: GameSnapshot, item: ItemState): void {
  if (item.kind === "xp-shard") {
    snapshot.player.exp += item.value;
    snapshot.score += item.value;
    return;
  }

  snapshot.player.hp = Math.min(snapshot.player.maxHp, snapshot.player.hp + item.value);
}

export function updateCollisionSystem(snapshot: GameSnapshot, deltaMs: number): void {
  for (const projectile of snapshot.projectiles) {
    if (snapshot.obstacles.some((obstacle) => circleIntersectsRect(projectile.position, projectile.radius, obstacle))) {
      projectile.lifetimeMs = 0;
      continue;
    }

    for (const enemy of snapshot.enemies) {
      if (!circlesOverlap(projectile, enemy)) {
        continue;
      }

      enemy.hp -= projectile.damage;
      projectile.lifetimeMs = 0;
      break;
    }
  }

  const survivingEnemies = [];

  for (const enemy of snapshot.enemies) {
    if (enemy.hp <= 0) {
      snapshot.kills += 1;
      dropRewards(snapshot, enemy.position, enemy.expReward);
      continue;
    }

    if (
      circlesOverlap(snapshot.player, enemy) &&
      snapshot.player.invulnerabilityMs === 0 &&
      enemy.touchCooldownMs === 0
    ) {
      snapshot.player.hp = Math.max(0, snapshot.player.hp - enemy.damage);
      snapshot.player.invulnerabilityMs = 700;
      enemy.touchCooldownMs = 400;

      const knockback = normalizeVector(subtractVectors(snapshot.player.position, enemy.position));
      snapshot.player.position = moveEntityWithCollisions(
        snapshot.player.position,
        scaleVector(knockback, 24),
        snapshot.player.radius,
        snapshot.obstacles,
        snapshot.world
      );
    }

    survivingEnemies.push(enemy);
  }

  snapshot.enemies = survivingEnemies;
  snapshot.projectiles = snapshot.projectiles.filter((projectile) => projectile.lifetimeMs > 0);

  snapshot.items = snapshot.items.filter((item) => {
    item.lifetimeMs -= deltaMs;

    if (item.lifetimeMs <= 0) {
      return false;
    }

    if (distance(snapshot.player.position, item.position) <= snapshot.player.stats.pickupRadius + item.radius) {
      collectItem(snapshot, item);
      return false;
    }

    return true;
  });
}
