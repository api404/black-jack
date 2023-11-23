import { DEALER_MIN_SCORE, WINNING_SCORE } from "@/services/BlackJack/types";

export const findBestScore = (scores: number[], isDealer: boolean) => {
  return scores.reduce((bestScore: number, score: number) => {
    if (bestScore === 0) {
      return score;
    }
    if (score === WINNING_SCORE) {
      return score;
    }
    if (score > WINNING_SCORE && bestScore < WINNING_SCORE) {
      return bestScore;
    }
    if (score < WINNING_SCORE && bestScore > WINNING_SCORE) {
      return score;
    }
    if (score < WINNING_SCORE && bestScore < WINNING_SCORE) {
      if (isDealer) {
        // NOTE: soft hand is when ace is scored as 11
        if (bestScore === DEALER_MIN_SCORE && score < DEALER_MIN_SCORE) {
          return score;
        }
        // NOTE: hard hand is when ace is scored as 1
        if (bestScore < DEALER_MIN_SCORE && score === DEALER_MIN_SCORE) {
          return bestScore;
        }
      }
      return Math.max(bestScore, score);
    }
    if (score > WINNING_SCORE && bestScore > WINNING_SCORE) {
      return Math.min(bestScore, score);
    }
    return bestScore;
  }, 0);
};
