import { FC } from "react";
import { Card as CardType } from "@/game/Card";
import clsx from "clsx";

interface Props {
  card: CardType | null;
  className?: string;
}
export const Card: FC<Props> = ({ card, className }) => {
  return (
    <div
      className={clsx(
        "bg-white border-black rounded-lg w-40 h-60 text-6xl flex items-center justify-center shadow-xl",
        {
          "bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500": !card,
        },
        className,
      )}
    >
      {!!card && (
        <p
          className={clsx({
            "text-red-600": card?.kind === "♥" || card?.kind === "♦",
            "text-black": !card || card?.kind === "♣" || card?.kind === "♠",
          })}
        >
          {card ? `${card?.value}${card?.kind}` : "--"}
        </p>
      )}
    </div>
  );
};
