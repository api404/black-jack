"use client";
import { CreateNewGameButton } from "@/components/CreateNewGameButton";

export default function Home() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center gap-12 p-24">
      <h1 className="text-8xl">Black Jack</h1>
      <CreateNewGameButton />
    </main>
  );
}
