/** Retorna o ID da planilha configurado no ambiente. */
export function getSpreadsheetId(): string {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) throw new Error("Variável GOOGLE_SHEET_ID não definida.");
  return id;
}
