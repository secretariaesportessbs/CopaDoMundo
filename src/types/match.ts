import { z } from "zod";

export const matchStatusSchema = z.enum(["scheduled", "live", "finished"]);
export type MatchStatus = z.infer<typeof matchStatusSchema>;

export const matchSchema = z.object({
  match_id: z.coerce.number(),
  round: z.string(),
  match_number: z.coerce.number(),
  team_home_id: z.number().nullable(),
  team_away_id: z.number().nullable(),
  home_score: z.number().nullable(),
  away_score: z.number().nullable(),
  winner_team_id: z.number().nullable(),
  match_date: z.string().default(""),
  match_time: z.string().default(""),
  host_country: z.string().default(""),
  host_city: z.string().default(""),
  stadium: z.string().default(""),
  status: matchStatusSchema.catch("scheduled"),
  tooltip_text: z.string().default(""),
  updated_at: z.string().default(""),
});

export type Match = z.infer<typeof matchSchema>;
