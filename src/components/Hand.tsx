import { FC } from "react";
import { Card, Score } from "@/schemas/publicGameState";
import { CardFace } from "./Card/CardFace";
import { CardBack } from "@/components/Card/CardBack";
import clsx from "clsx";

interface Props {
  name: string;
  cards: Card[];
  hiddenCardsNumber?: number;
  score?: Score;
}
export const Hand: FC<Props> = ({
  name,
  cards,
  hiddenCardsNumber = 0,
  score,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className=" flex flex-row gap-2">
        <p>{score}</p>
        <p className="capitalize">{name}</p>
      </div>
      <div className="flex flex-row gap-2">
        {Array.from({ length: hiddenCardsNumber }).map((_, index) => (
          <CardBack key={index} />
        ))}
        {cards.map((card, index) => (
          <CardFace
            key={`${card.value}${card.kind}`}
            card={card}
            className={clsx({
              "-ml-24 z-0": index + hiddenCardsNumber !== 0,
            })}
          />
        ))}
      </div>
    </div>
  );
};
