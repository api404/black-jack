import { PublicGameState } from "@/schemas/publicGameState";
import { PrivateGameState } from "@/schemas/privateGameState";

export const getPublicGameState = (
  gameId: string,
  {
    playerCards,
    playerScore,
    dealerOpenCards,
    dealerScore,
    result,
  }: PrivateGameState,
): PublicGameState => {
  return {
    gameId,
    playerScore,
    playerCards,
    dealerOpenCards,
    ...(result ? { dealerScore } : {}),
    result,
  };
};
