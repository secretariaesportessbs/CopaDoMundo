import type { Team } from "./team";
import type { Match } from "./match";
import type { Round } from "./round";

export interface WorldCupData {
  teams: Team[];
  matches: Match[];
  rounds: Round[];
}
