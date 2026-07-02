/** Converte "true"/"TRUE"/"1"/"sim" em boolean. */
export function parseBoolean(value: string | undefined): boolean {
  if (!value) return false;
  return ["true", "1", "sim", "yes"].includes(value.trim().toLowerCase());
}
