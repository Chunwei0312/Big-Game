import { formatElapsedMs } from "../../game";
import { useGameEngine } from "../../hooks/useGameEngine";
import { useGameStore } from "../../store/gameStore";
import { useUIStore } from "../../store/uiStore";
import ExpBar from "../hud/ExpBar";
import HpBar from "../hud/HpBar";
import KillCounter from "../hud/KillCounter";
import SkillBar from "../hud/SkillBar";
import Timer from "../hud/Timer";
import GameOverScreen from "../menu/GameOverScreen";
import LevelUpModal from "../menu/LevelUpModal";
import Button from "../ui/Button";
import GameCanvas from "./GameCanvas";
import PauseOverlay from "./PauseOverlay";

export default function GameContainer() {
  const { canvasRef, containerRef } = useGameEngine();

  const status = useGameStore((state) => state.snapshot.status);
  const hp = useGameStore((state) => state.snapshot.player.hp);
  const maxHp = useGameStore((state) => state.snapshot.player.maxHp);
  const exp = useGameStore((state) => state.snapshot.player.exp);
  const expToNext = useGameStore((state) => state.snapshot.player.expToNext);
  const level = useGameStore((state) => state.snapshot.player.level);
  const upgrades = useGameStore((state) => state.snapshot.player.upgrades);
  const kills = useGameStore((state) => state.snapshot.kills);
  const waveIndex = useGameStore((state) => state.snapshot.waveIndex);
  const elapsedMs = useGameStore((state) => state.snapshot.elapsedMs);
  const score = useGameStore((state) => state.snapshot.score);
  const bestTimeMs = useGameStore((state) => state.snapshot.bestTimeMs);
  const levelUpChoices = useGameStore((state) => state.snapshot.levelUpChoices);
  const setStatus = useGameStore((state) => state.setStatus);
  const startRun = useGameStore((state) => state.startRun);
  const queueUpgrade = useGameStore((state) => state.queueUpgrade);
  const setScreen = useUIStore((state) => state.setScreen);
  const openSettings = useUIStore((state) => state.openSettings);

  const returnHome = () => {
    setStatus("menu");
    setScreen("home");
  };

  return (
    <div className="game-container">
      <div className="game-hud-top">
        <HpBar hp={hp} maxHp={maxHp} />
        <ExpBar exp={exp} expToNext={expToNext} level={level} />
      </div>

      <div className="game-stage">
        <GameCanvas canvasRef={canvasRef} containerRef={containerRef} />

        <div className="game-overlay game-overlay--bottom">
          <SkillBar upgrades={upgrades} />
          <div className="summary-strip">
            <KillCounter kills={kills} wave={waveIndex} />
            <Timer elapsedMs={elapsedMs} />
            <div className="hud-card hud-card--compact">
              <span className="hud-card__label">Score</span>
              <strong>{score}</strong>
              <span className="hud-card__meta">Best {formatElapsedMs(bestTimeMs)}</span>
            </div>
          </div>
        </div>

        <div className="status-banner">
          <span>Wave {waveIndex}</span>
          <span>{status === "running" ? "Live" : status.replace("-", " ")}</span>
          <Button onClick={openSettings} variant="ghost">
            Settings
          </Button>
        </div>

        {status === "paused" ? (
          <PauseOverlay onOpenSettings={openSettings} onResume={() => setStatus("running")} onReturnHome={returnHome} />
        ) : null}

        {status === "level-up" ? <LevelUpModal choices={levelUpChoices} onSelect={queueUpgrade} /> : null}

        {status === "game-over" ? (
          <GameOverScreen
            bestTimeMs={bestTimeMs}
            elapsedMs={elapsedMs}
            kills={kills}
            onRestart={startRun}
            onReturnHome={returnHome}
            score={score}
          />
        ) : null}
      </div>
    </div>
  );
}
