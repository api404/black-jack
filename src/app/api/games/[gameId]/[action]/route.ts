import { BlackJackGame } from "@/game/BlackJack";
import { v4 as uuid } from "uuid";
import { kv } from "@vercel/kv";
import { getPublicGameState } from "@/app/api/games/_helpers/getPublicGameState";
import {
  actionTypes,
  BlackJackGameState,
  isActionType,
} from "@/game/BlackJack/types";

export async function POST(
  request: Request,
  {
    params: { gameId, action },
  }: { params: { gameId: string; action: string } },
) {
  const gameState = await kv.get<BlackJackGameState>(gameId);
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
  await kv.set(gameId, newGameState);

  return Response.json(getPublicGameState(gameId, newGameState));
}
