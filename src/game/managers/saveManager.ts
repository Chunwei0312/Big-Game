import type { GameSettings } from "../../types/gameState";

const SETTINGS_KEY = "dungeon-survivor.settings";
const BEST_TIME_KEY = "dungeon-survivor.best-time-ms";

const DEFAULT_SETTINGS: GameSettings = {
  masterVolume: 0.7,
  showHitboxes: false,
  autoPauseOnBlur: true,
};

function hasStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export const saveManager = {
  loadSettings(): GameSettings {
    if (!hasStorage()) {
      return DEFAULT_SETTINGS;
    }

    try {
      const raw = window.localStorage.getItem(SETTINGS_KEY);

      if (!raw) {
        return DEFAULT_SETTINGS;
      }

      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: GameSettings): void {
    if (!hasStorage()) {
      return;
    }

    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  loadBestTimeMs(): number {
    if (!hasStorage()) {
      return 0;
    }

    const value = Number(window.localStorage.getItem(BEST_TIME_KEY));
    return Number.isFinite(value) ? value : 0;
  },

  saveBestTimeMs(bestTimeMs: number): void {
    if (!hasStorage()) {
      return;
    }

    window.localStorage.setItem(BEST_TIME_KEY, String(bestTimeMs));
  },
};
