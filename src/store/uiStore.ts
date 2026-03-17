import { create } from "zustand";
import type { UIScreen } from "../types/gameState";

interface UIStoreState {
  screen: UIScreen;
  settingsOpen: boolean;
  setScreen: (screen: UIScreen) => void;
  openSettings: () => void;
  closeSettings: () => void;
}

export const useUIStore = create<UIStoreState>((set) => ({
  screen: "home",
  settingsOpen: false,
  setScreen: (screen) => set({ screen }),
  openSettings: () => set({ settingsOpen: true }),
  closeSettings: () => set({ settingsOpen: false }),
}));
