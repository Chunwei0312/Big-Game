import type { GameSnapshot, SkillUpgradeId } from "../../types/gameState";
import { applySkillUpgrade, getSkillChoices } from "../data/skills";

export function updateLevelSystem(snapshot: GameSnapshot): void {
  if (snapshot.status !== "running") {
    return;
  }

  if (snapshot.player.exp < snapshot.player.expToNext) {
    return;
  }

  snapshot.player.exp -= snapshot.player.expToNext;
  snapshot.player.level += 1;
  snapshot.player.expToNext = Math.round(snapshot.player.expToNext * 1.35 + 6);
  snapshot.levelUpChoices = getSkillChoices(3, snapshot.player.upgrades);
  snapshot.status = "level-up";
}

export function applyLevelUpChoice(snapshot: GameSnapshot, upgradeId: SkillUpgradeId): void {
  applySkillUpgrade(snapshot.player, upgradeId);
  snapshot.levelUpChoices = [];
  snapshot.status = "running";
}
