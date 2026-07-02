/**
 * Preenche a planilha do Google Sheets com os dados reais da
 * Copa do Mundo 2026 (times, partidas e fases).
 *
 * Uso: npm run seed
 * Requer .env com GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL e GOOGLE_PRIVATE_KEY.
 */
import "dotenv/config";
import { getSheetsClient } from "../src/services/googleSheets/getSheetsClient";
import { getSpreadsheetId } from "../src/services/googleSheets/getSpreadsheetId";
import { ensureSheetExists } from "./ensureSheetExists";
import { writeSheet } from "./writeSheet";
import {
  ROUNDS_HEADER,
  ROUNDS_ROWS,
  TEAMS_HEADER,
  TEAMS_ROWS,
  MATCHES_HEADER,
  MATCHES_ROWS,
} from "./seedData";

async function main(): Promise<void> {
  const sheets = getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  console.log("Populando planilha com dados da Copa do Mundo 2026...\n");

  for (const name of ["Teams", "Matches", "Rounds"]) {
    await ensureSheetExists(sheets, spreadsheetId, name);
  }

  await writeSheet(sheets, spreadsheetId, "Rounds", ROUNDS_HEADER, ROUNDS_ROWS);
  await writeSheet(sheets, spreadsheetId, "Teams", TEAMS_HEADER, TEAMS_ROWS);
  await writeSheet(sheets, spreadsheetId, "Matches", MATCHES_HEADER, MATCHES_ROWS);

  console.log("\n✅ Planilha populada com sucesso.");
}

main().catch((error) => {
  console.error("❌ Erro ao popular a planilha:", error.message ?? error);
  process.exit(1);
});
