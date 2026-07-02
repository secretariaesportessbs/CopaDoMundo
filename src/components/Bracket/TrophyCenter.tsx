"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import type { Team } from "@/types";

interface TrophyCenterProps {
  champion: Team | null;
}

/** A taça no centro da árvore, com brilho pulsante e o campeão quando definido. */
export function TrophyCenter({ champion }: TrophyCenterProps) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      <motion.span
        className="absolute h-32 w-32 rounded-full bg-gold-400/15 blur-2xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        initial={{ scale: 0, rotate: -8 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 160, damping: 14 }}
      >
        <Trophy
          className="h-12 w-12 text-gold-400 drop-shadow-[0_0_18px_rgba(232,182,76,0.6)] sm:h-16 sm:w-16"
          strokeWidth={1.4}
        />
      </motion.span>

      {champion && (
        <motion.div
          className="mt-2 flex flex-col items-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <span className="h-8 w-8 overflow-hidden rounded-full border-2 border-gold-400">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={champion.flag_url}
              alt={`Campeão: ${champion.country_name}`}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="mt-1 font-display text-[10px] uppercase tracking-[0.25em] text-gold-300">
            Campeão
          </span>
        </motion.div>
      )}
    </div>
  );
}
