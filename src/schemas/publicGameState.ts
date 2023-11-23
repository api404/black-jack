import { resultTypes } from "@/game/BlackJack/types";
import { z } from "zod";
import { cardKinds, cardValues } from "@/game/Card/types";

export const scoreSchema = z.number().or(z.enum(["black jack"]));
export type Score = z.infer<typeof scoreSchema>;
export const cardSchema = z.object({
  kind: z.enum(cardKinds),
  value: z.enum(cardValues),
});
export type Card = z.infer<typeof cardSchema>;
export const publicGameStateSchema = z.object({
  gameId: z.string(),
  dealerScore: scoreSchema.optional(),
  playerScore: scoreSchema,
  result: z.enum(resultTypes).nullable(),
  playerCards: z.array(cardSchema),
  dealerOpenCards: z.array(cardSchema),
});

export type PublicGameState = z.infer<typeof publicGameStateSchema>;
