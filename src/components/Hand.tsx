import { FC } from "react";
import { Card, Score } from "@/schemas/publicGameState";
import { CardFace } from "./Card/CardFace";
import { CardBack } from "@/components/Card/CardBack";
import { Score as ScoreComponent } from "@/components/Score";
import clsx from "clsx";
import { CardAnimation } from "@/components/Card/CardShape";

interface Props {
  name: "dealer" | "player";
  cards: Card[];
  displayName?: string;
  isWinner: boolean;
  hiddenCardsNumber?: number;
  score?: Score;
  animation?: CardAnimation;
}
export const Hand: FC<Props> = ({
  name,
  cards,
  hiddenCardsNumber = 0,
  animation,
  displayName = name,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-2" data-testid={`${name}-hand`}>
      <div className=" flex flex-row gap-2 items-center justify-center">
        <ScoreComponent {...rest} />
        <p className="capitalize">{displayName}</p>
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
