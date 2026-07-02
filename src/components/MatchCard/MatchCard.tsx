import type { Match, Team } from "@/types";
import { getMatchScoreLabel } from "@/utils/getMatchScoreLabel";

interface MatchCardProps {
  match: Match;
  homeTeam: Team | null;
  awayTeam: Team | null;
}

function TeamBadge({ team, winner }: { team: Team | null; winner: boolean }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1.5">
      <span
        className={[
          "block h-10 w-10 overflow-hidden rounded-full border-2 bg-pitch-800",
          winner ? "border-gold-400" : "border-stone-600",
        ].join(" ")}
      >
        {team && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={team.flag_url}
            alt={`Bandeira: ${team.country_name}`}
            className="h-full w-full object-cover"
          />
        )}
      </span>
      <span className="max-w-[5.5rem] truncate text-[11px] font-semibold uppercase tracking-wide text-stone-200">
        {team?.country_name ?? "A definir"}
      </span>
    </div>
  );
}

/** Confronto (times + placar) exibido dentro do tooltip. */
export function MatchCard({ match, homeTeam, awayTeam }: MatchCardProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <TeamBadge
        team={homeTeam}
        winner={match.winner_team_id != null && match.winner_team_id === homeTeam?.team_id}
      />
      <span className="font-display text-xl font-semibold text-gold-300">
        {getMatchScoreLabel(match)}
      </span>
      <TeamBadge
        team={awayTeam}
        winner={match.winner_team_id != null && match.winner_team_id === awayTeam?.team_id}
      />
    </div>
  );
}
