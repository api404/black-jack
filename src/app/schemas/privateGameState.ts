import { Card } from "@/game/Card";
import { ResultType, resultTypes, Score } from "@/game/BlackJack/types";
import { z } from "zod";
import { cardSchema, scoreSchema } from "@/app/schemas/publicGameState";

export const privateGameStateSchema = z.object({
  playerCards: z.array(cardSchema),
  playerScore: scoreSchema,
  dealerOpenCards: z.array(cardSchema),
  dealerHiddenCard: cardSchema,
  dealerScore: scoreSchema,
  result: z.enum(resultTypes).nullable(),
});

export type PrivateGameState = z.infer<typeof privateGameStateSchema>;
