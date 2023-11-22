import { getPublicGameState } from "@/app/api/games/_helpers/getPublicGameState";
import { getGameState } from "@/services/gamesStore";

export const GET = async (
  request: Request,
  { params: { gameId } }: { params: { gameId: string } },
) => {
  const gameState = await getGameState(gameId);
  if (!gameState)
    return Response.json(
      {
        message: "Game not found",
      },
      {
        status: 404,
      },
    );

  return Response.json(getPublicGameState(gameId, gameState));
};
