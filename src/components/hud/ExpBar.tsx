interface ExpBarProps {
  exp: number;
  expToNext: number;
  level: number;
}

export default function ExpBar({ exp, expToNext, level }: ExpBarProps) {
  const ratio = Math.max(0, Math.min(1, exp / expToNext));

  return (
    <div className="hud-card">
      <div className="hud-card__header">
        <span>Level {level}</span>
        <span>
          {Math.floor(exp)} / {expToNext} XP
        </span>
      </div>
      <div className="bar">
        <div className="bar__fill bar__fill--exp" style={{ width: `${ratio * 100}%` }} />
      </div>
    </div>
  );
}
