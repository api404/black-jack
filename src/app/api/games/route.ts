import { BlackJackGame } from "@/game/BlackJack";
import { kv } from "@vercel/kv";
import { v4 as uuid } from "uuid";
import { getPublicGameState } from "@/app/api/games/_helpers/getPublicGameState";

const GAME_TTL_IN_SECONDS = 60 * 60 * 24; // 24 hours

export async function POST() {
  const gameState = BlackJackGame.createNewGame();
  const gameId = uuid();
  await kv.set(gameId, gameState, { ex: GAME_TTL_IN_SECONDS });

  return Response.json(getPublicGameState(gameId, gameState));
}
