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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button label="Start new game" onClick={handleStartNewGame} />
    </main>
  );
}
