import type { InputSnapshot, Vector2 } from "../../types/gameState";
import { normalizeVector } from "../../utils/math";

const UP_KEYS = new Set(["ArrowUp", "KeyW"]);
const DOWN_KEYS = new Set(["ArrowDown", "KeyS"]);
const LEFT_KEYS = new Set(["ArrowLeft", "KeyA"]);
const RIGHT_KEYS = new Set(["ArrowRight", "KeyD"]);

export interface InputController {
  pressedKeys: Set<string>;
  pointerScreen: Vector2;
  pointerWorld: Vector2;
  pointerActive: boolean;
  primaryDown: boolean;
  pauseQueued: boolean;
}

export function createInputController(): InputController {
  return {
    pressedKeys: new Set<string>(),
    pointerScreen: { x: 0, y: 0 },
    pointerWorld: { x: 0, y: 0 },
    pointerActive: false,
    primaryDown: false,
    pauseQueued: false,
  };
}

export function setKeyState(controller: InputController, code: string, pressed: boolean): void {
  const hadKey = controller.pressedKeys.has(code);

  if (pressed) {
    controller.pressedKeys.add(code);
  } else {
    controller.pressedKeys.delete(code);
  }

  if (code === "Escape" && pressed && !hadKey) {
    controller.pauseQueued = true;
  }
}

export function setPointerState(
  controller: InputController,
  nextState: Partial<Pick<InputController, "pointerScreen" | "pointerWorld" | "pointerActive" | "primaryDown">>
): void {
  if (nextState.pointerScreen) {
    controller.pointerScreen = nextState.pointerScreen;
  }

  if (nextState.pointerWorld) {
    controller.pointerWorld = nextState.pointerWorld;
  }

  if (typeof nextState.pointerActive === "boolean") {
    controller.pointerActive = nextState.pointerActive;
  }

  if (typeof nextState.primaryDown === "boolean") {
    controller.primaryDown = nextState.primaryDown;
  }
}

function consumePauseToggle(controller: InputController): boolean {
  const pauseQueued = controller.pauseQueued;
  controller.pauseQueued = false;
  return pauseQueued;
}

export function getInputSnapshot(controller: InputController): InputSnapshot {
  const movement = normalizeVector({
    x: (controller.pressedKeys.has("KeyD") || controller.pressedKeys.has("ArrowRight") ? 1 : 0) -
      (controller.pressedKeys.has("KeyA") || controller.pressedKeys.has("ArrowLeft") ? 1 : 0),
    y: (controller.pressedKeys.has("KeyS") || controller.pressedKeys.has("ArrowDown") ? 1 : 0) -
      (controller.pressedKeys.has("KeyW") || controller.pressedKeys.has("ArrowUp") ? 1 : 0),
  });

  return {
    movement,
    pointerScreen: { ...controller.pointerScreen },
    pointerWorld: { ...controller.pointerWorld },
    pointerActive: controller.pointerActive,
    primaryDown: controller.primaryDown,
    togglePausePressed: consumePauseToggle(controller),
  };
}

export function isTrackedMovementKey(code: string): boolean {
  return UP_KEYS.has(code) || DOWN_KEYS.has(code) || LEFT_KEYS.has(code) || RIGHT_KEYS.has(code);
}
