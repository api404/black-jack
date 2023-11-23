import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publicGameStateSchema } from "@/schemas/publicGameState";
import { ActionType } from "@/services/BlackJack/types";
import { makeQueryKey } from "@/helpers/makeQueryKey";

/**
 * Create mutations that do API calls to update remote state and syncs it with QueryClient state
 */
export const useGameMutations = () => {
  const queryClient = useQueryClient();
  const createNewGame = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/games", {
        method: "POST",
      });

      const gameState: unknown = await response.json();
      return publicGameStateSchema.parse(gameState);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(makeQueryKey(data.gameId), data);
    },
  });
  const action = useMutation({
    mutationFn: async ({
      gameId,
      action,
    }: {
      gameId: string;
      action: ActionType;
    }) => {
      const response = await fetch(`/api/games/${gameId}/${action}`, {
        method: "POST",
      });

      const gameState: unknown = await response.json();
      return publicGameStateSchema.parse(gameState);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(makeQueryKey(data.gameId), data);
    },
  });
  return {
    createNewGame,
    action,
  };
};
