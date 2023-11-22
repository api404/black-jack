import { FC } from "react";
import { ResultType } from "@/game/BlackJack/types";
import clsx from "clsx";

interface Props {
  value: Exclude<ResultType, null>;
}
export const Result: FC<Props> = ({ value }) => {
  if (!value) return null;
  return (
    <p
      className={clsx("uppercase p-6 text-xl shadow-lg w-96 text-center", {
        "bg-blue-600": value === "player wins",
        "bg-purple-600": value === "push",
        "bg-red-600": value === "dealer wins",
      })}
    >
      {value}
    </p>
  );
};
