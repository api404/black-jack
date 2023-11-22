import { BlackJackGame } from "@/game/BlackJack";
import { getPublicGameState } from "@/app/api/games/_helpers/getPublicGameState";
import { isActionType } from "@/game/BlackJack/types";
import { getGameState, saveGameState } from "@/services/gamesStore";

export async function POST(
  request: Request,
  {
    params: { gameId, action },
  }: { params: { gameId: string; action: string } },
) {
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
  if (gameState.result) {
    return Response.json({ message: "Game is over" }, { status: 400 });
  }
  if (!isActionType(action)) {
    return Response.json({ message: "Invalid action" }, { status: 400 });
  }

  const newGameState = BlackJackGame.play(gameState, action);
  await saveGameState(gameId, gameState);

  return Response.json(getPublicGameState(gameId, newGameState));
}
