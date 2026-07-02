import type { sheets_v4 } from "googleapis";

/** Limpa a aba e grava cabeçalho + linhas. */
export async function writeSheet(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
  header: string[],
  rows: (string | number | boolean)[][]
): Promise<void> {
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: sheetName,
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: "RAW",
    requestBody: { values: [header, ...rows] },
  });

  console.log(`✔ Aba "${sheetName}": ${rows.length} linhas gravadas.`);
}
