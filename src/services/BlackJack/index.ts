import { Card } from "../../models/Card";
import { Deck } from "../../models/Deck";
import {
  ActionType,
  ResultType,
  Score,
  DEALER_MIN_SCORE,
  WINNING_SCORE,
} from "@/services/BlackJack/types";
import { getCardValues } from "@/services/BlackJack/getCardValues";
import { isBlackJack } from "@/services/BlackJack/isBlackJack";
import { findBestScore } from "@/services/BlackJack/findBestScore";
import { PrivateGameState } from "@/schemas/privateGameState";

export class BlackJackGame {
  static createNewGame(): PrivateGameState {
    // NOTE: draw initial hands for players
    const deck = new Deck();
    const playerCards = [deck.draw(), deck.draw()];
    const dealerOpenCards = [deck.draw()];
    const dealerHiddenCard = deck.draw();

    // NOTE: calculate scores
    const playerScore = BlackJackGame.calculateHandScore(playerCards, false);
    const dealerScore = BlackJackGame.calculateHandScore(
      [dealerHiddenCard, ...dealerOpenCards],
      true,
    );

    // NOTE: calculate results
    const stateWithResult = BlackJackGame.getStateWithResult(
      {
        playerCards,
        dealerOpenCards,
        dealerHiddenCard,
        playerScore,
        dealerScore,
      },
      null,
    );
    return stateWithResult.result
      ? BlackJackGame.openDealersHand(stateWithResult)
      : stateWithResult;
  }
  static play(
    currentState: PrivateGameState,
    action: ActionType,
  ): PrivateGameState {
    const deck = BlackJackGame.createDeckFromState(currentState);

    // NOTE: play hit for player
    const stateAfterPlayersAction =
      action === "hit"
        ? BlackJackGame.playHit(currentState, deck)
        : currentState;
    // NOTE: if player finished (stand, winning score), play dealer hand
    const stateAfterDealersAction =
      action === "stand" ||
      stateAfterPlayersAction.playerScore === WINNING_SCORE
        ? BlackJackGame.playDealerTurn(stateAfterPlayersAction, deck)
        : stateAfterPlayersAction;
    // NOTE: calculate result
    const stateWithResult = BlackJackGame.getStateWithResult(
      stateAfterDealersAction,
      action,
    );
    // NOTE: if finished, open dealer card
    return stateWithResult.result
      ? BlackJackGame.openDealersHand(stateWithResult)
      : stateWithResult;
  }

  private static createDeckFromState(state: PrivateGameState) {
    return new Deck({
      cardsToExclude: [
        ...state.dealerOpenCards,
        state.dealerHiddenCard,
        ...state.playerCards,
      ],
    });
  }

  private static playHit(state: PrivateGameState, deck: Deck) {
    const newState = BlackJackGame.cloneState(state);
    newState.playerCards.push(deck.draw());
    newState.playerScore = BlackJackGame.calculateHandScore(
      newState.playerCards,
      false,
    );
    return newState;
  }

  private static playDealerTurn(state: PrivateGameState, deck: Deck) {
    const newState = BlackJackGame.cloneState(state);
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
    return newState;
  }

  private static cloneState(state: PrivateGameState): PrivateGameState {
    return {
      ...state,
      playerCards: [...state.playerCards],
      dealerOpenCards: [...state.dealerOpenCards],
    };
  }

  private static getStateWithResult(
    state: Omit<PrivateGameState, "result">,
    action: ActionType | null,
  ): PrivateGameState {
    const isGameFinished =
      action === "stand" ||
      state.dealerScore === "black jack" ||
      state.dealerScore >= WINNING_SCORE ||
      state.playerScore === "black jack" ||
      state.playerScore >= WINNING_SCORE;
    const result = BlackJackGame.calculateResult({
      playerScore: state.playerScore,
      dealerScore: state.dealerScore,
      isGameFinished,
    });
    return {
      ...state,
      result,
    };
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

  private static openDealersHand(state: PrivateGameState): PrivateGameState {
    return {
      ...state,
      dealerOpenCards: [state.dealerHiddenCard, ...state.dealerOpenCards],
    };
  }
}
