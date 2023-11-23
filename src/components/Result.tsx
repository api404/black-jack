import { FC } from "react";
import { ResultType } from "@/services/BlackJack/types";
import clsx from "clsx";
import { CreateNewGameButton } from "@/components/CreateNewGameButton";

interface Props {
  value: Exclude<ResultType, null>;
  className?: string;
}
export const Result: FC<Props> = ({ value, className }) => {
  if (!value) return null;

  return (
    <div
      className={clsx(
        className,
        "flex flex-col gap-4 items-center p-4 rounded shadow-lg",
        {
          "bg-blue-600": value === "player wins",
          "bg-purple-600": value === "push",
          "bg-red-600": value === "dealer wins",
        },
      )}
    >
      <p className="uppercase text-2xl text-center">{value}</p>
      <CreateNewGameButton />
    </div>
  );
};
