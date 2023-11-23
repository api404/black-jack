import { FC } from "react";
import { Card, Score } from "@/schemas/publicGameState";
import { Card as CardComponent } from "./Card";

interface Props {
  name: string;
  cards: Array<Card | null>;
  score?: Score;
}
export const Hand: FC<Props> = ({ name, cards, score }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className=" flex flex-row gap-2">
        <p>{score}</p>
        <p className="capitalize">{name}</p>
      </div>
      <div className="flex flex-row gap-2">
        {cards.map((card, index) => (
          <CardComponent
            key={index}
            card={card}
            className={index !== 0 ? "-ml-14" : ""}
          />
        ))}
      </div>
    </div>
  );
};
