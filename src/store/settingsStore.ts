import { create } from "zustand";
import type { GameSettings } from "../types/gameState";

const DEFAULT_SETTINGS: GameSettings = {
  masterVolume: 0.7,
  showHitboxes: false,
  autoPauseOnBlur: true,
};

interface SettingsStoreState extends GameSettings {
  hydrate: (settings: Partial<GameSettings>) => void;
  setMasterVolume: (volume: number) => void;
  toggleHitboxes: () => void;
  toggleAutoPauseOnBlur: () => void;
}

export const useSettingsStore = create<SettingsStoreState>((set) => ({
  ...DEFAULT_SETTINGS,
  hydrate: (settings) => set((state) => ({ ...state, ...settings })),
  setMasterVolume: (masterVolume) => set({ masterVolume }),
  toggleHitboxes: () => set((state) => ({ showHitboxes: !state.showHitboxes })),
  toggleAutoPauseOnBlur: () => set((state) => ({ autoPauseOnBlur: !state.autoPauseOnBlur })),
}));
