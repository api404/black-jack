import { PublicGameState } from "@/app/schemas/publicGameState";
import { PrivateGameState } from "@/app/schemas/privateGameState";

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
