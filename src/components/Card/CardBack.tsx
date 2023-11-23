import { FC } from "react";
import { Card as CardType } from "@/game/Card";
import clsx from "clsx";
import { CardShape } from "@/components/Card/CardShape";

interface Props {
  className?: string;
}
export const CardBack: FC<Props> = ({ className }) => {
  return (
    <CardShape className={className}>
      <div className=" w-full h-full rounded-md bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500" />
    </CardShape>
  );
};
