import { FC } from "react";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export const CardShape: FC<Props> = ({ children, className, style }) => {
  return (
    <div
      className={clsx(
        "bg-white border-1 border-gray-400 rounded-lg w-24 h-36 md:w-32 md:h-48 flex items-center justify-center shadow-xl p-2",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
};
