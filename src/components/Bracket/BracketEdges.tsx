"use client";

import { motion } from "framer-motion";
import type { BracketEdge } from "@/utils/buildBracketLayout";

interface BracketEdgesProps {
  edges: BracketEdge[];
}

function toPath(edge: BracketEdge): string {
  const [a, b, c] = edge.points;
  return `M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y}`;
}

/** Camada SVG com as linhas do chaveamento; caminhos vencedores em dourado animado. */
export function BracketEdges({ edges }: BracketEdgesProps) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {edges.map((edge) => (
        <g key={edge.id}>
          <path
            d={toPath(edge)}
            fill="none"
            stroke="#8a7a5c"
            strokeOpacity={0.35}
            strokeWidth={0.22}
            strokeDasharray="0.1 1.1"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {edge.points.slice(1, 2).map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={0.42}
              fill="#8a7a5c"
              fillOpacity={0.55}
            />
          ))}
          {edge.active && (
            <motion.path
              d={toPath(edge)}
              fill="none"
              stroke="#e8b64c"
              strokeWidth={0.34}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.6, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 1px rgba(232,182,76,0.9))" }}
            />
          )}
        </g>
      ))}
    </svg>
  );
}
