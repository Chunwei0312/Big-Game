import type { EnemyArchetypeId } from "../../types/gameState";

export interface WaveConfig {
  startsAtMs: number;
  spawnIntervalMs: number;
  maxEnemies: number;
  enemyPool: EnemyArchetypeId[];
}

export const WAVES: WaveConfig[] = [
  {
    startsAtMs: 0,
    spawnIntervalMs: 1200,
    maxEnemies: 14,
    enemyPool: ["crawler", "crawler", "crawler", "phantom"],
  },
  {
    startsAtMs: 40_000,
    spawnIntervalMs: 950,
    maxEnemies: 18,
    enemyPool: ["crawler", "crawler", "phantom", "brute"],
  },
  {
    startsAtMs: 90_000,
    spawnIntervalMs: 780,
    maxEnemies: 24,
    enemyPool: ["crawler", "phantom", "phantom", "brute", "brute"],
  },
];

export function getWaveForElapsedMs(elapsedMs: number): { index: number; config: WaveConfig } {
  let index = 0;

  for (let waveIndex = 0; waveIndex < WAVES.length; waveIndex += 1) {
    if (elapsedMs >= WAVES[waveIndex].startsAtMs) {
      index = waveIndex;
    }
  }

  return {
    index: index + 1,
    config: WAVES[index],
  };
}
