import { useSettingsStore } from "../../store/settingsStore";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

interface SettingsModalProps {
  onClose: () => void;
  open: boolean;
}

export default function SettingsModal({ onClose, open }: SettingsModalProps) {
  const masterVolume = useSettingsStore((state) => state.masterVolume);
  const showHitboxes = useSettingsStore((state) => state.showHitboxes);
  const autoPauseOnBlur = useSettingsStore((state) => state.autoPauseOnBlur);
  const setMasterVolume = useSettingsStore((state) => state.setMasterVolume);
  const toggleHitboxes = useSettingsStore((state) => state.toggleHitboxes);
  const toggleAutoPauseOnBlur = useSettingsStore((state) => state.toggleAutoPauseOnBlur);

  return (
    <Modal
      footer={
        <div className="action-row">
          <Button onClick={onClose}>Back to Game</Button>
        </div>
      }
      onClose={onClose}
      open={open}
      title="Sanctum Settings"
    >
      <div className="settings-grid">
        <label className="settings-row">
          <span>Master Volume</span>
          <input
            max="1"
            min="0"
            onChange={(event) => setMasterVolume(Number(event.target.value))}
            step="0.05"
            type="range"
            value={masterVolume}
          />
          <strong>{Math.round(masterVolume * 100)}%</strong>
        </label>

        <label className="toggle-row">
          <span>Show Hitboxes</span>
          <input checked={showHitboxes} onChange={toggleHitboxes} type="checkbox" />
        </label>

        <label className="toggle-row">
          <span>Auto-Pause On Window Blur</span>
          <input checked={autoPauseOnBlur} onChange={toggleAutoPauseOnBlur} type="checkbox" />
        </label>
      </div>
    </Modal>
  );
}
