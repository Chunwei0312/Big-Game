import type { ItemKind, ItemState, Vector2 } from "../../types/gameState";
import { createId } from "../../utils/id";
import { getItemDefinition } from "../data/items";

export function createItem(kind: ItemKind, position: Vector2, value: number): ItemState {
  const definition = getItemDefinition(kind);

  return {
    id: createId(kind),
    kind,
    position: { ...position },
    velocity: { x: 0, y: 0 },
    radius: definition.radius,
    value,
    lifetimeMs: kind === "xp-shard" ? 16_000 : 12_000,
    color: definition.color,
  };
}
