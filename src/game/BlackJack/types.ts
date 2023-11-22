import { Card } from "@/game/Card";

export const DEALER_MIN_SCORE = 17;
export const WINNING_SCORE = 21;
export type ResultType = "player wins" | "dealer wins" | "push" | null;
export type Score = number | "black jack";

export const actionTypes = ["hit", "stand"] as const;
export type ActionType = (typeof actionTypes)[number];

export function isActionType(str: string): str is ActionType {
  return actionTypes.includes(str as ActionType);
}
export interface BlackJackGameState {
  playerCards: Card[];
  dealerOpenCards: Card[];
  dealerHiddenCard: Card;
  playerScore: Score;
  dealerScore: Score;
  result: ResultType;
}
