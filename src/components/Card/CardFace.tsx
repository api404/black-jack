import { FC } from "react";
import { Card as CardType } from "../../models/Card";
import clsx from "clsx";
import {
  CardAnimation,
  CardShape,
  CardShapeProps,
} from "@/components/Card/CardShape";
import { an } from "@upstash/redis/zmscore-10fd3773";

interface Props extends Omit<CardShapeProps, "children"> {
  card: CardType;
}
export const CardFace: FC<Props> = ({
  card,
  className,
  animation,
  delayIndex,
}) => {
  const text = `${card.value}${card.kind}`;
  return (
    <CardShape
      className={className}
      animation={animation}
      delayIndex={delayIndex}
    >
      <div
        className={clsx("w-full h-full flex flex-col justify-between", {
          "text-red-600": card.kind === "♥" || card.kind === "♦",
          "text-black": card.kind === "♣" || card.kind === "♠",
        })}
      >
        <p className="self-start text-md md:text-xl"> {text}</p>
        <p className="self-center text-3xl md:text-6xl">{text}</p>
        <p className="self-end text-md md:text-xl transform rotate-180">
          {text}
        </p>
      </div>
    </CardShape>
  );
};
