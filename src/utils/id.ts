let idCounter = 0;

export function createId(prefix = "entity"): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}
