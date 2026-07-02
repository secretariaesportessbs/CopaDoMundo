import { NextResponse } from "next/server";
import { getTeams, getMatches, getRounds } from "@/services/googleSheets";

export const revalidate = 300;

export async function GET() {
  try {
    const [teams, matches, rounds] = await Promise.all([
      getTeams(),
      getMatches(),
      getRounds(),
    ]);

    return NextResponse.json({ teams, matches, rounds });
  } catch (error) {
    console.error("[api/worldcup]", error);
    return NextResponse.json(
      { error: "Falha ao consultar a planilha do Google Sheets." },
      { status: 500 }
    );
  }
}
