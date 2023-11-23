import { FC } from "react";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export const CardShape: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "bg-white border-1 border-gray-400 rounded-lg w-32 h-48 md:w-40 md:h-60 flex items-center justify-center shadow-xl p-2",
        className,
      )}
    >
      {children}
    </div>
  );
};
