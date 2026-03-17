import { formatElapsedMs } from "../../game";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

interface GameOverScreenProps {
  bestTimeMs: number;
  elapsedMs: number;
  kills: number;
  onRestart: () => void;
  onReturnHome: () => void;
  score: number;
}

export default function GameOverScreen({
  bestTimeMs,
  elapsedMs,
  kills,
  onRestart,
  onReturnHome,
  score,
}: GameOverScreenProps) {
  return (
    <Modal
      footer={
        <div className="action-row">
          <Button onClick={onRestart}>Run It Back</Button>
          <Button onClick={onReturnHome} variant="secondary">
            Return Home
          </Button>
        </div>
      }
      open
      title="The Dungeon Wins"
    >
      <div className="result-grid">
        <div className="result-tile">
          <span>Time</span>
          <strong>{formatElapsedMs(elapsedMs)}</strong>
        </div>
        <div className="result-tile">
          <span>Kills</span>
          <strong>{kills}</strong>
        </div>
        <div className="result-tile">
          <span>Score</span>
          <strong>{score}</strong>
        </div>
        <div className="result-tile">
          <span>Best</span>
          <strong>{formatElapsedMs(bestTimeMs)}</strong>
        </div>
      </div>
    </Modal>
  );
}
