import { createClient } from "@vercel/kv";
import { z } from "zod";
import {
  privateGameStateSchema,
  PrivateGameState,
} from "@/schemas/privateGameState";

const { KV_REST_API_URL, KV_REST_API_TOKEN } = z
  .object({
    KV_REST_API_URL: z.string(),
    KV_REST_API_TOKEN: z.string(),
  })
  .parse(process.env);
const kv = createClient({
  cache: "no-cache",
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
});

const GAME_TTL_IN_SECONDS = 60 * 60 * 24; // 24 hours

export const saveGameState = async (
  gameId: string,
  gameState: PrivateGameState,
) => {
  await kv.set(gameId, gameState, { ex: GAME_TTL_IN_SECONDS });
};

export const getGameState = async (gameId: string) => {
  const data = await kv.get(gameId);
  return privateGameStateSchema.parse(data);
};
