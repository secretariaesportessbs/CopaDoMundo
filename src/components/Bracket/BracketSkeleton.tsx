/** Skeleton exibido enquanto os dados da planilha carregam. */
export function BracketSkeleton() {
  const rings = [46, 38, 30, 22, 14];

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-10">
      <div className="h-8 w-72 animate-pulse rounded bg-pitch-800" />
      <div className="mt-2 h-4 w-44 animate-pulse rounded bg-pitch-800/70" />

      <div className="relative mt-10 aspect-square w-full max-w-[720px]">
        {rings.map((radius) => (
          <span
            key={radius}
            className="absolute left-1/2 top-1/2 animate-pulse rounded-full border border-stone-700/40"
            style={{
              width: `${radius * 2}%`,
              height: `${radius * 2}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gold-700/30" />
      </div>
    </main>
  );
}
