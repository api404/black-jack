import { FC } from "react";
import { Card as CardType } from "../../models/Card";
import clsx from "clsx";
import { CardShape } from "@/components/Card/CardShape";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}
export const CardBack: FC<Props> = ({ className, style }) => {
  return (
    <CardShape className={className} style={style}>
      <div className=" w-full h-full rounded-md bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500" />
    </CardShape>
  );
};
