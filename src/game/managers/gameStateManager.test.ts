import { describe, expect, it } from "vitest";
import type { InputSnapshot } from "../../types/gameState";
import { GameStateManager } from "./gameStateManager";

const idleInput: InputSnapshot = {
  movement: { x: 0, y: 0 },
  pointerScreen: { x: 0, y: 0 },
  pointerWorld: { x: 0, y: 0 },
  pointerActive: false,
  primaryDown: false,
  togglePausePressed: false,
};

describe("GameStateManager", () => {
  it("creates a fresh dungeon run scaffold", () => {
    const manager = new GameStateManager();
    const snapshot = manager.getSnapshot();

    expect(snapshot.status).toBe("menu");
    expect(snapshot.player.hp).toBe(snapshot.player.maxHp);
    expect(snapshot.player.level).toBe(1);
    expect(snapshot.obstacles.length).toBeGreaterThan(0);
    expect(snapshot.enemies).toHaveLength(0);
  });

  it("spawns enemies once the run is active", () => {
    const manager = new GameStateManager();
    manager.setStatus("running");
    manager.update(1300, idleInput);

    const snapshot = manager.getSnapshot();

    expect(snapshot.elapsedMs).toBe(1300);
    expect(snapshot.waveIndex).toBe(1);
    expect(snapshot.enemies.length).toBeGreaterThan(0);
  });

  it("toggles pause from input without mutating elapsed time", () => {
    const manager = new GameStateManager();
    manager.setStatus("running");
    manager.update(16, { ...idleInput, togglePausePressed: true });

    const snapshot = manager.getSnapshot();

    expect(snapshot.status).toBe("paused");
    expect(snapshot.elapsedMs).toBe(0);
  });
});
