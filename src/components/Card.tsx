import { FC } from "react";
import { Card as CardType } from "@/game/Card";
import clsx from "clsx";

const getCardSuiteCode = ({ kind }: CardType) => {
  switch (kind) {
    case "♠":
      return "A";
    case "♥":
      return "B";
    case "♦":
      return "C";
    case "♣":
      return "D";
  }
};
const getCardValueCode = ({ value }: CardType) => {
  switch (value) {
    case "A":
      return "1";
    case "2":
      return "2";
    case "3":
      return "3";
    case "4":
      return "4";
    case "5":
      return "5";
    case "6":
      return "6";
    case "7":
      return "7";
    case "8":
      return "8";
    case "9":
      return "9";
    case "10":
      return "A";
    case "J":
      return "B";
    case "Q":
      return "D";
    case "K":
      return "E";
  }
};
const getSymbolForCard = (card: CardType | null) => {
  if (!card) return String.fromCharCode(parseInt("1F0A0", 16));
  const suitCode = getCardSuiteCode(card);
  const valueCode = getCardValueCode(card);
  return String.fromCharCode(parseInt(`1F0${suitCode}${valueCode}`, 16));
  // return `U+1F0${suitCode}${valueCode}`;
};

interface Props {
  card: CardType | null;
  className?: string;
}
export const Card: FC<Props> = ({ card, className }) => {
  return (
    <div
      className={clsx(
        "bg-white border-black rounded-lg w-40 h-60 text-8xl flex items-center justify-center shadow-xl",
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
