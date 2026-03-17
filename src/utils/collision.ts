import type { Rect, Vector2 } from "../types/gameState";
import { clamp } from "./math";

export function circlesOverlap(
  a: { position: Vector2; radius: number },
  b: { position: Vector2; radius: number }
): boolean {
  const dx = a.position.x - b.position.x;
  const dy = a.position.y - b.position.y;
  const radii = a.radius + b.radius;

  return dx * dx + dy * dy <= radii * radii;
}

export function circleIntersectsRect(position: Vector2, radius: number, rect: Rect): boolean {
  const nearestX = clamp(position.x, rect.x, rect.x + rect.width);
  const nearestY = clamp(position.y, rect.y, rect.y + rect.height);
  const dx = position.x - nearestX;
  const dy = position.y - nearestY;

  return dx * dx + dy * dy < radius * radius;
}

export function resolveCircleRectCollision(position: Vector2, radius: number, rect: Rect): Vector2 {
  const nearestX = clamp(position.x, rect.x, rect.x + rect.width);
  const nearestY = clamp(position.y, rect.y, rect.y + rect.height);
  let dx = position.x - nearestX;
  let dy = position.y - nearestY;
  const distanceSquared = dx * dx + dy * dy;

  if (distanceSquared === 0) {
    const left = Math.abs(position.x - rect.x);
    const right = Math.abs(rect.x + rect.width - position.x);
    const top = Math.abs(position.y - rect.y);
    const bottom = Math.abs(rect.y + rect.height - position.y);
    const smallest = Math.min(left, right, top, bottom);

    if (smallest === left) {
      return { x: rect.x - radius, y: position.y };
    }

    if (smallest === right) {
      return { x: rect.x + rect.width + radius, y: position.y };
    }

    if (smallest === top) {
      return { x: position.x, y: rect.y - radius };
    }

    return { x: position.x, y: rect.y + rect.height + radius };
  }

  if (distanceSquared >= radius * radius) {
    return position;
  }

  const distance = Math.sqrt(distanceSquared);
  const overlap = radius - distance;
  dx /= distance;
  dy /= distance;

  return {
    x: position.x + dx * overlap,
    y: position.y + dy * overlap,
  };
}
