import type { EnemyArchetypeId } from "../../types/gameState";

export interface EnemyDefinition {
  id: EnemyArchetypeId;
  label: string;
  radius: number;
  maxHp: number;
  speed: number;
  damage: number;
  expReward: number;
  color: string;
}

export const ENEMY_DEFINITIONS: Record<EnemyArchetypeId, EnemyDefinition> = {
  crawler: {
    id: "crawler",
    label: "Crawler",
    radius: 16,
    maxHp: 24,
    speed: 160,
    damage: 10,
    expReward: 6,
    color: "#e76f51",
  },
  brute: {
    id: "brute",
    label: "Brute",
    radius: 24,
    maxHp: 52,
    speed: 92,
    damage: 18,
    expReward: 12,
    color: "#9d4edd",
  },
  phantom: {
    id: "phantom",
    label: "Phantom",
    radius: 14,
    maxHp: 18,
    speed: 210,
    damage: 8,
    expReward: 7,
    color: "#4cc9f0",
  },
};

export function getEnemyDefinition(archetypeId: EnemyArchetypeId): EnemyDefinition {
  return ENEMY_DEFINITIONS[archetypeId];
}
