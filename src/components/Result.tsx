import { FC } from "react";
import { ResultType } from "@/services/BlackJack/types";
import clsx from "clsx";
import { Button } from "@/components/Button";
import { useGameMutations } from "@/hooks/useGameMutations";
import { useRouter } from "next/navigation";

interface Props {
  value: Exclude<ResultType, null>;
}
export const Result: FC<Props> = ({ value }) => {
  const { createNewGame } = useGameMutations();
  const { push } = useRouter();
  if (!value) return null;
  const handleStartNewGame = async () => {
    const newGameState = await createNewGame.mutateAsync();
    push(`/${newGameState.gameId}`);
  };
  return (
    <div className="flex flex-col gap-2 items-center">
      <p
        className={clsx("uppercase p-6 text-xl shadow-lg w-96 text-center", {
          "bg-blue-600": value === "player wins",
          "bg-purple-600": value === "push",
          "bg-red-600": value === "dealer wins",
        })}
      >
        {value}
      </p>
      <Button label="Start new game" onClick={handleStartNewGame} />
    </div>
  );
};
