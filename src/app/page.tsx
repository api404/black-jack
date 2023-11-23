"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { useGameMutations } from "@/hooks/useGameMutations";

export default function Home() {
  const { createNewGame } = useGameMutations();
  const { push } = useRouter();
  const handleStartNewGame = async () => {
    const newGameState = await createNewGame.mutateAsync();
    push(`/${newGameState.gameId}`);
  };
  return (
    <main className="flex flex-grow flex-col items-center justify-center gap-12 p-24">
      <h1 className="text-8xl">Black Jack</h1>
      <Button label="Start new game" onClick={handleStartNewGame} />
    </main>
  );
}
