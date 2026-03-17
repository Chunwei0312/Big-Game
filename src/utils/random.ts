import type { Size, Vector2 } from "../types/gameState";

export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(randomRange(min, max + 1));
}

export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function pickRandomItems<T>(items: T[], count: number): T[] {
  const pool = [...items];
  const picked: T[] = [];

  while (pool.length > 0 && picked.length < count) {
    const index = randomInt(0, pool.length - 1);
    picked.push(pool.splice(index, 1)[0]);
  }

  return picked;
}

export function randomPointOnEdge(size: Size, padding = 64): Vector2 {
  const side = randomInt(0, 3);

  if (side === 0) {
    return { x: randomRange(0, size.width), y: -padding };
  }

  if (side === 1) {
    return { x: size.width + padding, y: randomRange(0, size.height) };
  }

  if (side === 2) {
    return { x: randomRange(0, size.width), y: size.height + padding };
  }

  return { x: -padding, y: randomRange(0, size.height) };
}
