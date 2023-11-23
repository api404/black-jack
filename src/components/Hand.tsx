import { FC } from "react";
import { Card, Score } from "@/schemas/publicGameState";
import { CardFace } from "./Card/CardFace";
import { CardBack } from "@/components/Card/CardBack";
import clsx from "clsx";
import { CardAnimation } from "@/components/Card/CardShape";

interface Props {
  name: string;
  cards: Card[];
  hiddenCardsNumber?: number;
  score?: Score;
  animation?: CardAnimation;
}
export const Hand: FC<Props> = ({
  name,
  cards,
  hiddenCardsNumber = 0,
  score,
  animation,
}) => {
  const scoreValue = score == "black jack" ? "BJ" : score || "?";
  return (
    <div className="flex flex-col gap-2">
      <div className=" flex flex-row gap-2 items-center justify-center">
        <p className="font-bold leading-8 p-2 text-center rounded-full w-12 h-12 shadow bg-white text-black">
          {scoreValue}
        </p>
        <p className="capitalize">{name}</p>
      </div>
      <div className="flex flex-row gap-2">
        {Array.from({ length: hiddenCardsNumber }).map((_, index) => (
          <CardBack key={index} animation={animation} />
        ))}
        {cards.map((card, index) => (
          <CardFace
            key={`${card.value}${card.kind}`}
            card={card}
            className={clsx({
              "-ml-16 md:-ml-24 z-0": index + hiddenCardsNumber !== 0,
            })}
            animation={animation}
            delayIndex={index}
          />
        ))}
      </div>
    </div>
  );
};
