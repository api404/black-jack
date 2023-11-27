import { FC } from "react";
import clsx from "clsx";
import { Score as ScoreType } from "@/schemas/publicGameState";

interface Props {
  isWinner: boolean;
  score?: ScoreType;
}
export const Score: FC<Props> = ({ isWinner, score }) => {
  const scoreValue = score == "black jack" ? "BJ" : score || "?";
  return (
    <p
      className={clsx(
        "font-bold leading-8 p-2 text-center rounded-full w-12 h-12 shadow bg-white",
        {
          "text-black": !isWinner,
          "text-green-600": isWinner,
        },
      )}
    >
      {scoreValue}
    </p>
  );
};
