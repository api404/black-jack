import { FC } from "react";
import { Button } from "@/components/Button";
import { useGameMutations } from "@/hooks/useGameMutations";
import { useRouter } from "next/navigation";

export const CreateNewGameButton: FC = () => {
  const { createNewGame } = useGameMutations();
  const { push } = useRouter();
  const handleStartNewGame = async () => {
    const newGameState = await createNewGame.mutateAsync();
    push(`/${newGameState.gameId}`);
  };
  return <Button label="Start new game" onClick={handleStartNewGame} />;
};
