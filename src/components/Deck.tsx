import { FC } from "react";
import { CardBack } from "@/components/Card/CardBack";
import clsx from "clsx";
import { className } from "postcss-selector-parser";

const CARDS_TO_DISPLAY = 10;

interface Props {
  className?: string;
}
export const Deck: FC<Props> = ({ className }) => {
  return (
    <div className={clsx("relative", className)}>
      {Array.from({ length: CARDS_TO_DISPLAY }).map((_, index) => (
        <CardBack
          key={index}
          className={clsx({
            "absolute top-0": index !== 0,
          })}
          style={{
            left: -2 * (CARDS_TO_DISPLAY - (index + 1)),
          }}
        />
      ))}
    </div>
  );
};
