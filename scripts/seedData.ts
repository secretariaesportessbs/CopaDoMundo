/**
 * Dados reais da Copa do Mundo FIFA 2026 (EUA / México / Canadá).
 * Snapshot em 02/07/2026: Rodada de 32 em andamento.
 * Jogos já disputados: status "finished". Jogos futuros: status "scheduled".
 */

export const ROUNDS_HEADER = ["round_id", "round_name", "order"];

export const ROUNDS_ROWS: (string | number)[][] = [
  [1, "Fase de grupos", 1],
  [2, "Rodada de 32", 2],
  [3, "Oitavas", 3],
  [4, "Quartas", 4],
  [5, "Semifinal", 5],
  [6, "Final", 6],
];

export const TEAMS_HEADER = [
  "team_id",
  "country_name",
  "country_code",
  "flag_url",
  "group_name",
  "confederation",
  "eliminated",
  "current_round",
  "created_at",
];

const NOW = new Date().toISOString();

function team(
  id: number,
  name: string,
  code: string,
  flag: string,
  group: string,
  confederation: string,
  eliminated: boolean,
  currentRound: string
): (string | number | boolean)[] {
  return [
    id,
    name,
    code,
    `https://flagcdn.com/${flag}.svg`,
    group,
    confederation,
    eliminated,
    currentRound,
    NOW,
  ];
}

export const TEAMS_ROWS = [
  team(1, "Canadá", "CAN", "ca", "B", "CONCACAF", false, "Oitavas"),
  team(2, "África do Sul", "RSA", "za", "", "CAF", true, "Rodada de 32"),
  team(3, "Países Baixos", "NED", "nl", "F", "UEFA", true, "Rodada de 32"),
  team(4, "Marrocos", "MAR", "ma", "", "CAF", false, "Oitavas"),
  team(5, "Brasil", "BRA", "br", "", "CONMEBOL", false, "Oitavas"),
  team(6, "Japão", "JPN", "jp", "F", "AFC", true, "Rodada de 32"),
  team(7, "Costa do Marfim", "CIV", "ci", "E", "CAF", true, "Rodada de 32"),
  team(8, "Noruega", "NOR", "no", "", "UEFA", false, "Oitavas"),
  team(9, "Alemanha", "GER", "de", "E", "UEFA", true, "Rodada de 32"),
  team(10, "Paraguai", "PAR", "py", "", "CONMEBOL", false, "Oitavas"),
  team(11, "França", "FRA", "fr", "", "UEFA", false, "Oitavas"),
  team(12, "Suécia", "SWE", "se", "F", "UEFA", true, "Rodada de 32"),
  team(13, "México", "MEX", "mx", "A", "CONCACAF", false, "Oitavas"),
  team(14, "Equador", "ECU", "ec", "E", "CONMEBOL", true, "Rodada de 32"),
  team(15, "Inglaterra", "ENG", "gb-eng", "L", "UEFA", false, "Oitavas"),
  team(16, "RD Congo", "COD", "cd", "K", "CAF", true, "Rodada de 32"),
  team(17, "Estados Unidos", "USA", "us", "D", "CONCACAF", false, "Oitavas"),
  team(18, "Bósnia e Herzegovina", "BIH", "ba", "B", "UEFA", true, "Rodada de 32"),
  team(19, "Bélgica", "BEL", "be", "G", "UEFA", false, "Oitavas"),
  team(20, "Senegal", "SEN", "sn", "I", "CAF", true, "Rodada de 32"),
  team(21, "Espanha", "ESP", "es", "H", "UEFA", false, "Rodada de 32"),
  team(22, "Áustria", "AUT", "at", "J", "UEFA", false, "Rodada de 32"),
  team(23, "Portugal", "POR", "pt", "K", "UEFA", false, "Rodada de 32"),
  team(24, "Croácia", "CRO", "hr", "L", "UEFA", false, "Rodada de 32"),
  team(25, "Argentina", "ARG", "ar", "", "CONMEBOL", false, "Rodada de 32"),
  team(26, "Cabo Verde", "CPV", "cv", "", "CAF", false, "Rodada de 32"),
  team(27, "Austrália", "AUS", "au", "D", "AFC", false, "Rodada de 32"),
  team(28, "Egito", "EGY", "eg", "", "CAF", false, "Rodada de 32"),
  team(29, "Suíça", "SUI", "ch", "B", "UEFA", false, "Rodada de 32"),
  team(30, "Argélia", "ALG", "dz", "J", "CAF", false, "Rodada de 32"),
  team(31, "Colômbia", "COL", "co", "", "CONMEBOL", false, "Rodada de 32"),
  team(32, "Gana", "GHA", "gh", "", "CAF", false, "Rodada de 32"),
];

