import { useEffect, useRef } from "react";
import SettingsModal from "./components/menu/SettingsModal";
import { saveManager } from "./game";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import { useGameStore } from "./store/gameStore";
import { useSettingsStore } from "./store/settingsStore";
import { useUIStore } from "./store/uiStore";

export default function App() {
  const hydratedRef = useRef(false);

  const screen = useUIStore((state) => state.screen);
  const settingsOpen = useUIStore((state) => state.settingsOpen);
  const closeSettings = useUIStore((state) => state.closeSettings);
  const setBestTimeMs = useGameStore((state) => state.setBestTimeMs);
  const hydrateSettings = useSettingsStore((state) => state.hydrate);
  const masterVolume = useSettingsStore((state) => state.masterVolume);
  const showHitboxes = useSettingsStore((state) => state.showHitboxes);
  const autoPauseOnBlur = useSettingsStore((state) => state.autoPauseOnBlur);

  useEffect(() => {
    hydrateSettings(saveManager.loadSettings());
    setBestTimeMs(saveManager.loadBestTimeMs());
    hydratedRef.current = true;
  }, [hydrateSettings, setBestTimeMs]);

  useEffect(() => {
    if (!hydratedRef.current) {
      return;
    }

    saveManager.saveSettings({
      masterVolume,
      showHitboxes,
      autoPauseOnBlur,
    });
  }, [autoPauseOnBlur, masterVolume, showHitboxes]);

  useEffect(() => {
    document.title = screen === "home" ? "Dungeon Survivor" : "Dungeon Survivor | Run";
  }, [screen]);

  return (
    <div className="app-shell">
      {screen === "home" ? <HomePage /> : <GamePage />}
      <SettingsModal onClose={closeSettings} open={settingsOpen} />
    </div>
  );
}
