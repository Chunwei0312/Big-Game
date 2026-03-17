import Button from "../ui/Button";
import Modal from "../ui/Modal";

interface PauseOverlayProps {
  onOpenSettings: () => void;
  onResume: () => void;
  onReturnHome: () => void;
}

export default function PauseOverlay({ onOpenSettings, onResume, onReturnHome }: PauseOverlayProps) {
  return (
    <Modal
      footer={
        <div className="action-row">
          <Button onClick={onResume}>Resume Run</Button>
          <Button onClick={onOpenSettings} variant="secondary">
            Settings
          </Button>
          <Button onClick={onReturnHome} variant="ghost">
            Return Home
          </Button>
        </div>
      }
      open
      title="Run Paused"
    >
      <p className="modal-copy">
        Enemies are frozen. Adjust settings, catch your breath, or head back to the sanctuary.
      </p>
    </Modal>
  );
}
