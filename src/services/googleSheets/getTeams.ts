import { teamSchema, type Team } from "@/types/team";
import { parseBoolean } from "@/utils/parseBoolean";
import { readSheetRows } from "./readSheetRows";

/** Busca e valida todas as seleções da aba "Teams". */
export async function getTeams(): Promise<Team[]> {
  const rows = await readSheetRows("Teams");

  return rows
    .filter((row) => row.team_id)
    .map((row) =>
      teamSchema.parse({
        ...row,
        eliminated: parseBoolean(row.eliminated),
      })
    );
}
