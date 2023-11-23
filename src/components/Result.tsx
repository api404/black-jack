import { FC } from "react";
import { ResultType } from "@/services/BlackJack/types";
import clsx from "clsx";
import { CreateNewGameButton } from "@/components/CreateNewGameButton";
import { useNextFrame } from "@/hooks/useNextFrame";

interface Props {
  value: Exclude<ResultType, null>;
  className?: string;
}
export const Result: FC<Props> = ({ value, className }) => {
  const entered = useNextFrame();
  if (!value) return null;

  return (
    <div
      className={clsx(
        className,
        "flex flex-col gap-4 items-center p-4 rounded shadow-lg transition-all delay-500 duration-500",
        {
          "bg-blue-600": value === "player wins",
          "bg-purple-600": value === "push",
          "bg-red-600": value === "dealer wins",
          "-translate-y-1/2 opacity-0": !entered,
          "-translate-y-0 opacity-1": entered,
        },
      )}
    >
      <p className="uppercase text-2xl text-center">{value}</p>
      <CreateNewGameButton />
    </div>
  );
};
