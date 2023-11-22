import { redirect } from "next/navigation";
import { PublicGameState } from "@/app/api/games/_helpers/getPublicGameState";

export default function Home() {
  const handleStartNewGame = async () => {
    const response = await fetch("/api/games", {
      method: "POST",
    });
    const newGameState: PublicGameState = await response.json();
    redirect(`/${newGameState.gameId}`);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button>Start New Game</button>
      <div>Deck</div>
    </main>
  );
}
