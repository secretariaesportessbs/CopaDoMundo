import { z } from "zod";

export const teamSchema = z.object({
  team_id: z.coerce.number(),
  country_name: z.string(),
  country_code: z.string(),
  flag_url: z.string().url().or(z.literal("")),
  group_name: z.string().default(""),
  confederation: z.string().default(""),
  eliminated: z.boolean(),
  current_round: z.string().default(""),
  created_at: z.string().default(""),
});

export type Team = z.infer<typeof teamSchema>;
