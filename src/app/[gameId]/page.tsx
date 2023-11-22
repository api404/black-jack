"use client";
import { useGameState } from "@/hooks/useGameState";
import { FC, useCallback } from "react";
import { Card } from "@/components/Card";
import { Hand } from "@/components/Hand";
import { Button } from "@/components/Button";
import { useGameMutations } from "@/hooks/useGameMutations";
import { Result } from "@/components/Result";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    gameId: string;
  };
}
const Home: FC<Props> = ({ params: { gameId } }) => {
  const { data: game, isLoading } = useGameState({ gameId });
  const { action, createNewGame } = useGameMutations();
  const { push } = useRouter();

  const handleOnHitButtonClick = async () => {
    if (!game) throw new Error("Game not found");
    action.mutate({ gameId: game.gameId, action: "hit" });
  };
  const handleOnStandButtonClick = async () => {
    if (!game) throw new Error("Game not found");
    action.mutate({ gameId: game.gameId, action: "stand" });
  };
  const handleStartNewGame = async () => {
    const newGameState = await createNewGame.mutateAsync();
    push(`/${newGameState.gameId}`);
  };

  if (isLoading) return "loading";
  if (!game) return "not found";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-4">
      <div>
        <Hand
          name="dealer"
          cards={[...(game.result ? [] : [null]), ...game.dealerOpenCards]}
          score={game.dealerScore}
        />
      </div>
      <div className="flex flex-row justify-evenly gap-2 w-full ">
        {game.result ? (
          <div className="flex flex-col gap-4 items-center">
            <Result value={game.result} />
            <Button label="Start new game" onClick={handleStartNewGame} />
          </div>
        ) : (
          <>
            <Button label="Hit!" onClick={handleOnHitButtonClick} />
            <Button label="Stand" onClick={handleOnStandButtonClick} />
          </>
        )}
      </div>
      <div>
        <Hand name="player" cards={game.playerCards} score={game.playerScore} />
      </div>
    </main>
  );
};

export default Home;
