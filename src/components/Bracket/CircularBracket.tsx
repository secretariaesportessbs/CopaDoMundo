"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { WorldCupData } from "@/types";
import { useWorldCupData } from "@/hooks/useWorldCupData";
import { buildBracketLayout, type BracketNode } from "@/utils/buildBracketLayout";
import { BracketEdges } from "./BracketEdges";
import { TrophyCenter } from "./TrophyCenter";
import { TeamNode } from "@/components/TeamNode/TeamNode";
import { MatchTooltip } from "@/components/Tooltip/MatchTooltip";

interface CircularBracketProps {
  initialData: WorldCupData;
}

/**
 * Árvore circular do mata-mata: taça no centro, fases em anéis concêntricos.
 * Um arco liga os dois times de cada confronto (quem enfrenta quem) e uma
 * linha dourada acompanha o vencedor até a fase seguinte. Em telas estreitas,
 * arraste horizontalmente para explorar.
 */
export function CircularBracket({ initialData }: CircularBracketProps) {
  const { data } = useWorldCupData(initialData);
  const [hovered, setHovered] = useState<BracketNode | null>(null);
  const [selected, setSelected] = useState<BracketNode | null>(null);

  const layout = useMemo(
    () => buildBracketLayout(data.teams, data.matches, data.rounds),
    [data]
  );

  const activeNode = hovered ?? selected;

  return (
    <div
      className="bracket-scroll w-full cursor-grab overflow-x-auto overscroll-x-contain active:cursor-grabbing"
      onClick={() => setSelected(null)}
    >
      <div className="relative mx-auto aspect-square w-[min(92vw,72vh,1080px)] min-w-[640px] select-none">
        <BracketEdges edges={layout.edges} pairings={layout.pairings} />
        <TrophyCenter champion={layout.champion} />

        {layout.nodes.map((node) => (
          <TeamNode
            key={node.id}
            node={node}
            onHover={setHovered}
            onSelect={(clicked) => {
              setSelected((current) =>
                current?.id === clicked.id ? null : clicked
              );
            }}
          />
        ))}

        <AnimatePresence>
          {activeNode?.match && (
            <MatchTooltip
              key={activeNode.id}
              node={activeNode}
              teams={data.teams}
            />
          )}
        </AnimatePresence>
      </div>

      <p className="pb-6 pt-2 text-center text-xs text-stone-500 sm:hidden">
        Arraste para o lado para explorar o chaveamento
      </p>
    </div>
  );
}
