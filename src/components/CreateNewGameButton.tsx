import { FC } from "react";
import { Button } from "@/components/Button";
import { useGameMutations } from "@/hooks/useGameMutations";
import { useRouter } from "next/navigation";

export const CreateNewGameButton: FC = () => {
  const {
    createNewGame: { mutateAsync, isPending },
  } = useGameMutations();
  const { push } = useRouter();
  const handleStartNewGame = async () => {
    const newGameState = await mutateAsync();
    push(`/${newGameState.gameId}`);
  };
  return (
    <Button
      disabled={isPending}
      label="Start new game"
      onClick={handleStartNewGame}
    />
  );
};
