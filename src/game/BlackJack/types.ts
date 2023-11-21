import {Card} from "@/game/Card";

export type ResultType = 'player wins' | 'dealer wins' | 'push' | null;
export type Score = number | 'black jack';
export interface BlackJackGameState {
    playerCards: Card[];
    dealerOpenCards: Card[];
    dealerHiddenCard: Card;
    playerScore: Score;
    dealerScore: Score;
    result: ResultType;
}
