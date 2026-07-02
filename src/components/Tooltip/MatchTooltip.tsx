"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Flag,
  Landmark,
  MapPin,
  Activity,
} from "lucide-react";
import type { Team } from "@/types";
import type { BracketNode } from "@/utils/buildBracketLayout";
import { MatchCard } from "@/components/MatchCard/MatchCard";
import { formatMatchDate } from "@/utils/formatMatchDate";

const STATUS_LABEL: Record<string, string> = {
  scheduled: "Agendado",
  live: "Ao vivo",
  finished: "Encerrado",
};

interface MatchTooltipProps {
  node: BracketNode;
  teams: Team[];
}

function InfoRow({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2 text-xs text-stone-300">
      <Icon className="h-3.5 w-3.5 shrink-0 text-gold-500" strokeWidth={2} />
      <span className="truncate">{children}</span>
    </li>
  );
}

/** Tooltip com detalhes da partida, ancorado ao nó da seleção. */
export function MatchTooltip({ node, teams }: MatchTooltipProps) {
  const match = node.match;
  if (!match) return null;

  const teamById = new Map(teams.map((team) => [team.team_id, team]));
  const homeTeam = match.team_home_id != null ? teamById.get(match.team_home_id) ?? null : null;
  const awayTeam = match.team_away_id != null ? teamById.get(match.team_away_id) ?? null : null;

  const flipX = node.x > 50;
  const flipY = node.y > 55;

  return (
    <motion.div
      role="tooltip"
      className="pointer-events-none absolute z-40 w-64 rounded-2xl border border-gold-500/25 bg-pitch-900/95 p-4 shadow-tooltip backdrop-blur-sm"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: `translate(${flipX ? "calc(-100% - 24px)" : "24px"}, ${flipY ? "calc(-100% - 12px)" : "12px"})`,
      }}
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <p className="mb-3 font-display text-[11px] uppercase tracking-[0.2em] text-gold-400">
        {match.round}
      </p>

      <MatchCard match={match} homeTeam={homeTeam} awayTeam={awayTeam} />

      <ul className="mt-4 space-y-1.5 border-t border-stone-700/60 pt-3">
        <InfoRow icon={CalendarDays}>{formatMatchDate(match.match_date)}</InfoRow>
        <InfoRow icon={Clock}>{match.match_time || "Horário a definir"}</InfoRow>
        <InfoRow icon={Flag}>{match.host_country || "País a definir"}</InfoRow>
        <InfoRow icon={MapPin}>{match.host_city || "Cidade a definir"}</InfoRow>
        <InfoRow icon={Landmark}>{match.stadium || "Estádio a definir"}</InfoRow>
        <InfoRow icon={Activity}>
          {STATUS_LABEL[match.status] ?? match.status}
        </InfoRow>
      </ul>

      {match.tooltip_text && (
        <p className="mt-3 rounded-lg bg-pitch-800/80 px-3 py-2 text-[11px] italic text-stone-400">
          {match.tooltip_text}
        </p>
      )}
    </motion.div>
  );
}
