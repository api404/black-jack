import { resultTypes } from "@/services/BlackJack/types";
import { z } from "zod";
import { cardSchema, scoreSchema } from "@/schemas/publicGameState";

export const privateGameStateSchema = z.object({
  playerCards: z.array(cardSchema),
  playerScore: scoreSchema,
  dealerOpenCards: z.array(cardSchema),
  dealerHiddenCard: cardSchema,
  dealerScore: scoreSchema,
  result: z.enum(resultTypes).nullable(),
  deck: z.string(),
});

export type PrivateGameState = z.infer<typeof privateGameStateSchema>;
