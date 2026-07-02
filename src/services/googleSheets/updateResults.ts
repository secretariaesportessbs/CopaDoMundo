import { getSheetsClient } from "./getSheetsClient";
import { getSpreadsheetId } from "./getSpreadsheetId";
import type { MatchStatus } from "@/types/match";

export interface MatchResultUpdate {
  match_id: number;
  home_score: number;
  away_score: number;
  winner_team_id: number | null;
  status: MatchStatus;
}

/**
 * Atualiza o resultado de uma partida na aba "Matches",
 * localizando a linha pelo match_id.
 */
export async function updateResults(update: MatchResultUpdate): Promise<void> {
  const sheets = getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Matches!A:A",
  });

  const idColumn = response.data.values ?? [];
  const rowIndex = idColumn.findIndex(
    (row) => String(row[0]).trim() === String(update.match_id)
  );

  if (rowIndex <= 0) {
    throw new Error(`Partida ${update.match_id} não encontrada na planilha.`);
  }

  const sheetRow = rowIndex + 1;

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: "RAW",
      data: [
        {
          range: `Matches!F${sheetRow}:H${sheetRow}`,
          values: [
            [update.home_score, update.away_score, update.winner_team_id ?? ""],
          ],
        },
        { range: `Matches!N${sheetRow}`, values: [[update.status]] },
        { range: `Matches!P${sheetRow}`, values: [[new Date().toISOString()]] },
      ],
    },
  });
}
