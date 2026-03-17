import type { SkillUpgradeCard } from "../../types/gameState";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

interface LevelUpModalProps {
  choices: SkillUpgradeCard[];
  onSelect: (upgradeId: SkillUpgradeCard["id"]) => void;
}

export default function LevelUpModal({ choices, onSelect }: LevelUpModalProps) {
  return (
    <Modal open size="large" title="Level Up">
      <div className="level-up-grid">
        {choices.map((choice) => (
          <article className="level-card" key={choice.id}>
            <span className="level-card__tag">{choice.shortLabel}</span>
            <h3>{choice.title}</h3>
            <p>{choice.description}</p>
            <Button onClick={() => onSelect(choice.id)}>Take Upgrade</Button>
          </article>
        ))}
      </div>
    </Modal>
  );
}
