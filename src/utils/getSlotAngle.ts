/** Ângulo (graus) do slot `index` num anel com `total` slots, começando no topo. */
export function getSlotAngle(index: number, total: number): number {
  return ((index + 0.5) / total) * 360 - 90;
}