export const MATCHES_HEADER = [
  "match_id",
  "round",
  "match_number",
  "team_home_id",
  "team_away_id",
  "home_score",
  "away_score",
  "winner_team_id",
  "match_date",
  "match_time",
  "host_country",
  "host_city",
  "stadium",
  "status",
  "tooltip_text",
  "updated_at",
];

type Cell = string | number;

function match(
  id: number,
  round: string,
  number: number,
  home: Cell,
  away: Cell,
  homeScore: Cell,
  awayScore: Cell,
  winner: Cell,
  date: string,
  time: string,
  country: string,
  city: string,
  stadium: string,
  status: "scheduled" | "live" | "finished",
  tooltip: string
): Cell[] {
  return [
    id, round, number, home, away, homeScore, awayScore, winner,
    date, time, country, city, stadium, status, tooltip, NOW,
  ];
}

const R32 = "Rodada de 32";
const OIT = "Oitavas";
const QUA = "Quartas";
const SEM = "Semifinal";
const FIN = "Final";

export const MATCHES_ROWS: Cell[][] = [
  // ─── Rodada de 32 ───────────────────────────────────────────────
  match(101, R32, 1, 1, 2, 1, 0, 1, "2026-06-28", "", "Estados Unidos", "Los Angeles", "SoFi Stadium", "finished", "Canadá 1 x 0 África do Sul"),
  match(102, R32, 2, 3, 4, 1, 1, 4, "2026-06-30", "", "México", "Guadalupe (Monterrey)", "Estádio BBVA", "finished", "Países Baixos 1 (2) x (3) 1 Marrocos — Marrocos venceu nos pênaltis"),
  match(103, R32, 3, 5, 6, 2, 1, 5, "2026-06-29", "", "Estados Unidos", "Houston", "NRG Stadium", "finished", "Brasil 2 x 1 Japão"),
  match(104, R32, 4, 7, 8, 1, 2, 8, "2026-06-30", "", "Estados Unidos", "Arlington", "AT&T Stadium", "finished", "Costa do Marfim 1 x 2 Noruega"),
  match(105, R32, 5, 9, 10, 1, 1, 10, "2026-06-29", "", "Estados Unidos", "Foxborough", "Gillette Stadium", "finished", "Alemanha 1 (3) x (4) 1 Paraguai — Paraguai venceu nos pênaltis"),
  match(106, R32, 6, 11, 12, 3, 0, 11, "2026-06-30", "", "Estados Unidos", "East Rutherford", "MetLife Stadium", "finished", "França 3 x 0 Suécia — dois gols de Mbappé"),
  match(107, R32, 7, 13, 14, 2, 0, 13, "2026-06-30", "", "México", "Cidade do México", "Estádio Azteca", "finished", "México 2 x 0 Equador"),
  match(108, R32, 8, 15, 16, 2, 1, 15, "2026-07-01", "", "Estados Unidos", "Atlanta", "Mercedes-Benz Stadium", "finished", "Inglaterra 2 x 1 RD Congo"),
  match(109, R32, 9, 17, 18, 2, 0, 17, "2026-07-01", "", "Estados Unidos", "Santa Clara", "Levi's Stadium", "finished", "Estados Unidos 2 x 0 Bósnia — gols de Balogun e Tillman"),
  match(110, R32, 10, 19, 20, 3, 2, 19, "2026-07-01", "", "Estados Unidos", "Seattle", "Lumen Field", "finished", "Bélgica 3 x 2 Senegal — virada na prorrogação"),
  match(111, R32, 11, 21, 22, "", "", "", "2026-07-02", "", "Estados Unidos", "Inglewood", "SoFi Stadium", "scheduled", ""),
  match(112, R32, 12, 23, 24, "", "", "", "2026-07-02", "", "Canadá", "Toronto", "Estádio de Toronto", "scheduled", "Reedição da final da Euro 2016"),
  match(113, R32, 13, 25, 26, "", "", "", "2026-07-03", "", "Estados Unidos", "", "", "scheduled", ""),
  match(114, R32, 14, 27, 28, "", "", "", "2026-07-03", "", "Estados Unidos", "", "", "scheduled", ""),
  match(115, R32, 15, 29, 30, "", "", "", "2026-07-02", "", "Canadá", "Vancouver", "BC Place", "scheduled", ""),
  match(116, R32, 16, 31, 32, "", "", "", "2026-07-03", "", "Estados Unidos", "", "", "scheduled", ""),

  // ─── Oitavas de final ───────────────────────────────────────────
  match(201, OIT, 1, 1, 4, "", "", "", "2026-07-04", "13:00", "", "", "", "scheduled", "Canadá x Marrocos"),
  match(202, OIT, 2, 5, 8, "", "", "", "2026-07-04", "", "", "", "", "scheduled", "Brasil x Noruega"),
  match(203, OIT, 3, 10, 11, "", "", "", "2026-07-05", "", "", "", "", "scheduled", "Paraguai x França"),
  match(204, OIT, 4, 13, 15, "", "", "", "2026-07-05", "20:00", "México", "Cidade do México", "Estádio Azteca", "scheduled", "México x Inglaterra no Azteca"),
  match(205, OIT, 5, 17, 19, "", "", "", "2026-07-06", "", "", "", "", "scheduled", "Estados Unidos x Bélgica"),
  match(206, OIT, 6, "", "", "", "", "", "2026-07-06", "20:00", "Estados Unidos", "Arlington", "AT&T Stadium", "scheduled", ""),
  match(207, OIT, 7, "", "", "", "", "", "2026-07-06", "", "", "", "", "scheduled", ""),
  match(208, OIT, 8, "", "", "", "", "", "2026-07-07", "", "Estados Unidos", "Kansas City", "Arrowhead Stadium", "scheduled", ""),

  // ─── Quartas de final ───────────────────────────────────────────
  match(301, QUA, 1, "", "", "", "", "", "2026-07-09", "", "", "", "", "scheduled", ""),
  match(302, QUA, 2, "", "", "", "", "", "2026-07-10", "", "", "", "", "scheduled", ""),
  match(303, QUA, 3, "", "", "", "", "", "2026-07-10", "", "", "", "", "scheduled", ""),
  match(304, QUA, 4, "", "", "", "", "", "2026-07-11", "", "", "", "", "scheduled", ""),

  // ─── Semifinais ─────────────────────────────────────────────────
  match(401, SEM, 1, "", "", "", "", "", "2026-07-14", "", "Estados Unidos", "Arlington", "AT&T Stadium", "scheduled", ""),
  match(402, SEM, 2, "", "", "", "", "", "2026-07-15", "", "Estados Unidos", "Atlanta", "Mercedes-Benz Stadium", "scheduled", ""),

  // ─── Final ──────────────────────────────────────────────────────
  match(501, FIN, 1, "", "", "", "", "", "2026-07-19", "", "Estados Unidos", "East Rutherford", "MetLife Stadium", "scheduled", "Grande final da Copa do Mundo 2026"),
];
