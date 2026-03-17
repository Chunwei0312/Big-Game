import type { ItemKind } from "../../types/gameState";

export interface ItemDefinition {
  kind: ItemKind;
  label: string;
  radius: number;
  color: string;
}

export const ITEM_DEFINITIONS: Record<ItemKind, ItemDefinition> = {
  "xp-shard": {
    kind: "xp-shard",
    label: "XP Shard",
    radius: 8,
    color: "#ffd166",
  },
  medkit: {
    kind: "medkit",
    label: "Medkit",
    radius: 10,
    color: "#80ed99",
  },
};

export function getItemDefinition(kind: ItemKind): ItemDefinition {
  return ITEM_DEFINITIONS[kind];
}
