interface HpBarProps {
  hp: number;
  maxHp: number;
}

export default function HpBar({ hp, maxHp }: HpBarProps) {
  const ratio = Math.max(0, Math.min(1, hp / maxHp));

  return (
    <div className="hud-card">
      <div className="hud-card__header">
        <span>Vitality</span>
        <span>
          {Math.ceil(hp)} / {maxHp}
        </span>
      </div>
      <div className="bar">
        <div className="bar__fill bar__fill--hp" style={{ width: `${ratio * 100}%` }} />
      </div>
    </div>
  );
}
