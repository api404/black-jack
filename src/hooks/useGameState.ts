import { useQuery } from "@tanstack/react-query";
import { publicGameStateSchema } from "@/schemas/publicGameState";
import { makeQueryKey } from "@/helpers/makeQueryKey";

interface UseGameStateParams {
  gameId: string;
}

/**
 * Fetches the game by id and stores it in global QueryClient state
 * @param gameId {string} - id of the game
 */
export const useGameState = ({ gameId }: UseGameStateParams) => {
  return useQuery({
    queryKey: makeQueryKey(gameId),
    queryFn: async () => {
      const response = await fetch(`/api/games/${gameId}`, {
        method: "GET",
      });

      const gameState: unknown = await response.json();
      return publicGameStateSchema.parse(gameState);
    },
  });
};
