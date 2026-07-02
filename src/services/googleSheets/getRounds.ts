import { roundSchema, type Round } from "@/types/round";
import { readSheetRows } from "./readSheetRows";

/** Busca e valida todas as fases da aba "Rounds", ordenadas. */
export async function getRounds(): Promise<Round[]> {
  const rows = await readSheetRows("Rounds");

  return rows
    .filter((row) => row.round_id)
    .map((row) => roundSchema.parse(row))
    .sort((a, b) => a.order - b.order);
}
