export const DEALER_MIN_SCORE = 17;
export const WINNING_SCORE = 21;
export const resultTypes = ["player wins", "dealer wins", "push"] as const;
export type ResultType = (typeof resultTypes)[number] | null;
export type Score = number | "black jack";

export const actionTypes = ["hit", "stand"] as const;
export type ActionType = (typeof actionTypes)[number];

export function isActionType(str: string): str is ActionType {
  return actionTypes.includes(str as ActionType);
}
