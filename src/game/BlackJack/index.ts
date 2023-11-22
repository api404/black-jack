import { Card } from "@/game/Card";
import { Deck } from "@/game/Deck";
import {
  ActionType,
  BlackJackGameState,
  ResultType,
  Score,
  DEALER_MIN_SCORE,
  WINNING_SCORE,
} from "@/game/BlackJack/types";
import { getCardValues } from "@/game/BlackJack/helpers/getCardValues";
import { isBlackJack } from "@/game/BlackJack/helpers/isBlackJack";
import { findBestScore } from "@/game/BlackJack/helpers/findBestScore";

export class BlackJackGame {
  static createNewGame(): BlackJackGameState {
    const deck = new Deck();
    const playerCards = [deck.draw(), deck.draw()];
    const dealerOpenCards = [deck.draw()];
    const dealerHiddenCard = deck.draw();
    const playerScore = BlackJackGame.calculateHandScore(playerCards, false);
    const dealerScore = BlackJackGame.calculateHandScore(
      [dealerHiddenCard, ...dealerOpenCards],
      true,
    );
    const result = BlackJackGame.calculateResult({
      playerScore,
      dealerScore,
      isGameFinished: false,
    });
    return {
      playerCards,
      dealerOpenCards: result
        ? [...dealerOpenCards, dealerHiddenCard]
        : dealerOpenCards,
      dealerHiddenCard,
      playerScore,
      dealerScore,
      result,
    };
  }
  static play(
    currentState: BlackJackGameState,
    action: ActionType,
  ): BlackJackGameState {
    const deck = new Deck({
      cardsToExclude: [
        ...currentState.dealerOpenCards,
        currentState.dealerHiddenCard,
        ...currentState.playerCards,
      ],
    });
    const newState = { ...currentState };
    if (action === "hit") {
      newState.playerCards.push(deck.draw());
      newState.playerScore = BlackJackGame.calculateHandScore(
        newState.playerCards,
        false,
      );
      if (newState.playerScore === WINNING_SCORE) {
        return BlackJackGame.playDealerTurn(newState, deck);
      }
      newState.result = BlackJackGame.calculateResult({
        playerScore: newState.playerScore,
        dealerScore: newState.dealerScore,
        isGameFinished: false,
      });
    } else {
      return BlackJackGame.playDealerTurn(newState, deck);
    }
    return newState;
  }

  private static playDealerTurn(state: BlackJackGameState, deck: Deck) {
    const newState = { ...state };
    newState.dealerOpenCards.push(newState.dealerHiddenCard);
    while (
      newState.dealerScore !== "black jack" &&
      newState.dealerScore < DEALER_MIN_SCORE
    ) {
      newState.dealerOpenCards.push(deck.draw());
      newState.dealerScore = BlackJackGame.calculateHandScore(
        newState.dealerOpenCards,
        true,
      );
    }
    newState.result = BlackJackGame.calculateResult({
      playerScore: newState.playerScore,
      dealerScore: newState.dealerScore,
      isGameFinished: true,
    });
    return newState;
  }

  private static calculateResult({
    playerScore,
    dealerScore,
    isGameFinished,
  }: Pick<BlackJackGameState, "playerScore" | "dealerScore"> & {
    isGameFinished: boolean;
  }): ResultType {
    if (playerScore === dealerScore) return "push";
    if (playerScore === "black jack") return "player wins";
    if (dealerScore === "black jack") return "dealer wins";
    if (playerScore > WINNING_SCORE) return "dealer wins";
    if (dealerScore > WINNING_SCORE) return "player wins";
    if (isGameFinished)
      return playerScore > dealerScore ? "player wins" : "dealer wins";
    return null;
  }

  private static calculateHandScore(cards: Card[], isDealer: boolean): Score {
    if (isBlackJack(cards)) {
      return "black jack";
    }
    const potentialScores = cards.reduce<number[]>(
      (accu, card) => {
        const cardValues = getCardValues(card);
        if (cardValues.length > 1) {
          accu = accu.reduce<number[]>((acc, score) => {
            cardValues.forEach((cardValue) => {
              acc.push(cardValue + score);
            });
            return acc;
          }, []);
        } else {
          accu = accu.map((v) => v + cardValues[0]);
        }
        return accu;
      },
      [0],
    );
    return findBestScore(potentialScores, isDealer);
  }
}
