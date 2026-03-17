export type GameStatus = "menu" | "running" | "paused" | "level-up" | "game-over";
export type UIScreen = "home" | "game";

export type EnemyArchetypeId = "crawler" | "brute" | "phantom";
export type ItemKind = "xp-shard" | "medkit";
export type SkillUpgradeId =
  | "swift-boots"
  | "arcane-bolts"
  | "iron-heart"
  | "crystal-edge"
  | "recovery-core"
  | "phase-rounds";

export interface Vector2 {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface PlayerStats {
  moveSpeed: number;
  attackDamage: number;
  fireIntervalMs: number;
  projectileSpeed: number;
  projectileLifetimeMs: number;
  projectileRadius: number;
  pickupRadius: number;
}

export interface PlayerState {
  id: string;
  position: Vector2;
  velocity: Vector2;
  radius: number;
  hp: number;
  maxHp: number;
  level: number;
  exp: number;
  expToNext: number;
  fireCooldownMs: number;
  invulnerabilityMs: number;
  facing: Vector2;
  stats: PlayerStats;
  upgrades: SkillUpgradeId[];
}

export interface EnemyState {
  id: string;
  archetypeId: EnemyArchetypeId;
  position: Vector2;
  velocity: Vector2;
  radius: number;
  hp: number;
  maxHp: number;
  speed: number;
  damage: number;
  expReward: number;
  color: string;
  touchCooldownMs: number;
}

export interface ProjectileState {
  id: string;
  position: Vector2;
  velocity: Vector2;
  radius: number;
  damage: number;
  lifetimeMs: number;
  color: string;
}

export interface ItemState {
  id: string;
  kind: ItemKind;
  position: Vector2;
  velocity: Vector2;
  radius: number;
  value: number;
  lifetimeMs: number;
  color: string;
}

export interface SkillUpgradeCard {
  id: SkillUpgradeId;
  title: string;
  description: string;
  shortLabel: string;
}

export interface GameSettings {
  masterVolume: number;
  showHitboxes: boolean;
  autoPauseOnBlur: boolean;
}

export interface GameSnapshot {
  status: GameStatus;
  arena: Size;
  world: Size;
  camera: Vector2;
  cursorWorld: Vector2;
  player: PlayerState;
  enemies: EnemyState[];
  projectiles: ProjectileState[];
  items: ItemState[];
  obstacles: Rect[];
  elapsedMs: number;
  kills: number;
  score: number;
  waveIndex: number;
  spawnCooldownMs: number;
  levelUpChoices: SkillUpgradeCard[];
  bestTimeMs: number;
}

export interface InputSnapshot {
  movement: Vector2;
  pointerScreen: Vector2;
  pointerWorld: Vector2;
  pointerActive: boolean;
  primaryDown: boolean;
  togglePausePressed: boolean;
}

export const DEFAULT_ARENA_SIZE: Size = {
  width: 1280,
  height: 720,
};

export const DEFAULT_WORLD_SIZE: Size = {
  width: 2200,
  height: 1400,
};

const DEFAULT_PLAYER_STATS: PlayerStats = {
  moveSpeed: 280,
  attackDamage: 20,
  fireIntervalMs: 340,
  projectileSpeed: 760,
  projectileLifetimeMs: 720,
  projectileRadius: 6,
  pickupRadius: 40,
};

export function createEmptySnapshot(): GameSnapshot {
  return {
    status: "menu",
    arena: { ...DEFAULT_ARENA_SIZE },
    world: { ...DEFAULT_WORLD_SIZE },
    camera: { x: 0, y: 0 },
    cursorWorld: { x: DEFAULT_WORLD_SIZE.width / 2, y: DEFAULT_WORLD_SIZE.height / 2 },
    player: {
      id: "player-placeholder",
      position: { x: DEFAULT_WORLD_SIZE.width / 2, y: DEFAULT_WORLD_SIZE.height / 2 },
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
      stats: { ...DEFAULT_PLAYER_STATS },
      upgrades: [],
    },
    enemies: [],
    projectiles: [],
    items: [],
    obstacles: [],
    elapsedMs: 0,
    kills: 0,
    score: 0,
    waveIndex: 1,
    spawnCooldownMs: 1200,
    levelUpChoices: [],
    bestTimeMs: 0,
  };
}
