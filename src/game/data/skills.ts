import type { PlayerState, SkillUpgradeCard, SkillUpgradeId } from "../../types/gameState";
import { pickRandomItems } from "../../utils/random";

interface SkillDefinition extends SkillUpgradeCard {
  apply: (player: PlayerState) => void;
}

const SKILL_DEFINITIONS: Record<SkillUpgradeId, SkillDefinition> = {
  "swift-boots": {
    id: "swift-boots",
    title: "Swift Boots",
    description: "Increase move speed and make kiting safer.",
    shortLabel: "Boots",
    apply: (player) => {
      player.stats.moveSpeed += 36;
    },
  },
  "arcane-bolts": {
    id: "arcane-bolts",
    title: "Arcane Bolts",
    description: "Shorten the auto-fire interval for denser shots.",
    shortLabel: "Bolts",
    apply: (player) => {
      player.stats.fireIntervalMs = Math.max(150, player.stats.fireIntervalMs - 40);
    },
  },
  "iron-heart": {
    id: "iron-heart",
    title: "Iron Heart",
    description: "Raise max HP and restore part of the new total immediately.",
    shortLabel: "Heart",
    apply: (player) => {
      player.maxHp += 18;
      player.hp = Math.min(player.maxHp, player.hp + 18);
    },
  },
  "crystal-edge": {
    id: "crystal-edge",
    title: "Crystal Edge",
    description: "Projectiles hit harder and clear tougher waves sooner.",
    shortLabel: "Edge",
    apply: (player) => {
      player.stats.attackDamage += 8;
    },
  },
  "recovery-core": {
    id: "recovery-core",
    title: "Recovery Core",
    description: "Boost pickup radius and patch some of the damage already taken.",
    shortLabel: "Core",
    apply: (player) => {
      player.stats.pickupRadius += 22;
      player.hp = Math.min(player.maxHp, player.hp + 14);
    },
  },
  "phase-rounds": {
    id: "phase-rounds",
    title: "Phase Rounds",
    description: "Projectiles travel faster and stay alive for longer lanes.",
    shortLabel: "Phase",
    apply: (player) => {
      player.stats.projectileSpeed += 90;
      player.stats.projectileLifetimeMs += 120;
    },
  },
};

export function getSkillDefinition(id: SkillUpgradeId): SkillDefinition {
  return SKILL_DEFINITIONS[id];
}

export function getSkillChoices(count: number, unlocked: SkillUpgradeId[]): SkillUpgradeCard[] {
  const available = Object.values(SKILL_DEFINITIONS).filter((skill) => !unlocked.includes(skill.id));
  const pool = available.length >= count ? available : Object.values(SKILL_DEFINITIONS);

  return pickRandomItems(pool, Math.min(count, pool.length)).map(({ id, title, description, shortLabel }) => ({
    id,
    title,
    description,
    shortLabel,
  }));
}

export function applySkillUpgrade(player: PlayerState, id: SkillUpgradeId): void {
  const definition = getSkillDefinition(id);
  definition.apply(player);

  if (!player.upgrades.includes(id)) {
    player.upgrades.push(id);
  }
}
