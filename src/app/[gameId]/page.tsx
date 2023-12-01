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
import { ActionType } from "@/services/BlackJack/types";

interface Props {
  params: {
    gameId: string;
  };
}
const Home: FC<Props> = ({ params: { gameId } }) => {
  const { data: game, isLoading } = useGameState({ gameId });
  const {
    action: { mutate, isPending: isPerformingAction },
  } = useGameMutations();

  const handleButtonClick = (action: ActionType) => async () => {
    if (!game) throw new Error("Game not found");
    mutate({ gameId: game.gameId, action });
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
          displayName={`dealer ${isPerformingAction ? "💭" : ""}`}
          cards={dealerOpenCards}
          hiddenCardsNumber={result ? 0 : 1}
          score={game.dealerScore}
          animation="slide-from-left"
          isWinner={result === "dealer wins"}
        />
      </div>
      <div className="flex flex-row items-center justify-evenly w-full h-20">
        {!result && (
          <>
            <Button
              label="Hit!"
              className="w-24"
              disabled={isPerformingAction}
              onClick={handleButtonClick("hit")}
            />
            <Button
              label="Stand"
              className="w-24"
              disabled={isPerformingAction}
              onClick={handleButtonClick("stand")}
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
          isWinner={result === "player wins"}
        />
      </div>

      {!!result && <Result className="absolute" value={result} />}
    </main>
  );
};

export default Home;
