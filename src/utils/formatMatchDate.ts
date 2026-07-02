import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

/** Formata "2026-06-12" como "12/06/2026". */
export function formatMatchDate(isoDate: string): string {
  if (!isoDate) return "Data a definir";
  try {
    return format(parseISO(isoDate), "dd/MM/yyyy", { locale: ptBR });
  } catch {
    return isoDate;
  }
}
