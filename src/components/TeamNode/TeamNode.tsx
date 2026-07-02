"use client";

import { motion } from "framer-motion";
import { CircleDashed } from "lucide-react";
import type { BracketNode } from "@/utils/buildBracketLayout";

interface TeamNodeProps {
  node: BracketNode;
  onHover: (node: BracketNode | null) => void;
  onSelect: (node: BracketNode) => void;
}

/** Nó circular de uma seleção (bandeira) posicionado na árvore. */
export function TeamNode({ node, onHover, onSelect }: TeamNodeProps) {
  const { team, x, y, size, isWinner, isLoser, ringIndex, slotIndex } = node;

  return (
    <motion.button
      type="button"
      aria-label={team ? team.country_name : "Vaga em disputa"}
      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
      style={{ left: `${x}%`, top: `${y}%`, width: `${size}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 0.15 + ringIndex * 0.18 + slotIndex * 0.015,
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      whileHover={{ scale: 1.18, zIndex: 30 }}
      onMouseEnter={() => onHover(node)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(node)}
    >
      <span
        className={[
          "block aspect-square w-full overflow-hidden rounded-full border-2 bg-pitch-800 transition-all duration-300",
          isWinner
            ? "border-gold-400 shadow-node"
            : isLoser
              ? "border-loser opacity-40 saturate-0"
              : "border-stone-600/70",
        ].join(" ")}
      >
        {team ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={team.flag_url}
            alt={`Bandeira: ${team.country_name}`}
            className="h-full w-full object-cover"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-stone-600">
            <CircleDashed className="h-1/2 w-1/2" strokeWidth={1.5} />
          </span>
        )}
      </span>

      <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium uppercase tracking-wider text-stone-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:text-[10px]">
        {team ? team.country_name : "A definir"}
      </span>
    </motion.button>
  );
}
