import { TriangleAlert } from "lucide-react";

interface BracketErrorProps {
  message?: string;
}

/** Estado de erro amigável quando a planilha não pôde ser lida. */
export function BracketError({ message }: BracketErrorProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <TriangleAlert className="h-10 w-10 text-gold-400" strokeWidth={1.5} />
      <h1 className="font-display text-xl text-stone-100">
        Não foi possível carregar o chaveamento
      </h1>
      <p className="max-w-md text-sm text-stone-400">
        {message ??
          "Verifique se a planilha está compartilhada com a Service Account e se as variáveis de ambiente estão configuradas. A página tenta novamente automaticamente."}
      </p>
    </main>
  );
}
