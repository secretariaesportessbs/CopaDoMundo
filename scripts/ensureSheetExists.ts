import type { sheets_v4 } from "googleapis";

/** Garante que a aba exista na planilha, criando-a se necessário. */
export async function ensureSheetExists(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string
): Promise<void> {
  const metadata = await sheets.spreadsheets.get({ spreadsheetId });
  const exists = metadata.data.sheets?.some(
    (sheet) => sheet.properties?.title === sheetName
  );

  if (exists) return;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [{ addSheet: { properties: { title: sheetName } } }],
    },
  });

  console.log(`✔ Aba "${sheetName}" criada.`);
}
