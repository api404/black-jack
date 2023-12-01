import { FC } from "react";
import { CreateNewGameButton } from "@/components/CreateNewGameButton";

export const GameNotFound: FC = () => (
  <div className="flex flex-grow flex-col gap-6 items-center justify-center">
    <h1 className="uppercase text-2xl text-center">Game not found 😢</h1>
    <CreateNewGameButton />
  </div>
);
