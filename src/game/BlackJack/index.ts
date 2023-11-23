import { Card } from "@/game/Card";
import { Deck } from "@/game/Deck";
import {
  ActionType,
  ResultType,
  Score,
  DEALER_MIN_SCORE,
  WINNING_SCORE,
} from "@/game/BlackJack/types";
import { getCardValues } from "@/game/BlackJack/helpers/getCardValues";
import { isBlackJack } from "@/game/BlackJack/helpers/isBlackJack";
import { findBestScore } from "@/game/BlackJack/helpers/findBestScore";
import { PrivateGameState } from "@/schemas/privateGameState";

export class BlackJackGame {
  static createNewGame(): PrivateGameState {
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
    currentState: PrivateGameState,
    action: ActionType,
  ): PrivateGameState {
    const deck = new Deck({
      cardsToExclude: [
        ...currentState.dealerOpenCards,
        currentState.dealerHiddenCard,
        ...currentState.playerCards,
      ],
    });
    let newState: PrivateGameState = {
      ...currentState,
      playerCards: [...currentState.playerCards],
      dealerOpenCards: [...currentState.dealerOpenCards],
    };
    if (action === "hit") {
      newState.playerCards.push(deck.draw());
      newState.playerScore = BlackJackGame.calculateHandScore(
        newState.playerCards,
        false,
      );
      if (newState.playerScore === WINNING_SCORE) {
        newState = BlackJackGame.playDealerTurn(newState, deck);
      }
      newState.result = BlackJackGame.calculateResult({
        playerScore: newState.playerScore,
        dealerScore: newState.dealerScore,
        isGameFinished: false,
      });
    } else {
      newState = BlackJackGame.playDealerTurn(newState, deck);
    }
    if (newState.result) {
      newState.dealerOpenCards.push(newState.dealerHiddenCard);
    }
    return newState;
  }

  private static playDealerTurn(state: PrivateGameState, deck: Deck) {
    const newState = { ...state };
    while (
      newState.dealerScore !== "black jack" &&
      newState.dealerScore < DEALER_MIN_SCORE
    ) {
      newState.dealerOpenCards.push(deck.draw());
      newState.dealerScore = BlackJackGame.calculateHandScore(
        [newState.dealerHiddenCard, ...newState.dealerOpenCards],
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
  }: Pick<PrivateGameState, "playerScore" | "dealerScore"> & {
    isGameFinished: boolean;
  }): ResultType {
    if (playerScore === "black jack")
      return dealerScore === "black jack" ? "push" : "player wins";
    if (dealerScore === "black jack") return "dealer wins";
    if (playerScore > WINNING_SCORE) return "dealer wins";
    if (dealerScore > WINNING_SCORE) return "player wins";
    if (isGameFinished) {
      if (playerScore === dealerScore) return "push";
      return playerScore > dealerScore ? "player wins" : "dealer wins";
    }

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
