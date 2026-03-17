import { getSkillDefinition } from "../../game/data/skills";
import type { SkillUpgradeId } from "../../types/gameState";

interface SkillBarProps {
  upgrades: SkillUpgradeId[];
}

export default function SkillBar({ upgrades }: SkillBarProps) {
  return (
    <div className="hud-card">
      <div className="hud-card__header">
        <span>Loadout</span>
        <span>{upgrades.length === 0 ? "Starter Wand" : `${upgrades.length} upgrades`}</span>
      </div>
      <div className="skill-strip">
        {upgrades.length === 0 ? <span className="skill-pill">Starter Wand</span> : null}
        {upgrades.map((upgrade) => (
          <span className="skill-pill" key={upgrade}>
            {getSkillDefinition(upgrade).shortLabel}
          </span>
        ))}
      </div>
    </div>
  );
}
