import { formatElapsedMs } from "../../game";
import Button from "../ui/Button";
import Panel from "../ui/Panel";

interface StartScreenProps {
  bestTimeMs: number;
  onOpenSettings: () => void;
  onStart: () => void;
}

export default function StartScreen({ bestTimeMs, onOpenSettings, onStart }: StartScreenProps) {
  return (
    <Panel className="start-screen" eyebrow="Canvas Roguelike" title="Dungeon Survivor">
      <div className="title-stack">
        <h1 className="hero-title">Stay alive while the dungeon learns how to kill you.</h1>
        <p className="hero-subtitle">
          This MVP is built on a modular engine: canvas rendering, Zustand stores, isolated systems, and a
          React shell that can scale into a full survivor game.
        </p>
      </div>

      <div className="stat-grid">
        <div className="stat-chip">
          <span>Best Time</span>
          <strong>{bestTimeMs > 0 ? formatElapsedMs(bestTimeMs) : "00:00"}</strong>
        </div>
        <div className="stat-chip">
          <span>Core Inputs</span>
          <strong>WASD + Mouse</strong>
        </div>
        <div className="stat-chip">
          <span>Loop</span>
          <strong>requestAnimationFrame</strong>
        </div>
      </div>

      <div className="hero-actions">
        <Button onClick={onStart}>Enter the Dungeon</Button>
        <Button onClick={onOpenSettings} variant="secondary">
          Settings
        </Button>
      </div>
    </Panel>
  );
}
