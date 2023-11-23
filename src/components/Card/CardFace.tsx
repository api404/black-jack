import { FC } from "react";
import { Card as CardType } from "../../models/Card";
import clsx from "clsx";
import { CardShape } from "@/components/Card/CardShape";

interface Props {
  card: CardType;
  className?: string;
}
export const CardFace: FC<Props> = ({ card, className }) => {
  const text = `${card?.value}${card?.kind}`;
  return (
    <CardShape className={className}>
      <div
        className={clsx("w-full h-full flex flex-col justify-between", {
          "text-red-600": card.kind === "♥" || card.kind === "♦",
          "text-black": card.kind === "♣" || card.kind === "♠",
        })}
      >
        <p className="self-start text-sm md:text-md"> {text}</p>
        <p className="self-center text-3xl md:text-6xl">{text}</p>
        <p className="self-end text-sm md:text-md transform rotate-180">
          {text}
        </p>
      </div>
    </CardShape>
  );
};
