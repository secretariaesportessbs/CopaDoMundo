# Copa do Mundo 2026 — Chaveamento Circular

Site em **Next.js 15 (App Router) + TypeScript** que exibe o chaveamento do mata-mata da Copa do Mundo 2026 em formato de **árvore circular** — taça no centro, fases em anéis concêntricos, seleções avançando por linhas douradas animadas. Os dados vêm de uma planilha do **Google Sheets** e são revalidados automaticamente a cada 5 minutos (ISR).

## Stack

Next.js 15 · TypeScript · TailwindCSS · Framer Motion · React Query · Google Sheets API (Service Account) · Zod · date-fns · Lucide Icons

## Instalação

```bash
npm install
cp .env.example .env   # preencha as variáveis (ver abaixo)
npm run seed           # popula a planilha com os dados reais da Copa 2026
npm run dev            # http://localhost:3000
```

## Configuração da Google Service Account

1. Acesse o [Google Cloud Console](https://console.cloud.google.com) e crie (ou selecione) um projeto.
2. Em **APIs e Serviços → Biblioteca**, ative a **Google Sheets API**.
3. Em **IAM e Administração → Contas de serviço**, crie uma Service Account.
4. Na aba **Chaves** da conta, gere uma chave **JSON** e baixe o arquivo.
5. Abra sua planilha no Google Sheets e **compartilhe-a com o e-mail da Service Account** (ex.: `minha-conta@projeto.iam.gserviceaccount.com`) com permissão de **Editor**.

> ⚠️ Nunca commite o JSON da chave nem cole a chave em código, chats ou issues. Se uma chave vazar, revogue-a imediatamente em *IAM → Contas de serviço → Chaves* e gere outra.

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `GOOGLE_SHEET_ID` | ID da planilha (trecho entre `/d/` e `/edit` na URL) |
| `GOOGLE_CLIENT_EMAIL` | Campo `client_email` do JSON da Service Account |
| `GOOGLE_PRIVATE_KEY` | Campo `private_key` do JSON, com os `\n` literais preservados |

Exemplo (`.env`):

```env
GOOGLE_SHEET_ID=1AbC...XyZ
GOOGLE_CLIENT_EMAIL=automacao@meu-projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
```

O código converte `\n` em quebras de linha reais automaticamente.

## Deploy na Vercel

1. Suba o repositório para o GitHub/GitLab/Bitbucket.
2. Em [vercel.com](https://vercel.com), **Import Project** e selecione o repositório (framework detectado: Next.js).
3. Em **Settings → Environment Variables**, cadastre as três variáveis acima (Production e Preview). Cole a private key com os `\n` — a Vercel preserva o valor.
4. Deploy. O ISR (`revalidate: 300`) regenera a página no máximo a cada 5 minutos; no cliente, o React Query também refaz a busca a cada 5 minutos.

## Estrutura da planilha Google Sheets

### Aba `Teams`

| Coluna | Exemplo |
|---|---|
| team_id | 5 |
| country_name | Brasil |
| country_code | BRA |
| flag_url | https://flagcdn.com/br.svg |
| group_name | G |
| confederation | CONMEBOL |
| eliminated | false |
| current_round | Oitavas |
| created_at | 2026-06-01T00:00:00Z |

### Aba `Matches`

| Coluna | Exemplo |
|---|---|
| match_id | 201 |
| round | Oitavas |
| match_number | 1 |
| team_home_id | 1 |
| team_away_id | 4 |
| home_score | 2 |
| away_score | 1 |
| winner_team_id | 1 |
| match_date | 2026-07-04 |
| match_time | 13:00 |
| host_country | Estados Unidos |
| host_city | Los Angeles |
| stadium | SoFi Stadium |
| status | finished \| scheduled \| live |
| tooltip_text | Canadá 2 x 1 Marrocos |
| updated_at | 2026-07-04T15:00:00Z |

> `match_number` define a posição no anel: os vencedores das partidas 1 e 2 se enfrentam na partida 1 da fase seguinte, e assim por diante. Partidas futuras podem ficar com `team_home_id`/`team_away_id` vazios — o site preenche o slot automaticamente com o vencedor da fase anterior.

### Aba `Rounds`

| round_id | round_name | order |
|---|---|---|
| 1 | Fase de grupos | 1 |
| 2 | Rodada de 32 | 2 |
| 3 | Oitavas | 3 |
| 4 | Quartas | 4 |
| 5 | Semifinal | 5 |
| 6 | Final | 6 |

## API

`GET /api/worldcup` → `{ "teams": [...], "matches": [...], "rounds": [...] }` (cache ISR de 300 s).

## Seed

`npm run seed` executa `scripts/seedSpreadsheet.ts`, que cria as abas (se não existirem) e grava:

- **32 seleções** classificadas ao mata-mata de 2026;
- **31 partidas** (Rodada de 32 → Final), com resultados reais dos jogos já disputados (`finished`) e os demais como `scheduled`;
- as **6 fases** na aba Rounds.

## Estrutura do projeto

```
src/
  app/                 # App Router, ISR, API route
  components/
    Bracket/           # Árvore circular, linhas SVG, taça, skeleton, erro
    MatchCard/         # Confronto (times + placar)
    TeamNode/          # Nó circular de cada seleção
    Tooltip/           # Tooltip animado com detalhes da partida
  services/
    googleSheets/      # Uma função por arquivo (getTeams, getMatches, ...)
  hooks/               # useWorldCupData (React Query, refetch 5 min)
  types/               # Schemas Zod + tipos
  utils/               # Layout polar, formatações (uma função por arquivo)
scripts/
  seedSpreadsheet.ts   # Popula a planilha com dados reais
```

Cada função vive em seu próprio arquivo e faz apenas uma coisa.
