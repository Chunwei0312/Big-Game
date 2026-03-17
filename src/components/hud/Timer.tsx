import { formatElapsedMs } from "../../game";

interface TimerProps {
  elapsedMs: number;
}

export default function Timer({ elapsedMs }: TimerProps) {
  return (
    <div className="hud-card hud-card--compact">
      <span className="hud-card__label">Time</span>
      <strong>{formatElapsedMs(elapsedMs)}</strong>
      <span className="hud-card__meta">Survive longer to scale score</span>
    </div>
  );
}
