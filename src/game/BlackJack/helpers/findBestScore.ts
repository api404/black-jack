import { DEALER_MIN_SCORE, WINNING_SCORE } from "@/game/BlackJack/types";

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
        if (bestScore >= DEALER_MIN_SCORE && score < DEALER_MIN_SCORE) {
          return score;
        }
        if (bestScore < DEALER_MIN_SCORE && score >= DEALER_MIN_SCORE) {
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
