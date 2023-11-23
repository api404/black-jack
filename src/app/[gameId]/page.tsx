"use client";
import { useGameState } from "@/hooks/useGameState";
import { FC, useCallback } from "react";
import { CardFace } from "@/components/Card/CardFace";
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
  const { action } = useGameMutations();

  const handleOnHitButtonClick = async () => {
    if (!game) throw new Error("Game not found");
    action.mutate({ gameId: game.gameId, action: "hit" });
  };
  const handleOnStandButtonClick = async () => {
    if (!game) throw new Error("Game not found");
    action.mutate({ gameId: game.gameId, action: "stand" });
  };
  if (isLoading) return "loading";
  if (!game) return "not found";
  return (
    <main className="flex flex-col flex-grow items-center justify-evenly gap-2">
      <div>
        <Hand
          name="dealer"
          cards={game.dealerOpenCards}
          hiddenCardsNumber={game.result ? 0 : 1}
          score={game.dealerScore}
        />
      </div>
      <div className="flex flex-row justify-evenly w-full ">
        {game.result ? (
          <Result value={game.result} />
        ) : (
          <>
            <Button
              label="Hit!"
              className="w-24"
              onClick={handleOnHitButtonClick}
            />
            <Button
              label="Stand"
              className="w-24"
              onClick={handleOnStandButtonClick}
            />
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
