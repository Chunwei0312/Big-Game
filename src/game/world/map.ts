import type { Size, Vector2 } from "../../types/gameState";
import { DEFAULT_WORLD_SIZE } from "../../types/gameState";
import { clamp } from "../../utils/math";

export const WORLD_SIZE: Size = { ...DEFAULT_WORLD_SIZE };

export function clampPointToWorld(position: Vector2, radius: number, world: Size = WORLD_SIZE): Vector2 {
  return {
    x: clamp(position.x, radius, world.width - radius),
    y: clamp(position.y, radius, world.height - radius),
  };
}

export function getCameraPosition(target: Vector2, arena: Size, world: Size = WORLD_SIZE): Vector2 {
  return {
    x: clamp(target.x - arena.width / 2, 0, Math.max(0, world.width - arena.width)),
    y: clamp(target.y - arena.height / 2, 0, Math.max(0, world.height - arena.height)),
  };
}

export function screenToWorld(pointerScreen: Vector2, camera: Vector2): Vector2 {
  return {
    x: pointerScreen.x + camera.x,
    y: pointerScreen.y + camera.y,
  };
}
