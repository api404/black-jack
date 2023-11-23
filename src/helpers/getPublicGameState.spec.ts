import { Card } from "../models/Card";
import { getPublicGameState } from "@/helpers/getPublicGameState";
import { PrivateGameState } from "@/schemas/privateGameState";

describe("getPublicGameState", () => {
  it("returns dealer score only when game is over", () => {
    const gameState: PrivateGameState = {
      playerCards: [Card.fromString("3♦"), Card.fromString("A♦")],
      playerScore: 14,
      dealerOpenCards: [Card.fromString("A♣")],
      dealerHiddenCard: Card.fromString("K♣"),
      dealerScore: "black jack",
      result: "dealer wins",
    };
    const publicGameState = getPublicGameState("test", gameState);
    expect(publicGameState.dealerScore).toEqual("black jack");
  });
  it("does not return dealer score until game is over", () => {
    const gameState: PrivateGameState = {
      playerCards: [Card.fromString("3♦"), Card.fromString("A♦")],
      playerScore: 14,
      dealerOpenCards: [Card.fromString("8♣")],
      dealerHiddenCard: Card.fromString("K♣"),
      dealerScore: 18,
      result: null,
    };
    const publicGameState = getPublicGameState("test", gameState);
    expect(publicGameState.dealerScore).not.toBeDefined();
  });
});
