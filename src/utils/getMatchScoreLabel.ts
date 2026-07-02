import type { Match } from "@/types/match";

/** Rótulo do placar: "2 x 1" ou "vs" quando ainda não jogado. */
export function getMatchScoreLabel(match: Match): string {
  if (match.home_score === null || match.away_score === null) return "vs";
  return `${match.home_score} x ${match.away_score}`;
}
