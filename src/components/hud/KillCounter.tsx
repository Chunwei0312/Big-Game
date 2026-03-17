interface KillCounterProps {
  kills: number;
  wave: number;
}

export default function KillCounter({ kills, wave }: KillCounterProps) {
  return (
    <div className="hud-card hud-card--compact">
      <span className="hud-card__label">Kills</span>
      <strong>{kills}</strong>
      <span className="hud-card__meta">Wave {wave}</span>
    </div>
  );
}
