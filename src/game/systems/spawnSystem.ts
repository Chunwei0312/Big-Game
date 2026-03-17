import type { GameSnapshot } from "../../types/gameState";
import { distance } from "../../utils/math";
import { pickRandom, randomPointOnEdge } from "../../utils/random";
import { createEnemy } from "../entities/enemy";
import { getWaveForElapsedMs } from "../world/waves";

export function updateSpawnSystem(snapshot: GameSnapshot, deltaMs: number): void {
  const { config, index } = getWaveForElapsedMs(snapshot.elapsedMs);
  snapshot.waveIndex = index;
  snapshot.spawnCooldownMs -= deltaMs;

  while (snapshot.spawnCooldownMs <= 0 && snapshot.enemies.length < config.maxEnemies) {
    let spawnPoint = randomPointOnEdge(snapshot.world, 48);

    for (let attempt = 0; attempt < 6; attempt += 1) {
      if (distance(spawnPoint, snapshot.player.position) >= 260) {
        break;
      }

      spawnPoint = randomPointOnEdge(snapshot.world, 48);
    }

    const archetypeId = pickRandom(config.enemyPool);
    snapshot.enemies.push(createEnemy(archetypeId, spawnPoint));
    snapshot.spawnCooldownMs += config.spawnIntervalMs;
  }
}
