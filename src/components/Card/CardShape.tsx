import { FC } from "react";
import clsx from "clsx";
import { useNextFrame } from "@/hooks/useNextFrame";

export type CardAnimation = "slide-from-top" | "slide-from-left" | "none";
export interface CardShapeProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animation?: CardAnimation;
  delayIndex?: number;
}

export const CardShape: FC<CardShapeProps> = ({
  children,
  className,
  style,
  animation = "none",
  delayIndex = 0,
}) => {
  const entered = useNextFrame();
  return (
    <div
      className={clsx(
        "bg-white border-1 border-gray-400 rounded-lg w-24 h-36 md:w-32 md:h-48 flex items-center justify-center shadow-xl p-2",
        "transition-all duration-300",
        {
          "-translate-y-1/2 opacity-0":
            animation === "slide-from-top" && !entered,
          "-translate-y-0 opacity-1": animation === "slide-from-top" && entered,
          "-translate-x-1/2 opacity-0":
            animation === "slide-from-left" && !entered,
          "-translate-x-0 opacity-1":
            animation === "slide-from-left" && entered,
        },
        className,
      )}
      style={{
        ...(style ?? {}),
        transitionDelay: `${delayIndex * 100}ms`,
      }}
    >
      {children}
    </div>
  );
};
