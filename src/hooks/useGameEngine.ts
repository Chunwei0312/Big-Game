import { useEffect, useRef, useState } from "react";
import { AudioManager, createGameLoop, createInputController, GameStateManager, getInputSnapshot, renderGame, saveManager } from "../game";
import { useGameStore } from "../store/gameStore";
import { useSettingsStore } from "../store/settingsStore";
import { useKeyboard } from "./useKeyboard";
import { useMouse } from "./useMouse";

export function useGameEngine() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const runVersion = useGameStore((state) => state.runVersion);
  const status = useGameStore((state) => state.snapshot.status);
  const bestTimeMs = useGameStore((state) => state.snapshot.bestTimeMs);
  const masterVolume = useSettingsStore((state) => state.masterVolume);
  const autoPauseOnBlur = useSettingsStore((state) => state.autoPauseOnBlur);

  const [manager] = useState(() => new GameStateManager(bestTimeMs));
  const [inputController] = useState(createInputController);
  const [audioManager] = useState(() => new AudioManager());
  const lastSavedBestTimeRef = useRef(0);

  useKeyboard(inputController);
  useMouse(containerRef, inputController);

  useEffect(() => {
    audioManager.setMasterVolume(masterVolume);
  }, [audioManager, masterVolume]);

  useEffect(() => {
    manager.setBestTimeMs(bestTimeMs);
    lastSavedBestTimeRef.current = bestTimeMs;
  }, [bestTimeMs, manager]);

  useEffect(() => {
    if (!autoPauseOnBlur) {
      return;
    }

    const handleBlur = () => {
      const gameStore = useGameStore.getState();

      if (gameStore.snapshot.status === "running") {
        gameStore.setStatus("paused");
      }
    };

    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, [autoPauseOnBlur]);

  useEffect(() => {
    if (manager.getStatus() !== status) {
      manager.setStatus(status);
    }
  }, [manager, status]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const resizeCanvas = (nextWidth: number, nextHeight: number) => {
      const width = Math.max(1, Math.floor(nextWidth));
      const height = Math.max(1, Math.floor(nextHeight));
      const ratio = window.devicePixelRatio || 1;
      const targetWidth = Math.floor(width * ratio);
      const targetHeight = Math.floor(height * ratio);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      const context = canvas.getContext("2d");

      if (context) {
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      }

      manager.resize(width, height);
      useGameStore.getState().syncSnapshot(manager.getSnapshot());
    };

    resizeCanvas(container.clientWidth, container.clientHeight);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      resizeCanvas(entry.contentRect.width, entry.contentRect.height);
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [manager]);

  useEffect(() => {
    if (runVersion === 0) {
      return;
    }

    manager.reset(bestTimeMs);
    manager.setStatus("running");
    useGameStore.getState().syncSnapshot(manager.getSnapshot());
  }, [bestTimeMs, manager, runVersion]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const loop = createGameLoop((deltaMs) => {
      const gameStore = useGameStore.getState();
      const pendingUpgrade = gameStore.consumeQueuedUpgrade();

      if (pendingUpgrade) {
        manager.applyUpgrade(pendingUpgrade);
      }

      const inputSnapshot = getInputSnapshot(inputController);
      manager.update(deltaMs, inputSnapshot);

      const snapshot = manager.getSnapshot();
      gameStore.syncSnapshot(snapshot);

      if (snapshot.bestTimeMs > lastSavedBestTimeRef.current) {
        saveManager.saveBestTimeMs(snapshot.bestTimeMs);
        lastSavedBestTimeRef.current = snapshot.bestTimeMs;
      }

      renderGame(context, snapshot, {
        showHitboxes: useSettingsStore.getState().showHitboxes,
      });
    });

    loop.start();

    return () => {
      loop.stop();
    };
  }, [inputController, manager]);

  return {
    canvasRef,
    containerRef,
  };
}
