"use client";

import { useQuery } from "@tanstack/react-query";
import type { WorldCupData } from "@/types";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

async function fetchWorldCupData(): Promise<WorldCupData> {
  const response = await fetch("/api/worldcup");
  if (!response.ok) {
    throw new Error("Não foi possível carregar os dados da Copa.");
  }
  return response.json();
}

/** Busca os dados do chaveamento e revalida automaticamente a cada 5 minutos. */
export function useWorldCupData(initialData: WorldCupData) {
  return useQuery({
    queryKey: ["worldcup"],
    queryFn: fetchWorldCupData,
    initialData,
    refetchInterval: REFRESH_INTERVAL_MS,
    staleTime: REFRESH_INTERVAL_MS,
  });
}
