import { z } from "zod";

export const roundSchema = z.object({
  round_id: z.coerce.number(),
  round_name: z.string(),
  order: z.coerce.number(),
});

export type Round = z.infer<typeof roundSchema>;
