import { clampDeltaMs } from "./timing";

export interface GameLoopController {
  start: () => void;
  stop: () => void;
  isRunning: () => boolean;
}

export function createGameLoop(onFrame: (deltaMs: number, timestamp: number) => void): GameLoopController {
  let animationFrameId = 0;
  let running = false;
  let previousTimestamp = 0;

  const frame = (timestamp: number) => {
    if (!running) {
      return;
    }

    if (previousTimestamp === 0) {
      previousTimestamp = timestamp;
    }

    const deltaMs = clampDeltaMs(timestamp - previousTimestamp);
    previousTimestamp = timestamp;
    onFrame(deltaMs, timestamp);
    animationFrameId = window.requestAnimationFrame(frame);
  };

  return {
    start() {
      if (running) {
        return;
      }

      running = true;
      previousTimestamp = 0;
      animationFrameId = window.requestAnimationFrame(frame);
    },

    stop() {
      running = false;
      previousTimestamp = 0;
      window.cancelAnimationFrame(animationFrameId);
    },

    isRunning() {
      return running;
    },
  };
}
