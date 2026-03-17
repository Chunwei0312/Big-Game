import type { EnemyArchetypeId, EnemyState, Vector2 } from "../../types/gameState";
import { createId } from "../../utils/id";
import { getEnemyDefinition } from "../data/enemies";

export function createEnemy(archetypeId: EnemyArchetypeId, position: Vector2): EnemyState {
  const definition = getEnemyDefinition(archetypeId);

  return {
    id: createId("enemy"),
    archetypeId,
    position: { ...position },
    velocity: { x: 0, y: 0 },
    radius: definition.radius,
    hp: definition.maxHp,
    maxHp: definition.maxHp,
    speed: definition.speed,
    damage: definition.damage,
    expReward: definition.expReward,
    color: definition.color,
    touchCooldownMs: 0,
  };
}
