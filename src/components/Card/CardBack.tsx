import { FC } from "react";
import { CardShape, CardShapeProps } from "@/components/Card/CardShape";
export const CardBack: FC<Omit<CardShapeProps, "children">> = ({
  className,
  style,
  animation,
}) => {
  return (
    <CardShape className={className} style={style} animation={animation}>
      <div className="w-full h-full rounded-md bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500" />
    </CardShape>
  );
};
