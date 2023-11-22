import { BlackJackGame } from "@/game/BlackJack";
import { getPublicGameState } from "@/app/api/games/_helpers/getPublicGameState";
import { saveGameState } from "@/services/gamesStore";
import { v4 as uuid } from "uuid";

export async function POST() {
  const gameState = BlackJackGame.createNewGame();
  const gameId = uuid();
  await saveGameState(gameId, gameState);

  return Response.json(getPublicGameState(gameId, gameState));
}
