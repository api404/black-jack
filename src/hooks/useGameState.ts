import { useQuery } from "@tanstack/react-query";
import { publicGameStateSchema } from "@/schemas/publicGameState";

interface UseGameStateParams {
  gameId: string;
}
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

export const makeQueryKey = (gameId: string) => ["game", gameId];
