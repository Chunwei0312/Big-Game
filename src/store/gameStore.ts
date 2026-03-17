import { create } from "zustand";
import { createEmptySnapshot, type GameSnapshot, type GameStatus, type SkillUpgradeId } from "../types/gameState";

interface GameStoreState {
  snapshot: GameSnapshot;
  runVersion: number;
  queuedUpgradeId: SkillUpgradeId | null;
  syncSnapshot: (snapshot: GameSnapshot) => void;
  startRun: () => void;
  setStatus: (status: GameStatus) => void;
  queueUpgrade: (upgradeId: SkillUpgradeId) => void;
  consumeQueuedUpgrade: () => SkillUpgradeId | null;
  setBestTimeMs: (bestTimeMs: number) => void;
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  snapshot: createEmptySnapshot(),
  runVersion: 0,
  queuedUpgradeId: null,
  syncSnapshot: (snapshot) => set({ snapshot }),
  startRun: () =>
    set((state) => ({
      runVersion: state.runVersion + 1,
      queuedUpgradeId: null,
      snapshot: {
        ...createEmptySnapshot(),
        bestTimeMs: state.snapshot.bestTimeMs,
        status: "running",
      },
    })),
  setStatus: (status) =>
    set((state) => ({
      snapshot: {
        ...state.snapshot,
        status,
      },
    })),
  queueUpgrade: (upgradeId) => set({ queuedUpgradeId: upgradeId }),
  consumeQueuedUpgrade: () => {
    const queuedUpgradeId = get().queuedUpgradeId;

    if (queuedUpgradeId) {
      set({ queuedUpgradeId: null });
    }

    return queuedUpgradeId;
  },
  setBestTimeMs: (bestTimeMs) =>
    set((state) => ({
      snapshot: {
        ...state.snapshot,
        bestTimeMs,
      },
    })),
}));
