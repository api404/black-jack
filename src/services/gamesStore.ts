import { createClient } from "redis";
import { z } from "zod";
import {
  privateGameStateSchema,
  PrivateGameState,
} from "@/schemas/privateGameState";

const { KV_REST_API_REDIS_URL } = z
  .object({
    KV_REST_API_REDIS_URL: z.string(),
  })
  .parse(process.env);
const kv = createClient({
  url: KV_REST_API_REDIS_URL,
}).connect();

const GAME_TTL_IN_SECONDS = 60 * 60 * 24; // 24 hours

export const saveGameState = async (
  gameId: string,
  gameState: PrivateGameState,
) => {
  await (
    await kv
  ).set(gameId, JSON.stringify(gameState), { EX: GAME_TTL_IN_SECONDS });
};

export const getGameState = async (gameId: string) => {
  const data = await (await kv).get(gameId);
  return data ? privateGameStateSchema.parse(JSON.parse(data)) : null;
};
