import type { Team, Match, Round } from "@/types";
import { getSlotAngle } from "./getSlotAngle";
import { polarToCartesian, type Point } from "./polarToCartesian";

export interface BracketNode {
  id: string;
  x: number;
  y: number;
  ringIndex: number;
  slotIndex: number;
  roundName: string;
  team: Team | null;
  match: Match | null;
  isWinner: boolean;
  isLoser: boolean;
  size: number;
}

export interface BracketEdge {
  id: string;
  points: [Point, Point, Point];
  active: boolean;
}

export interface BracketLayout {
  nodes: BracketNode[];
  edges: BracketEdge[];
  champion: Team | null;
}

const OUTER_RADIUS = 46;
const INNER_RADIUS = 13.5;

function isGroupStage(round: Round): boolean {
  return /grupo/i.test(round.round_name);
}

/**
 * Constrói a árvore circular do mata-mata: posições dos nós (times)
 * em anéis concêntricos e as arestas que conectam cada partida à fase seguinte.
 */
export function buildBracketLayout(
  teams: Team[],
  matches: Match[],
  rounds: Round[]
): BracketLayout {
  const teamById = new Map(teams.map((team) => [team.team_id, team]));

  const knockoutRounds = rounds
    .filter((round) => !isGroupStage(round))
    .sort((a, b) => a.order - b.order)
    .filter((round) => matches.some((match) => match.round === round.round_name));

  const ringCount = knockoutRounds.length;
  if (ringCount === 0) return { nodes: [], edges: [], champion: null };

  const radiusStep =
    ringCount > 1 ? (OUTER_RADIUS - INNER_RADIUS) / (ringCount - 1) : 0;

  const matchesByRound = knockoutRounds.map((round) =>
    matches
      .filter((match) => match.round === round.round_name)
      .sort((a, b) => a.match_number - b.match_number)
  );

  const nodes: BracketNode[] = [];
  const nodesByRing: BracketNode[][] = [];

  knockoutRounds.forEach((round, ringIndex) => {
    const ringMatches = matchesByRound[ringIndex];
    const slots = ringMatches.length * 2;
    const radius = OUTER_RADIUS - ringIndex * radiusStep;
    const size = 5 + ringIndex * 0.9;
    const ringNodes: BracketNode[] = [];

    for (let slotIndex = 0; slotIndex < slots; slotIndex += 1) {
      const match = ringMatches[Math.floor(slotIndex / 2)] ?? null;
      const isHome = slotIndex % 2 === 0;

      let teamId = isHome ? match?.team_home_id : match?.team_away_id;

      if (teamId == null && ringIndex > 0) {
        const feederMatch = matchesByRound[ringIndex - 1].find(
          (candidate) => candidate.match_number === slotIndex + 1
        );
        teamId = feederMatch?.winner_team_id ?? null;
      }

      const team = teamId != null ? teamById.get(teamId) ?? null : null;
      const finished = match?.status === "finished";
      const isWinner =
        finished && teamId != null && match?.winner_team_id === teamId;
      const isLoser =
        finished && teamId != null && match?.winner_team_id !== teamId;

      const { x, y } = polarToCartesian(getSlotAngle(slotIndex, slots), radius);

      const node: BracketNode = {
        id: `${round.round_name}-${slotIndex}`,
        x,
        y,
        ringIndex,
        slotIndex,
        roundName: round.round_name,
        team,
        match,
        isWinner,
        isLoser,
        size,
      };

      nodes.push(node);
      ringNodes.push(node);
    }

    nodesByRing.push(ringNodes);
  });

  const edges: BracketEdge[] = [];

  for (let ringIndex = 1; ringIndex < ringCount; ringIndex += 1) {
    nodesByRing[ringIndex].forEach((parent) => {
      const childSlots = [parent.slotIndex * 2, parent.slotIndex * 2 + 1];

      childSlots.forEach((childSlot) => {
        const child = nodesByRing[ringIndex - 1][childSlot];
        if (!child) return;

        const mid = polarToCartesian(
          getSlotAngle(childSlot, nodesByRing[ringIndex - 1].length),
          (OUTER_RADIUS - (ringIndex - 1) * radiusStep + (OUTER_RADIUS - ringIndex * radiusStep)) / 2
        );

        edges.push({
          id: `${child.id}->${parent.id}`,
          points: [
            { x: child.x, y: child.y },
            mid,
            { x: parent.x, y: parent.y },
          ],
          active: child.isWinner,
        });
      });
    });
  }

  const finalRing = nodesByRing[ringCount - 1];
  const center: Point = { x: 50, y: 50 };

  finalRing.forEach((node) => {
    const mid = polarToCartesian(
      getSlotAngle(node.slotIndex, finalRing.length),
      INNER_RADIUS / 2
    );
    edges.push({
      id: `${node.id}->trophy`,
      points: [{ x: node.x, y: node.y }, mid, center],
      active: node.isWinner,
    });
  });

  const finalMatch = matchesByRound[ringCount - 1][0] ?? null;
  const champion =
    finalMatch?.status === "finished" && finalMatch.winner_team_id != null
      ? teamById.get(finalMatch.winner_team_id) ?? null
      : null;

  return { nodes, edges, champion };
}
