import { getTeams, getMatches, getRounds } from "@/services/googleSheets";
import { CircularBracket } from "@/components/Bracket/CircularBracket";
import { BracketError } from "@/components/Bracket/BracketError";

export const revalidate = 300;

export default async function HomePage() {
  try {
    const [teams, matches, rounds] = await Promise.all([
      getTeams(),
      getMatches(),
      getRounds(),
    ]);

    return (
      <main className="flex min-h-screen flex-col items-center px-4 py-8 sm:py-12">
        <header className="mb-6 text-center">
          <p className="font-display text-[11px] uppercase tracking-[0.4em] text-gold-500">
            Copa do Mundo FIFA 2026
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold text-stone-100 sm:text-4xl">
            Caminho até a Taça
          </h1>
          <p className="mt-2 text-sm text-stone-400">
            Chaveamento do mata-mata em tempo real — atualizado a cada 5 minutos
          </p>
        </header>

        <CircularBracket initialData={{ teams, matches, rounds }} />
      </main>
    );
  } catch (error) {
    console.error("[page]", error);
    return <BracketError />;
  }
}
