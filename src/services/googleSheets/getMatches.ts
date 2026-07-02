import { matchSchema, type Match } from "@/types/match";
import { parseOptionalNumber } from "@/utils/parseOptionalNumber";
import { readSheetRows } from "./readSheetRows";

/** Busca e valida todas as partidas da aba "Matches". */
export async function getMatches(): Promise<Match[]> {
  const rows = await readSheetRows("Matches");

  return rows
    .filter((row) => row.match_id)
    .map((row) =>
      matchSchema.parse({
        ...row,
        team_home_id: parseOptionalNumber(row.team_home_id),
        team_away_id: parseOptionalNumber(row.team_away_id),
        home_score: parseOptionalNumber(row.home_score),
        away_score: parseOptionalNumber(row.away_score),
        winner_team_id: parseOptionalNumber(row.winner_team_id),
      })
    )
    .sort((a, b) => a.match_number - b.match_number);
}
