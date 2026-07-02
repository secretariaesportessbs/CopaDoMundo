import { getSheetsClient } from "./getSheetsClient";
import { getSpreadsheetId } from "./getSpreadsheetId";

/**
 * Lê uma aba inteira e converte cada linha em um objeto
 * usando a primeira linha como cabeçalho.
 */
export async function readSheetRows(
  sheetName: string
): Promise<Record<string, string>[]> {
  const sheets = getSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range: sheetName,
  });

  const rows = response.data.values ?? [];
  if (rows.length < 2) return [];

  const [header, ...body] = rows;

  return body.map((row) =>
    Object.fromEntries(
      header.map((column: string, index: number) => [
        column.trim(),
        String(row[index] ?? "").trim(),
      ])
    )
  );
}
