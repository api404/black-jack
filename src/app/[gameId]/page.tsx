"use client";
import { useGameState } from "@/hooks/useGameState";
import { FC } from "react";
import { Hand } from "@/components/Hand";
import { Button } from "@/components/Button";
import { useGameMutations } from "@/hooks/useGameMutations";
import { Result } from "@/components/Result";
import { Deck } from "@/components/Deck";
import { GameNotFound } from "@/components/GameNotFound";
import { Loading } from "@/components/Loading";

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
  if (isLoading) return <Loading />;
  if (!game) return <GameNotFound />;

  const { result, playerScore, playerCards, dealerScore, dealerOpenCards } =
    game;

  return (
    <main className="relative flex flex-col flex-grow items-center justify-evenly gap-2">
      <div className="flex gap-8 items-end">
        <Deck />
        <Hand
          name="dealer"
          cards={dealerOpenCards}
          hiddenCardsNumber={result ? 0 : 1}
          score={game.dealerScore}
          animation="slide-from-left"
          result={result}
        />
      </div>
      <div className="flex flex-row items-center justify-evenly w-full h-20">
        {!result && (
          <>
            <Button
              label="Hit!"
              className="w-24"
              onClick={handleOnHitButtonClick}
            />
            {/*<Deck className="transform rotate-90" />*/}
            <Button
              label="Stand"
              className="w-24"
              onClick={handleOnStandButtonClick}
            />
          </>
        )}
      </div>
      <div>
        <Hand
          name="player"
          cards={playerCards}
          score={playerScore}
          animation="slide-from-top"
          result={result}
        />
      </div>

      {!!result && <Result className="absolute" value={result} />}
    </main>
  );
};

export default Home;
