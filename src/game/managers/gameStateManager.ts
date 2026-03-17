import { createEmptySnapshot, type GameSnapshot, type GameStatus, type InputSnapshot, type SkillUpgradeId } from "../../types/gameState";
import { createPlayer } from "../entities/player";
import { updateCombatSystem } from "../systems/combatSystem";
import { updateCollisionSystem } from "../systems/collisionSystem";
import { updateEnemyAISystem } from "../systems/enemyAISystem";
import { applyLevelUpChoice, updateLevelSystem } from "../systems/levelSystem";
import { updateMovementSystem } from "../systems/movementSystem";
import { updateSpawnSystem } from "../systems/spawnSystem";
import { getCameraPosition, screenToWorld, WORLD_SIZE } from "../world/map";
import { WORLD_OBSTACLES } from "../world/obstacles";

function cloneSnapshot(snapshot: GameSnapshot): GameSnapshot {
  return {
    ...snapshot,
    arena: { ...snapshot.arena },
    world: { ...snapshot.world },
    camera: { ...snapshot.camera },
    cursorWorld: { ...snapshot.cursorWorld },
    player: {
      ...snapshot.player,
      position: { ...snapshot.player.position },
      velocity: { ...snapshot.player.velocity },
      facing: { ...snapshot.player.facing },
      stats: { ...snapshot.player.stats },
      upgrades: [...snapshot.player.upgrades],
    },
    enemies: snapshot.enemies.map((enemy) => ({
      ...enemy,
      position: { ...enemy.position },
      velocity: { ...enemy.velocity },
    })),
    projectiles: snapshot.projectiles.map((projectile) => ({
      ...projectile,
      position: { ...projectile.position },
      velocity: { ...projectile.velocity },
    })),
    items: snapshot.items.map((item) => ({
      ...item,
      position: { ...item.position },
      velocity: { ...item.velocity },
    })),
    obstacles: snapshot.obstacles.map((obstacle) => ({ ...obstacle })),
    levelUpChoices: snapshot.levelUpChoices.map((choice) => ({ ...choice })),
  };
}

export class GameStateManager {
  private snapshot: GameSnapshot;

  constructor(bestTimeMs = 0) {
    this.snapshot = this.createState(bestTimeMs);
  }

  private createState(bestTimeMs: number): GameSnapshot {
    const snapshot = createEmptySnapshot();
    const player = createPlayer({
      x: WORLD_SIZE.width / 2,
      y: WORLD_SIZE.height / 2,
    });

    snapshot.player = player;
    snapshot.world = { ...WORLD_SIZE };
    snapshot.obstacles = WORLD_OBSTACLES.map((obstacle) => ({ ...obstacle }));
    snapshot.bestTimeMs = bestTimeMs;
    snapshot.camera = getCameraPosition(player.position, snapshot.arena, snapshot.world);
    snapshot.cursorWorld = { ...player.position };

    return snapshot;
  }

  reset(bestTimeMs = this.snapshot.bestTimeMs): void {
    this.snapshot = this.createState(bestTimeMs);
  }

  resize(width: number, height: number): void {
    if (width <= 0 || height <= 0) {
      return;
    }

    this.snapshot.arena = { width, height };
    this.snapshot.camera = getCameraPosition(this.snapshot.player.position, this.snapshot.arena, this.snapshot.world);
    this.snapshot.cursorWorld = screenToWorld(
      {
        x: width / 2,
        y: height / 2,
      },
      this.snapshot.camera
    );
  }

  getStatus(): GameStatus {
    return this.snapshot.status;
  }

  setStatus(status: GameStatus): void {
    this.snapshot.status = status;
  }

  setBestTimeMs(bestTimeMs: number): void {
    this.snapshot.bestTimeMs = bestTimeMs;
  }

  update(deltaMs: number, input: InputSnapshot): void {
    if (input.togglePausePressed && (this.snapshot.status === "running" || this.snapshot.status === "paused")) {
      this.snapshot.status = this.snapshot.status === "running" ? "paused" : "running";
    }

    this.snapshot.camera = getCameraPosition(this.snapshot.player.position, this.snapshot.arena, this.snapshot.world);
    this.snapshot.cursorWorld = screenToWorld(input.pointerScreen, this.snapshot.camera);

    if (this.snapshot.status !== "running") {
      return;
    }

    this.snapshot.elapsedMs += deltaMs;
    updateMovementSystem(this.snapshot, input, deltaMs);
    this.snapshot.camera = getCameraPosition(this.snapshot.player.position, this.snapshot.arena, this.snapshot.world);
    this.snapshot.cursorWorld = screenToWorld(input.pointerScreen, this.snapshot.camera);
    updateSpawnSystem(this.snapshot, deltaMs);
    updateEnemyAISystem(this.snapshot, deltaMs);
    updateCombatSystem(this.snapshot, input, deltaMs);
    updateCollisionSystem(this.snapshot, deltaMs);
    updateLevelSystem(this.snapshot);

    this.snapshot.score =
      this.snapshot.kills * 20 +
      Math.floor(this.snapshot.elapsedMs / 1000) +
      this.snapshot.player.level * 10;

    if (this.snapshot.player.hp <= 0) {
      this.snapshot.status = "game-over";
      this.snapshot.bestTimeMs = Math.max(this.snapshot.bestTimeMs, this.snapshot.elapsedMs);
    }
  }

  applyUpgrade(upgradeId: SkillUpgradeId): void {
    if (this.snapshot.status !== "level-up") {
      return;
    }

    applyLevelUpChoice(this.snapshot, upgradeId);
  }

  getSnapshot(): GameSnapshot {
    return cloneSnapshot(this.snapshot);
  }
}
